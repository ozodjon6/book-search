<template>
  <div class="container">
    <div class="details">
      <div @click="goBack" class="details__back-btn">
        <img class="details__icon" src="../assets/svg/arrow-right.svg" alt="">
        <span class="details__text">back</span>
      </div>
      <div class="details__inner" v-if="book">
        <h1>{{ book?.volumeInfo?.title }}</h1>
        <p><strong>Author:</strong> {{ book.volumeInfo.authors?.join(', ') }}</p>
        <img :src="book?.volumeInfo?.imageLinks?.thumbnail" alt="Thumbnail" />
        <p v-html="book?.volumeInfo?.description"></p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "../services/axios.js";
import {ref} from "vue";
import {useRoute} from "vue-router";
import router from "../router/index.js";

const book = ref()
const route = useRoute();
async function getDetails() {
  try {
    const response = await axios.get(`/${route.params.bookId}`);
    book.value = response?.data ?? response?.data?.items;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // handle the error appropriately
  }
}

getDetails()

function goBack() {
  router.back();
}

</script>

<style scoped>
.details {
  display: flex;
  align-items: start;
  flex-direction: column;
  background-color: var(--bg-white);
  border-radius: 4px;
  padding: 32px;
}

.details__inner {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
}

.details__back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
  &:hover .details__icon {
    transform: translateX(-4px) rotate(180deg);
  }

  .details__icon {
      width: 12px;
      height: 12px;
      transform: rotate(180deg);
      transition: all 0.3s ease-in;
  }

  .details__text {
    color: var(--link-primary);
  }
}
</style>
