<script>
import { deleteTodo } from "../api/axios-requests";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    renderDoneClass() {
      return this.todo.done ? "success" : "";
    },
  },
  methods: {
    markAsDone() {
      if (event.target !== this.$refs.deleteButton) {
        this.todo.done = !this.todo.done;
      }
    },
    async deleteItem() {
      try {
        await deleteTodo(this.todo);
        this.$emit("ondelete", this.todo);
      } catch (error) {
        console.log("remove error: ", error);
      }
    },
  },
};
</script>

<template>
  <li :class="'item ' + renderDoneClass" @click="markAsDone">
    <span class="name">{{ todo.title }}</span>
    <button
      ref="deleteButton"
      @click="deleteItem"
      class="delete-button"
    ></button>
  </li>
</template>

<style lang="sass" scoped>
.item
    cursor: pointer
    font-size: 17px
    width: 100%
    padding: 10px 15px
    border-radius: 21px
    background-color: rgba(251, 192, 243, 0.8)
    display: flex
    align-items: center
    justify-content: space-between
    &:not(:last-child)
        margin-bottom: 15px

.success
    text-decoration: line-through

.name
    max-width: 98%
    word-wrap: break-word

.delete-button
    cursor: pointer
    display: block
    width: 28px
    height: 28px
    flex-shrink: 0
    background: transparent
    background-size: contain
    background-repeat: no-repeat
    background-image: url('/delete-icon.png')
    border: none
</style>
