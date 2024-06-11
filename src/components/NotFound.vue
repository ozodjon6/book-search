<template>
  <div class="container">
    <div class="wrapper-404">
      <div class="not-found">
        <h1>Error 404</h1>
        <button @click="goHome" class="btn">Return</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "../router/index.js";

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.wrapper-404 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.not-found {
  width: 100%;
  background-color: var(--bg-white);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  padding: 64px;
  border-radius: 4px;

  .btn {
    padding: 8px 16px;
    background-color: var(--bg-color);
    border: 0 none;
    border-radius: 4px;
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
