<script setup>
import {RouterLink} from "vue-router";
import router from "../router";
import {useRoute} from "vue-router"
import Announcement from "@/components/Announcement.vue";

const routes = useRoute()

const isActive = (routeName) => {
  return routes.name === routeName
}

const signout = () => {
  // localStorage.setItem('accessToken', '');
  // localStorage.setItem('refreshToken', '');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  router.push("/login");
}

</script>

<template>
  <div class="left-navbar w-1/6">
    <h1 class="ann-app-title text-4xl font-bold flex justify-center font-style: sans-serif p-3">SAS</h1>
    <div class="linkbox">
      <hr/>

      <RouterLink :to="{ name: 'AnnouncementViewer' }" :class="{ 'active': isActive('AnnouncementViewer') }"  class="ann-menu li">
        <button>
          Announcement (Viewer)
        </button>
      </RouterLink>
      <hr/>

      <RouterLink :to="{ name: 'Announcement' }" :class="{ 'active': isActive('Announcement') }" class="ann-menu li">
        <button>
          Announcement
        </button>
      </RouterLink>
      <hr/>

      <RouterLink :to="{ name: 'User' }" :class="{ 'active': isActive('User') }" class="ann-menu li">
        <button>
          User
        </button>
      </RouterLink>
      <hr/>

      <RouterLink :to="{ name: 'MatchPassword' }" :class="{ 'active': isActive('MatchPassword') }" class="ann-menu li">
        <button>
          Match Password
        </button>
      </RouterLink>
      <hr/>
    </div>
    <button class="signout sign-out" @click="signout">
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
  width: 100%;
}

.li {
  color: #fff;
  text-decoration: none;
}

button {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
}

button:hover {
  font-weight: bold;
}

.active {
  background-color: aliceblue;
  color: black;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 16px;
  opacity: 80%;
}

/* button:focus {
  background-color: aliceblue;
  color: black;
  font-weight: bold;
} */

.sign-out {
  position: absolute;
  bottom: 20px;
  border-top: 1px solid;
  width: 80%;
  padding-top: 10px;
}
</style>