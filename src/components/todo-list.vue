<script>
import TodoItem from "./todo-item.vue";

export default {
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
    ondelete: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <ul class="list">
    <TodoItem
      v-for="todo in todos"
      @ondelete="(todo) => ondelete(todo)"
      :key="todo.id"
      :todo="todo"
    />
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
