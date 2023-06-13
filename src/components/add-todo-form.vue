<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    createPost() {
      this.$emit("oncreate", {
        id: Date().now,
        title: this.title,
        done: false,
      });
    },
  },
};
</script>

<template>
  <form class="form" @submit.prevent>
    <input
      v-model="title"
      class="input"
      type="text"
      placeholder="enter the name of task"
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
  border: none
  width: 100%
  padding: 10px 15px
  border-radius: 15px
  margin-right: 10px
  background-color: lighten(gray, 42)
  &:focus
    outline: none

.submit-button
  border: none
  border-radius: 15px
  cursor: pointer
  padding: 0 15px
  background-color: lighten(gray, 42)
</style>
