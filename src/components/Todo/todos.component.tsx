import { useState } from "react";
import { PlusIcon, Trash } from "lucide-react";
import Header from "../Header/header";
import { Todo } from "../../interfaces/todo";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

const Todos = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors }, resetField } = useForm<{ title: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddClick = (data: { title: string }) => {

    const newTask = { id: uuidv4(), title: data.title, isComplete: false };
    setTodos((prev) => [...prev, newTask]);
    resetField("title"); 

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(resp => resp.json())
    .then(data => console.log('Tarefa adicionada com sucesso:', data))
    .catch((error) => {
      console.log('Erro', error);
    });
  };

  
  const handleDeleteClick = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => console.log('Tarefa deletada com sucesso:', data))
    .catch((error) => {
      console.error('Erro:', error);
    });
  };

  console.log(errors);


  return (
    <div className="w-screen h-screen bg-neutral-900 flex flex-col items-center justify-center">
      <Header />


    
      <div className="flex items-center gap-4" onSubmit={handleSubmit(handleAddClick)}>
        <input
          className="rounded-md p-3 text-gray-100 bg-gray-600 text-wh "
          placeholder="Adicione uma nova tarefa"
          type="text"
          {...register("title", { required: true })}
        />
        <button onClick={() => handleSubmit(handleAddClick)()} aria-label="Adicionar">
          <PlusIcon className="text-white" />
        </button>
      </div>
      <ul className="flex items-center justify-center gap-3 flex-col text-gray-50 mt-10  p-5">
        {todos.map((todo) => (
          <li className="w-full flex items-center justify-between gap-10 bg-gray-700 rounded-md p-3" key={todo.id}>
            <p>{todo.title}</p>
            <button aria-label={`Deletar tarefa ${todo.title}`} onClick={() => handleDeleteClick(todo.id)}>
              <Trash size={18} className="text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
