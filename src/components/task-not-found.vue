<script setup></script>

<template>
  <div class="wrapper">
    <h2 class="title">
      Ошибка, элемент не был найден.
      <router-link class="link" to="/todos"
        >Вернуться к списку заданий</router-link
      >
    </h2>
  </div>
</template>

<style lang="sass" scoped>
.wrapper
  margin-top: 55px

.title
  font-size: 17px
  text-align: center
</style>
