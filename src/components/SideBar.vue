<script setup>
import { RouterLink } from "vue-router";
import router from "../router";

const signout = () => {
  localStorage.removeItem('accessToken'); 
  localStorage.removeItem('refreshToken');
  router.push("/login");
}

</script>
 
<template>
  <div class="left-navbar w-1/6">
    <h1 class="ann-app-title text-4xl font-bold flex justify-center font-style: sans-serif p-3">SAS</h1>
    <div class="linkbox">
      <hr />
      <RouterLink :to="{ name: 'Announcement' }" class="ann-menu">
        <button class="li">Announcement</button>
      </RouterLink>
      <hr />
      <RouterLink :to="{ name: 'User' }" class="ann-menu">
        <button class="li">User</button>
      </RouterLink>
      <hr />
      <RouterLink :to="{ name: 'MatchPassword' }" class="ann-menu">
        <button class="li">Match Password</button>
      </RouterLink>
      <hr />
    </div>
    <button class="signout" style="position: absolute;bottom: 20px;border-top: 1px solid;width: 80%; padding-top: 10px;"
      @click="signout">
      SIGN OUT
    </button>
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