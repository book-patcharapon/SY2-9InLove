<script setup>
import {useRoute} from "vue-router"
import {ref, onBeforeMount, onUpdated} from "vue"
import router from "../router";
import {useTokenStore} from "../stores/token.js";
import SideBar from "@/App.vue";
import {getUserByUsername} from "@/composable/doUser";

const API_HOST = import.meta.env.VITE_BASE_URL;
const userLogin = ref({})
const status = ref()
const tokenStore = useTokenStore();
const accessToken = ref(tokenStore.accessToken);
const username = ref("");
const password = ref("");
const user = ref()
const role = ref()

onBeforeMount(async () => {
  userLogin.value = {
    username: username.value,
    password: password.value,
  }
})

// onUpdated(async () => {
//   user.value = getUserByUsername(username)
//   role.value = user.value.role
// })

const login = async (input) => {
  try {
    const res = await fetch(`${API_HOST}/token`, {
      method: 'POST',
      headers: {"content-type": "application/json"},
      body: JSON.stringify(input),
    });
    status.value = res.status;
    if (res.status == 200) {
      const response = await res.json();

      tokenStore.setAccessToken(response.token);
      tokenStore.setRefreshToken(response.refreshToken);

      setTimeout(function () {
        router.push('/announcement');
      }, 1500);
    } else {
      throw new Error(`There is error`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const submit = () => {
  userLogin.value = {
    username: username.value,
    password: password.value,
  };
  // console.log(userLogin.value);
  login(userLogin.value);
}

// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken')
//     const res = await fetch('http://localhost:8080/api/users/refresh' , {
//       method: 'POST',
//       headers: { "content-type": "application/json" },
//       body : JSON.stringify({refreshToken}),
//     });
//     if (res.status == 200) {
//       const newAcessToken = await res.text();
//       localStorage.setItem('jwtToken', newAcessToken);
//     setTimeout(function() {
//       refreshAccessToken();
//     }, 23*60*60*1000);
//     }else {
//       alert ('Error refreshing access token');
//       router.push('/login');
//     }
//   } catch (error) {
//     console.error(`ERROR: ${error}`)
//   }
// }
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">

    <div class="w-2/6 flex flex-col bord bg-white">
      <form @submit.prevent="submit()">
        <h1 class="font-bold">SAS Login</h1>
        <br/>

        <h3 class="font-bold">Username</h3>
        <input type="text" id="title" v-model="username" v-on:input="changeddata" class="ann-username w-full"
               placeholder="Enter your username" :maxlength="45"/>

        <!-- password -->
        <h3 class="font-bold">Password</h3>
        <input type="password" id="password" v-model="password" class="ann-password w-full"
               placeholder="Please enter your password" :minlength="8" :maxlength="14"/><br/>

        <div class="w-full flex flex-col justify-center items-center  mt-2">

          <button id="login" type="submit" class="ann-button">
            LOGIN
          </button>

          <h3 class="font-bold mt-2 mb-2">
            OR
          </h3>

          <button id="guest" type="button">
            <RouterLink :to="{ name: 'AnnouncementPage' }">
              GUEST MODE
            </RouterLink>
          </button>
        </div>
      </form>
    </div>

    <div v-if="status != null || status != undefined" class="w-2/6 flex flex-col mt-8">
      <div v-if="status == 200" class="ann-message green-bord">
        <h3>Login Successful</h3>
      </div>
      <div v-if="status == 401" class="ann-message red-bord">
        <h3>Password Incorrect</h3>
      </div>
      <div v-if="status == 404" class="ann-message red-bord">
        <h3>A user with The specified username DOES NOT exist</h3>
      </div>
    </div>

  </div>
</template>

<style scoped>
select,
textarea,
input {
  border: 1px solid black;
  margin: 0.5%;
  border-radius: 5px;
  padding: 0.5rem;
}

p {
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
}

button {
  width: fit-content;
  height: fit-content;
  border: 2px solid black;
  background-color: lightgrey;
  font-weight: 600;
  padding: 8px;
  border-radius: 5px;
}

button:enabled:hover {
  background-color: black;
  color: white;
}

.bord {
  padding: 8px;
  border: 3px solid black;
  border-radius: 10px;
}

.red-bord {
  padding: 8px;
  border: 2px solid red;
  border-radius: 10px;
  background-color: lightcoral;
}

.green-bord {
  padding: 8px;
  border: 2px solid green;
  border-radius: 10px;
  background-color: lightgreen;
}

h1 {
  font-size: 32px;
}

h3 {
  font-size: 20px;
}
</style>