<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodosStore } from "@/store/use-todos-store";
import { getTodo, deleteTodo } from "@/api/axios-requests";

const route = useRoute();
const router = useRouter();
const todosStore = useTodosStore();
const todoId = route.params.id;
const todo = ref({});

async function fetchTodo() {
  const todo = await getTodo(todoId);
  return todo;
}

const handleDelete = () =>
  todosStore.deleteItem(todoId).then(() => router.push("/todos"));

onMounted(async () => {
  const currentTodo = await fetchTodo();
  todo.value = currentTodo;
});
</script>

<template>
  <div class="page">
    <router-link to="/todos">
      <button class="back-button bi bi-arrow-return-left"></button>
    </router-link>
    <h2 class="title">{{ todo.title }}</h2>
    <button>mark as done</button>
    <button @click="handleDelete">delete</button>
  </div>
</template>

<style scoped lang="sass">
.title
    font-size: 20px
    margin-bottom: 15px

.back-button
  width: 44px
  height: 44px
  position: fixed
  top: 15px
  left: 15px
  cursor: pointer
  border: none
  background: transparent
  &::before
    font-size: 38px
</style>
