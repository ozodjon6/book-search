<template>
  <div class="container">
    <div class="no-data">
      <img src="../assets/svg/no-data.svg" alt="">
      <span>Oops, didn't find anything</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  background-color: var(--bg-white);
  padding: 40px;
  border-radius: 8px;
}
</style>
