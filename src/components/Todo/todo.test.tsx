import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event'


import Todos from "./todos.component"

describe("Todo", () => {


    it("should show task input", () => {
        render(<Todos />);
        
        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");

        expect(input).toBeInTheDocument();
        expect(input).toHaveStyle({padding: "1px"})
    });

    it("should show add taks", async () => {
        render(<Todos />);

        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
        const taskTitle = "Nova Tarefa"
        await userEvent.type(input, taskTitle)
        screen.getByDisplayValue(taskTitle)
    
        const addButton = screen.getByLabelText("Adicionar");

        await userEvent.click(addButton)
        screen.getByPlaceholderText("Adicione uma nova tarefa")
        expect(screen.queryAllByText("Nova tarefa"))
    });

    it("should delete task on delete click", async () => {
        
        render (<Todos />)
        
        // adicionar tarefa 
        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
        const taskTitle = "Nova Tarefa"
        await userEvent.type(input, taskTitle)
        screen.getByDisplayValue(taskTitle)
    
        const addButton = screen.getByLabelText("Adicionar");

        await userEvent.click(addButton)

        // deletar tarefa adicionada

        const deleteButton = screen.getByLabelText(`Deletar tarefa ${taskTitle}`)
        await userEvent.click(deleteButton)
        const deletedTask = screen.queryByText(taskTitle)

        expect(deletedTask).not.toBeInTheDocument()

    })


})