<script>
import TodoList from "@/components/todo-list.vue";
import AddTodoForm from "@/components/add-todo-form.vue";
import { getTodos } from "./api/axios-requests";

export default {
  components: {
    AddTodoForm,
    TodoList,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    deleteTodo(todo) {
      this.todos = this.todos.filter((item) => item.id !== todo.id);
    },
    createTodo(todo) {
      this.todos.push(todo);
    },
    async fetchTodos() {
      const currentTodos = await getTodos();
      if (currentTodos) this.todos.push(...currentTodos);
    },
  },
  computed: {
    lessThenHundred() {
      return this.todos.length < 99;
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>

<template>
  <AddTodoForm v-if="lessThenHundred" @oncreate="(todo) => createTodo(todo)" />
  <h2 style="margin-bottom: 35px" class="max-span" v-else>
    Максимальное количество заданий
  </h2>
  <TodoList :ondelete="deleteTodo" :todos="todos" />
</template>

<style lang="sass" src="@/index.sass"></style>
