<template>
  <div>
    <h1>App</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link :to="{name: 'home'}" v-if="userStore.userData">Home</router-link> | 
      <router-link :to="{name: 'login'}" v-if="!userStore.userData">Login</router-link> | 
      <router-link :to="{name: 'register'}" v-if="!userStore.userData">Register</router-link> | 
      <button @click="userStore.logoutUser" v-if="userStore.userData">로그아웃</button>
    </nav>
    <div v-else>
      loading...
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { useUserStore } from "./store/user";

  const userStore = useUserStore();

</script>