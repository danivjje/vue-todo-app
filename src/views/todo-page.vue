<script>
import { getTodo, updateAsDone, deleteTodo } from "@/api/axios-requests";

export default {
  data() {
    return {
      id: this.$route.params.id,
      todo: {},
    };
  },
  methods: {
    async fetchTodo() {
      const todo = await getTodo(this.id);
      return todo;
    },
  },
  async mounted() {
    this.todo = await this.fetchTodo();
  },
};
</script>

<template>
  <div class="page">
    <router-link to="/todos">
      <button class="back-button bi bi-arrow-return-left"></button>
    </router-link>
    <h2 class="title">{{ todo.title }}</h2>
    <button>mark as done</button>
    <button @click="deleteTodo(todo)">delete</button>
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
