
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event'


import Todos from "./todos.component"

describe("Todo", () => {

    // isso vai servir para simular a chamada da "api-fake"
    // link api: http://localhost:3000

    jest.mock('axios', () => ({
        post: jest.fn(),
        delete: jest.fn(),
    }));

    // limpar os mocks com a função afterEach()
    // importante para os testes serem independentes e não depender do resultado de testes anteriores

    afterEach(() => {
        jest.clearAllMocks();
    });

    // teste para saber se o input está na tela
    it("should show task input", () => {
        render(<Todos />);
        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
        expect(input).toBeInTheDocument();
        expect(input).toHaveStyle({ padding: "1px" })
    });

    // teste do botão de adicionar tasks 
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

    // teste do botão de deletar

    it("should delete task on delete click", async () => {
        render(<Todos />)

        // adicionar tarefa 
        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
        const taskTitle = "Nova Tarefa"
        const addButton = screen.getByLabelText("Adicionar");

        await userEvent.type(input, taskTitle)
        screen.getByDisplayValue(taskTitle)

        await userEvent.click(addButton)

        // deletar tarefa adicionada
        const deleteButton = screen.getByLabelText(`Deletar tarefa ${taskTitle}`)
        await userEvent.click(deleteButton)
        const deletedTask = screen.queryByText(taskTitle)
        expect(deletedTask).not.toBeInTheDocument()
    });

    it("should delete task on delete click", async () => {
        render(<Todos />)

        // adicionar tarefa 
        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
        const taskTitle = "Nova Tarefa"
        const addButton = screen.getByLabelText("Adicionar");

        await userEvent.type(input, taskTitle)
        screen.getByDisplayValue(taskTitle)

        await userEvent.click(addButton)

        // deletar tarefa adicionada


        const editButton = screen.getByLabelText(`editar ${taskTitle}`)
        await userEvent.click(editButton)
        const editedTask = screen.queryByText(taskTitle)
        expect(editedTask).toBeInTheDocument
    });

    it("should text when have zero tasks", () => {
        render(<Todos />);
        const textTasks = screen.getByText('Você não tem tarefas');
        expect(textTasks).toBeInTheDocument();
      });
    
      it("should text when have one task", async () => {
        render(<Todos />);
        // adicionar tarefa 
        const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
        const taskTitle = "Nova Tarefa"
        const addButton = screen.getByLabelText("Adicionar");

        await userEvent.type(input, taskTitle)
        screen.getByDisplayValue(taskTitle)

        await userEvent.click(addButton)
        const textTasks = screen.getByText('Você tem (1) tarefa');
        expect(textTasks).toBeInTheDocument();
      });
})