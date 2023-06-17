<script setup>
import { ref } from "vue";
import { postTodo } from "@/api/axios-requests";
import { useTodosStore } from "@/store/use-todos-store";

const title = ref("");
const todosStore = useTodosStore();

async function createPost() {
  if (title.value) {
    try {
      const todo = {
        title: title.value,
        done: false,
        date: Date.now().toString(),
      };

      await postTodo(todo).then((item) =>
        todosStore.todos.push(Object.assign(todo, { id: item.data.id }))
      );
      title.value = "";
    } catch (error) {
      console.log("POST ERROR: ", error);
    }
  }
}
</script>

<template>
  <form class="form" @submit.prevent>
    <input
      v-model="title"
      class="input"
      type="text"
      placeholder="enter the name of the task"
    />
    <button @click="createPost" class="submit-button">create</button>
  </form>
</template>

<style lang="sass" scoped>
.form
  margin: 25px 0
  width: 60%
  display: flex

.input
  font-size: 15px
  border: none
  width: 100%
  padding: 12px 25px
  border-radius: 25px
  margin-right: 10px
  background-color: #FBC0F3
  &:focus
    outline: none

.submit-button
  font-size: 16px
  border: none
  border-radius: 25px
  cursor: pointer
  padding: 0 25px
  background-color: #FBC0F3

@media (screen and max-width: 768px)
  .form
    width: 100%
  .input
    font-size: 14px
  .submit-button
    font-size: 14px
</style>
