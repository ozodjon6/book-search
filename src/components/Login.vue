<template>
  <div class="container">
    <div class="wrapper-login">
      <div class="login">
        <h1 class="title">Login</h1>
        <form class="login__form" @submit.prevent="handleLogin">
          <input
              type="text"
              v-model="token"
              placeholder="Enter 16-character token"
              maxlength="16"
              class="login__input"
          />
          <button class="login__btn" type="submit">Login</button>
        </form>
        <p class="login__message" v-if="errorMessage">{{ errorMessage }}</p>
        <div v-if="loading" class="loader">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import router from "../router/index.js";

const token = ref("")
const errorMessage = ref("")
const loading = ref(false)
const handleLogin = () => {
  const regex = /^[A-Za-z]{16}$/;
  if (!regex.test(token.value)) {
    errorMessage.value = "Invalid token. Please enter 16 alphabetic characters.";
    return;
  }
  loading.value = true;
  errorMessage.value = "";
  setTimeout(() => {
    loading.value = false;
    if (token.value === "validTokenString") {
      router.push("/search");
    } else {
      errorMessage.value = "Invalid token. Please try again.";
    }
  }, 3000);
}
</script>

<style scoped>
.wrapper-login {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 570px;
  margin: 0 auto;
  padding: 56px 0;
  border-radius: 8px;
  background-color: #ffffff;

    h1.title {
      margin-bottom: 24px;
    }

  .login__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 320px;

    .login__input {
      padding: 12px;
      border-radius: 4px;
      border: 1px solid var(--stroke-primary);
      background-color: var(--field-bg-normal);
    }

    .login__btn {
      padding:12px;
      border: 0 none;
      background-color: var(--bg-color);
      color: #fff;
      border-radius: 4px;
      font-weight: 700;
      font-size: 14px;
      width: 100%;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .loader {
    margin-top: 12px;
  }

  .login__message {
    margin-top: 12px;
    font-size: 14px;
    color: var(--error-system);
  }
}
</style>
