import axios from "axios";
const token = import.meta.env.VITE_MOCKAPI_TOKEN;
const ref = `${token}/todos`;

export const getTodos = async () => {
    const todos = await axios.get(ref).then(result => result.data);
    return todos;
}

export const getTodo = async (id) => {
    return axios.get(`${ref}/${id}`).then(result => result.data);
}

export const postTodo = async (todo) => {
    return await axios.post(ref, todo);
}

export const deleteTodo = async (id) => {
    axios.delete(`${ref}/${id}`)
}

export const updateAsDone = async (todo) => {
    axios.put(`${ref}/${todo.id}`, { done: todo.done });
}