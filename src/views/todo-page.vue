<script setup>
import DeletedTask from "@/components/deleted-task.vue";
import TaskNotFound from "@/components/task-not-found.vue";
import { useTodosStore } from "@/store/use-todos-store";
import { getTodo, updateAsDone } from "@/api/axios-requests";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

const route = useRoute();
const todosStore = useTodosStore();

const todo = ref({});
const isDelete = ref(false);
const notFound = ref(false);
const todoId = route.params.id;
const renderDoneClass = computed(() => (todo.value.done ? "success" : ""));

async function fetchTodo() {
  const todo = await getTodo(todoId);
  return todo;
}

async function markAsDone() {
  if (true) {
    try {
      await updateAsDone(todo.value);
      todo.done = !todo.done;
    } catch (error) {
      console.log("patch error: ", error);
    }
  }
}

const handleDelete = async () => {
  await todosStore.deleteItem(todoId);
  isDelete.value = true;
};

const handleRestore = () => {
  isDelete.value = false;
};

onBeforeMount(async () => {
  try {
    const currentTodo = await fetchTodo();
    todo.value = currentTodo;
    console.log(new Date(parseInt(todo.value?.date)).toString());
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
      <deleted-task @onrestore="handleRestore" v-if="isDelete" :todo="todo" />
      <div v-else class="info-wrapper">
        <h2 :class="'title ' + renderDoneClass">{{ todo.title }}</h2>
        <div class="buttons-wrapper">
          <button class="button mark-button" @click="markAsDone">
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
      </div>
    </div>
    <task-not-found v-else />
  </div>
</template>

<style scoped lang="sass">
.info-wrapper
  display: flex
  flex-direction: column
  align-items: center

.title
  text-align: center
  font-size: 20px
  margin-bottom: 15px

.success
  text-decoration: line-through

.buttons-wrapper
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
