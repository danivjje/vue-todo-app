<script setup>
import AddTodoForm from "@/components/add-todo-form.vue";
import TodoList from "@/components/todo-list.vue";
import { useTodosStore } from "@/store/use-todos-store";
import { onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";

const todosStore = useTodosStore();
const lessThenHundred = computed(() => todosStore.todos.length < 99);
const zeroTasks = computed(() => todosStore.todos.length <= 0);

onBeforeMount(async () => {
  if (!todosStore.todos.length) todosStore.fetchTodos();
});
</script>

<template>
  <div class="page">
    <add-todo-form v-if="lessThenHundred" />
    <h2 v-else style="margin-bottom: 35px" class="max-span">
      Максимальное количество заданий
    </h2>
    <span v-if="zeroTasks">add any task</span>
    <todo-list v-else :todos="todosStore.todos" />
  </div>
</template>

<style lang="sass" scoped>
.max-span
  font-size: 18px
  margin-bottom: 35px
</style>
