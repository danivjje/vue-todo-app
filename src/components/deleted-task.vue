<script setup>
import { postTodo } from "@/api/axios-requests";
import { useTodosStore } from "@/store/use-todos-store";
import { useLoadingStore } from "@/store/use-loading-store";

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
    await todosStore.todos.push(todo);
    emit("onrestore");
  } catch (error) {
    console.log("post error: ", error);
  }
};
</script>

<template>
  <div class="wrapper">
    <h2 class="title">Задание "{{ todo.title }}" было удалено.</h2>
    <div>
      <button @click="restorePost" class="restore-button">Восстановить?</button>
      <router-link to="/todos">
        <button class="route-button">Вернуться назад</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.wrapper
  display: flex
  flex-direction: column
  align-items: center

.title
  font-size: 19px
  font-weight: 600
  display: flex
  flex-direction: column
  align-items: center
  max-width: 85%
  text-align: center

.restore-button, .route-button
  background: transparent
  border: none
  cursor: pointer
  font-weight: 600
  font-size: 17px
  text-decoration: underline

.restore-button
  margin-right: 15px

@media screen and (max-width: 576px)
  .title
    font-size: 16px
  .restore-button, .route-button
    font-size: 16px
</style>
