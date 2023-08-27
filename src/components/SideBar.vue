<script setup>
import { RouterLink } from "vue-router";
</script>
 
<template>
  <div class="left-navbar w-1/6">
    <h1 class="ann-app-title text-4xl font-bold flex justify-center font-style: sans-serif p-3">SAS</h1>
    <div class="linkbox">
      <hr/>
      <RouterLink :to="{ name: 'Announcement' }" class="ann-menu">
        <button class="li ">Announcement</button>
      </RouterLink>
      <hr/>
      <RouterLink :to="{ name: 'AdminUser' }" class="ann-menu">
        <button class="li">User</button>
      </RouterLink>
      <hr/>
    </div>
  </div>
</template>

<style scoped>
.left-navbar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #333;
  color: #fff;
  padding: 20px;
}
.linkbox {
  text-align: center;
}
.li {
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
}
</style>