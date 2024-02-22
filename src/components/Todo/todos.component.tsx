import { useState } from "react";
import { PencilIcon, PlusIcon, Trash } from "lucide-react";
import Header from "../Header/header";
import { Todo } from "../../interfaces/todo";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const Todos = (): JSX.Element => {
  const { register, handleSubmit, resetField } = useForm<{ title: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");



  const handleAddClick = (data: { title: string }) => {
    const newTask = { id: uuidv4(), title: data.title, isComplete: false };
    setTodos((prev) => [...prev, newTask]);
    resetField("title");

    axios.post('http://localhost:3000/tasks', newTask, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Tarefa adicionada com sucesso:', response.data.title);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  const handleDeleteClick = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(response => {
        console.log('Tarefa deletada com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  const startEditingTask = (id: string, title: string) => {
    setEditingTaskId(id);
    setEditValue(title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    setEditValue(value);
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: value } : todo
    );

    axios.put(`http://localhost:3000/tasks/${id}`, { title: value })
      .then(response => {
        console.log('Tarefa atualizada com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar tarefa:', error);
      });

    setTodos(updatedTodos);
  };


  return (
    <div className="w-screen h-screen bg-neutral-800 flex flex-col items-center justify-center">
      <Header />
     
      <div className="flex items-start justify-center gap-5 flex-col text-gray-50 mt-10  p-5">
      <div className="flex  items-center gap-4" onSubmit={handleSubmit(handleAddClick)}>
        <input
          className="rounded-md p-3 text-gray-100 bg-gray-600 text-blue"
          placeholder="Adicione uma nova tarefa"
          type="text"
          {...register("title", { required: true })}
        />
        <button onClick={() => handleSubmit(handleAddClick)()} aria-label="Adicionar">
          <PlusIcon className="text-white" />
        </button>
        </div>
        <ul className="w-full gap-4 flex flex-col items-start">
        <h2>{ todos.length === 0
        ? "Você não tem tarefas"
        : todos.length === 1
        ? "Você tem (1) tarefa"
        : `Você tem (${todos.length}) tarefas`}</h2>
          {todos.map((todo) => (
        
            
            <li className="w-full flex items-center justify-between gap-10 bg-gray-700 rounded-md p-3" key={todo.id}>
              {editingTaskId === todo.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => handleEditChange(e, todo.id)}
                  onBlur={() => setEditingTaskId(null)}
                  autoFocus
                  className={`rounded-md p-3 text-gray-100 bg-gray-600 ${editingTaskId === todo.id ? 'border-2 border-blue-500' : ''}`}
                />

              ) : (
                <p>{todo.title}</p>
              )}
              <button aria-label={`Deletar tarefa ${todo.title}`} onClick={() => handleDeleteClick(todo.id)}>
                <Trash size={18} className="text-red-500" />
              </button>
              <button aria-label={`editar ${todo.title}`} onClick={() => startEditingTask(todo.id, todo.title)}><PencilIcon size={18} /></button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Todos;
