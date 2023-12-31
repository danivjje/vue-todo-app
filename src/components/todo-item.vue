<script setup>
import { useTodosStore } from "@/store/use-todos-store";
import { useLoadingStore } from "@/store/use-loading-store";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

const { todo } = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
const router = useRouter();
const todosStore = useTodosStore();
const loadingStore = useLoadingStore();
const renderDoneClass = computed(() => (todo.done ? "success" : ""));

const handleComplete = () => {
  todo.done = !todo.done;
  todosStore.markAsDone(todo);
};

const handleDelete = async () => {
  loadingStore.startLoading();
  await todosStore.deleteItem(todo.id);
  loadingStore.finishLoading();
};
</script>

<template>
  <li @click="handleComplete" class="list-item">
    <button
      @click.stop="router.push(`todo/${todo.id}`)"
      class="bi bi-info-circle-fill more-button"
    ></button>
    <div :class="'item ' + renderDoneClass">
      <span class="name">{{ todo.title }}</span>
      <button @click.stop="handleDelete" class="delete-button"></button>
    </div>
  </li>
</template>

<style lang="sass" scoped>
.list-item
  display: flex
  align-items: center
  &:not(:last-child)
    margin-bottom: 15px

.item
    cursor: pointer
    width: 100%
    padding: 10px 15px
    border-radius: 21px
    background-color: rgba(251, 192, 243, 0.8)
    display: flex
    align-items: center
    justify-content: space-between

.success
    text-decoration: line-through

.name
    max-width: 95%
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

.more-button
  cursor: pointer
  display: block
  width: 28px
  height: 28px
  border: none
  background: transparent
  font-size: 26px
  margin-right: 15px
</style>
