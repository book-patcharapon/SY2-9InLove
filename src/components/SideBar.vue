<script setup>
import {RouterLink} from "vue-router";
import router from "../router";
import {useRoute} from "vue-router"
import {jwtDecode} from "jwt-decode";
import {useTokenStore} from "@/stores/token";
import {ref, onBeforeMount, onMounted} from "vue"
import {getUserByUsername} from "@/composable/doUser";

const tokenStore = useTokenStore()
const {accessToken} = useTokenStore()
const routes = useRoute()
const username = ref()
const user = ref()

const isActive = (routeName) => {
  return routes.name === routeName
}

const signOut = () => {
  // clear local storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // clear pinia
  tokenStore.setAccessToken("")
  tokenStore.setRefreshToken("")

  router.push("/login");
}

onMounted(async () => {
  if (accessToken) {
    username.value = await jwtDecode(accessToken)
    user.value = await getUserByUsername(username.value.sub)
  }
})

</script>

<template>
  <div class="left-navbar w-1/6">
    <h1 class="ann-app-title text-4xl font-bold flex justify-center font-style: sans-serif p-3">SAS</h1>
    <div class="link-box">

      <div v-if="username" class="space">
        <p>{{ username.sub }}</p>
      </div>
      <hr/>

      <RouterLink :to="{ name: 'AnnouncementViewer' }" class="ann-menu li">
        <button :class="{ 'active': isActive('AnnouncementViewer') }">
          Announcement (Viewer)
        </button>
        <hr/>
      </RouterLink>

      <RouterLink :to="{ name: 'Announcement' }" v-if="user" class="ann-menu li">
        <button :class="{ 'active': isActive('Announcement') }">
          Announcement
        </button>
        <hr/>
      </RouterLink>

      <div v-if="user && user.role === 'admin'">
        <RouterLink :to="{ name: 'User' }" class="ann-menu li">
          <button :class="{ 'active': isActive('User') }">
            User
          </button>
        </RouterLink>
        <hr/>

        <RouterLink :to="{ name: 'MatchPassword' }" class="ann-menu li">
          <button :class="{ 'active': isActive('MatchPassword') }">
            Match Password
          </button>
        </RouterLink>
      </div>

      <hr/>

    </div>

    <div>
      <button v-if="user" class="sign-out" @click="signOut">
        SIGN OUT
      </button>
      <button v-else class="sign-out" @click="signOut">
        LOGIN
      </button>
    </div>

  </div>
</template>

<style scoped>
.sign-out {
  position: absolute;
  bottom: 20px;
  border-top: 1px solid;
  width: 80%;
  padding-top: 10px;
}

.left-navbar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #333;
  color: #fff;
  padding: 20px;
}

.link-box {
  text-align: center;
  width: 100%;
}

.li {
  color: #fff;
  text-decoration: none;
}

.space {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
}

.active {
  background-color: aliceblue;
  color: black;
  font-weight: bold;
  width: 100%;
  height: 100%;
  opacity: 80%;
}

button {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
}

button:hover {
  font-weight: bold;
}

/*button:focus {*/
/*  background-color: aliceblue;*/
/*  color: black;*/
/*  font-weight: bold;*/
/*  padding-top: 16px;*/
/*  padding-bottom: 16px;*/
/*  opacity: 80%;*/
/*}*/

h1 {
  font-size: 32px;
}

h3 {
  font-size: 20px;
}
</style>