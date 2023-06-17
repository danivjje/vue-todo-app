<script setup>
import TodoItem from "@/components/todo-item.vue";

const { todos, ondelete } = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="list">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<style lang="sass" scoped>
.list
    display: flex
    flex-direction: column
    width: 60%

@media (screen and max-width: 768px)
    .list
        width: 100%
</style>
