<script>
import TodoList from "@/components/todo-list.vue";
import AddTodoForm from "@/components/add-todo-form.vue";

export default {
  components: {
    AddTodoForm,
    TodoList,
  },
  data() {
    return {
      todos: [
        { id: 1, title: "lorem ipsum dolor 1", done: true },
        { id: 2, title: "lorem ipsum dolor 2", done: false },
        { id: 3, title: "lorem ipsum dolor 3", done: false },
      ],
    };
  },
  methods: {
    deleteTodo(todo) {
      this.todos = this.todos.filter((item) => item.id !== todo.id);
    },
    createTodo(todo) {
      this.todos.push(todo);
    },
  },
};
</script>

<template>
  <AddTodoForm @oncreate="(todo) => createTodo(todo)" />
  <TodoList :ondelete="deleteTodo" :todos="todos" />
</template>

<style lang="sass" src="@/index.sass"></style>
