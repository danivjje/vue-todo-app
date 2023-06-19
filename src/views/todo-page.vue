<script setup>
import DeletedTask from "@/components/deleted-task.vue";
import TaskNotFound from "@/components/task-not-found.vue";
import LoadingSpinner from "@/components/loading-spinner.vue";
import { useTodosStore } from "@/store/use-todos-store";
import { useLoadingStore } from "@/store/use-loading-store";
import { getTodo } from "@/api/axios-requests";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

const route = useRoute();
const todosStore = useTodosStore();
const loadingStore = useLoadingStore();

const todo = ref({});
const isDelete = ref(false);
const notFound = ref(false);
const todoId = route.params.id;
const renderDoneClass = computed(() => (todo.value.done ? "success" : ""));

async function fetchTodo() {
  const todo = await getTodo(todoId);
  return todo;
}

const handleDelete = async () => {
  await todosStore.deleteItem(todoId);
  isDelete.value = true;
};

const handleComplete = () => {
  todo.value.done = !todo.value.done;
  todosStore.markAsDone(todo.value);
};

const handleRestore = () => {
  isDelete.value = false;
};

onBeforeMount(async () => {
  try {
    loadingStore.startLoading();
    const currentTodo = await fetchTodo();
    todo.value = currentTodo;
    loadingStore.finishLoading();
  } catch (error) {
    notFound.value = true;
  }
});
</script>

<template>
  <div class="page">
    <router-link to="/todos">
      <button class="back-button bi bi-arrow-return-left"></button>
    </router-link>

    <div class="found-wrapper" v-if="!notFound">
      <loading-spinner v-if="loadingStore.isLoading" />
      <template v-else>
        <deleted-task v-if="isDelete" @onrestore="handleRestore" :todo="todo" />
        <template v-else>
          <h2 :class="'title ' + renderDoneClass">{{ todo.title }}</h2>
          <div class="buttons-wrapper">
            <button class="button mark-button" @click="handleComplete">
              mark as done
            </button>
            <button class="button delete-button" @click="handleDelete">
              delete
            </button>
          </div>
          <span class="date-span"
            ><b>Date of create:</b>
            {{ new Date(parseInt(todo.date)).toString() }}</span
          >
        </template>
      </template>
    </div>
    <task-not-found v-else />
  </div>
</template>

<style scoped lang="sass">
.found-wrapper
  display: flex
  flex-direction: column
  align-items: center

.title
  text-align: center
  font-size: 20px
  margin-bottom: 15px
  max-width: 90%

.success
  text-decoration: line-through

.buttons-wrapper
  display: flex
  justify-content: center
  margin-bottom: 25px

.button
  cursor: pointer
  padding: 8px 20px
  border-radius: 10px
  background-color: rgba(251, 192, 243, 0.8)
  border: none
  &:not(:last-child)
    margin-right: 15px

.date-span
  display: block
  width: 100%
  text-align: center

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

@media screen and (max-width: 576px)
  .found-wrapper
    margin-top: 55px
</style>
