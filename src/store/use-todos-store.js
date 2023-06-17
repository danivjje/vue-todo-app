import { defineStore } from "pinia";
import { deleteTodo, getTodos } from '@/api/axios-requests';
import { ref } from "vue";

export const useTodosStore = defineStore('todos', () => {
    const todos = ref([]);

    const fetchTodos = async () => {
        const currentTodos = await getTodos();
        if (currentTodos) {
            if (Array.isArray(currentTodos)) todos.value.push(...currentTodos);
            else todos.value.push(...Object.values(currentTodos));
        }
    };

    async function deleteItem(id) {
        try {
            await deleteTodo(id);
            todos.value = todos.value.filter((item) => item.id !== id);
        } catch (error) {
            console.log("remove error: ", error);
        }
    }

    return { todos, deleteItem, fetchTodos }
})