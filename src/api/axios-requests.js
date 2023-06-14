import axios from "axios";
const token = import.meta.env.VITE_MOCKAPI_TOKEN;

export const getTodos = async () => {
    const todos = await axios.get(`${token}/todos`).then(result => result.data);
    return todos;
}

export const postTodo = async (todo) => {
    axios.post(`${token}/todos`, todo);
}

export const deleteTodo = async (todo) => {
    axios.delete(`${token}/todos/${todo.id}`)
}