<script setup>
import AddTodoForm from "@/components/add-todo-form.vue";
import TodoList from "@/components/todo-list.vue";
import LoadingSpinner from "@/components/loading-spinner.vue";
import { useTodosStore } from "@/store/use-todos-store";
import { useLoadingStore } from "@/store/use-loading-store";
import { onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";

const todosStore = useTodosStore();
const loadingStore = useLoadingStore();

const lessThenHundred = computed(() => todosStore.todos.length < 99);
const zeroTasks = computed(() => todosStore.todos.length <= 0);

onBeforeMount(async () => {
  if (!todosStore.todos.length) {
    loadingStore.startLoading();
    await todosStore.fetchTodos();
    loadingStore.finishLoading();
  }
});
</script>

<template>
  <div class="page">
    <add-todo-form v-if="lessThenHundred" />
    <h2 v-else style="margin-bottom: 35px" class="max-span">
      Максимальное количество заданий
    </h2>

    <loading-spinner v-if="loadingStore.isLoading" />
    <template v-else>
      <span v-if="zeroTasks">add any task</span>
      <todo-list v-else :todos="todosStore.todos" />
    </template>
  </div>
</template>

<style lang="sass" scoped>
.max-span
  font-size: 18px
  margin-bottom: 35px
</style>
