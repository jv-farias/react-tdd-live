import { Delete, DeleteIcon, PlusIcon, Trash } from "lucide-react";
import Header from "../Header/header";
import { useState } from "react";
import { Todo } from "../../interfaces/todo";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

const Todos = (): JSX.Element => {
  
  const { register, handleSubmit, formState: {errors}, resetField } = useForm<{ title: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddClick = (data: { title: string }) => {
    setTodos((prev) => [...prev, { id: uuidv4(), title: data.title, isComplete: false }]);
    resetField("title"); // Reseta o formulário após adicionar a tarefa
  };

  console.log(errors)

  return (
    <div className="w-screen h-screen bg-neutral-900 flex flex-col items-center justify-center">
      <Header />

      <div className="flex items-center gap-4" onSubmit={handleSubmit(handleAddClick)}>
        <input className="rounded-md p-3 text-gray-400 bg-gray-600" placeholder="Adicione uma nova tarefa" type="text" {...register("title", { required: true })} />
        <button onClick={() => handleSubmit(handleAddClick)()} aria-label="Adicionar"> <PlusIcon/> </button>
      </div>
      <ul className="flex items-center justify-center gap-3 flex-col text-gray-50 mt-10 bg-gray-700 p-5" >
        {todos.map((todo) => (
          <li  className=" w-full  flex items-center justify-between gap-10" key={todo.id}>
            <p>{todo.title}</p>
            <Trash aria-label={`Deletar tarefa ${todo.title}`} size={18} className="text-red-500" />
          </li>
        ))}
    
      </ul>
      
    </div>
  );
};

export default Todos;
