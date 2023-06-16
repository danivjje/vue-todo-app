<script setup>
import AddTodoForm from "@/components/add-todo-form.vue";
import TodoList from "@/components/todo-list.vue";
import { useTodosStore } from "@/store/use-todos-store";
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";

const todosStore = useTodosStore();
const lessThenHundred = computed(() => todosStore.todos.length < 99);

onMounted(() => {
  todosStore.fetchTodos();
});
</script>

<template>
  <div class="page">
    <AddTodoForm v-if="lessThenHundred" />
    <h2 style="margin-bottom: 35px" class="max-span" v-else>
      Максимальное количество заданий
    </h2>
    <TodoList :todos="todosStore.todos" />
  </div>
</template>

<style lang="sass" scoped>
.max-span
  font-size: 18px
  margin-bottom: 35px
</style>
