<script>
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
      this.todo.done = !this.todo.done;
    },
    deleteItem() {
      this.$emit("ondelete", this.todo);
    },
  },
};
</script>

<template>
  <li :class="'item ' + renderDoneClass" @click="markAsDone">
    <span>{{ todo.title }}</span>
    <button @click="deleteItem" class="delete-button"></button>
  </li>
</template>

<style lang="sass" scoped>
.item
    cursor: pointer
    font-size: 17px
    width: 100%
    padding: 10px 15px
    border-radius: 21px
    background-color: #c28ee8
    display: flex
    align-items: center
    justify-content: space-between
    &:not(:last-child)
        margin-bottom: 15px

.success
    text-decoration: line-through

.delete-button
    cursor: pointer
    display: block
    width: 28px
    height: 28px
    background: transparent
    background-size: contain
    background-repeat: no-repeat
    background-image: url('/delete-icon.png')
    border: none
</style>
