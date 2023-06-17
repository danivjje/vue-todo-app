<script setup>
import { postTodo } from "@/api/axios-requests";
import { useTodosStore } from "@/store/use-todos-store";

const todosStore = useTodosStore();
const emit = defineEmits(["onrestore"]);
const { todo } = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const restorePost = async () => {
  try {
    await postTodo(todo);
    todosStore.todos.push(todo);
    emit("onrestore");
  } catch (error) {
    console.log("post error: ", error);
  }
};
</script>

<template>
  <div class="wrapper">
    <h2 class="title">
      Задание "{{ todo.title }}" было удалено.
      <button @click="restorePost" class="restore-button">Восстановить?</button>
    </h2>
  </div>
</template>

<style lang="sass" scoped>
.title
  font-size: 19px
  font-weight: 600

.restore-button
  background: transparent
  border: none
  cursor: pointer
  font-weight: inherit
  font-size: 17px
  text-decoration: underline
</style>
