<script setup>
import { useRoute } from "vue-router"
import { ref, onBeforeMount } from "vue"
import router from "../router";
import { useTokenStore } from "../stores/token.js";
const API_HOST = import.meta.env.VITE_BASE_URL;
const userLogin = ref({})
const status = ref()
const tokenStore = useTokenStore();
const accessToken = ref(tokenStore.accessToken);

onBeforeMount(async () => {
  userLogin.value = {
    username: username.value,
    password: password.value,
  }
})

const login = async (input) => {
  try {
    const res = await fetch(`${API_HOST}/token` , {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body : JSON.stringify({input}),
    });
    if (res.status == 200) {
      const response = await res.json();
      localStorage.setItem('accessToken', response.AcessToken);
      localStorage.setItem('refreshToken', response.refleshToken);
      setTimeout(function() {
        router.push('/admin/announcement');
      }, 1500);
    } else {
      alert ('Error refreshing access token');
      router.push('/login');
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

  login(userLogin.value);
};

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
    <div class="w-3/6 flex flex-col mt-8">
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
    <form @submit.prevent="submit()" class="w-3/6 flex flex-col mt-4 bord">
      <h1 class="font-bold">SAS Login</h1>
      <br />

      <h3 class="font-bold">Username</h3>
      <input type="text" id="title" v-model="userLogin.username" v-on:input="changeddata" class="ann-username w-full p-2"
        placeholder="Enter your username" :maxlength="45" />

      <!-- password -->
      <h3 class="font-bold">Password</h3>
      <input type="password" id="password" v-model="userLogin.password" class="ann-password w-full p-2"
        placeholder="Please enter your password" :minlength="8" :maxlength="14" /><br />

      <button  class="ann-button">
        LOGIN
      </button>
    </form>
</div>
</template>
 
<style scoped>
select,
textarea,
input {
  border: 1px solid black;
  margin: 0.5%;
  border-radius: 5px;
}

p {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
}

button {
  width: fit-content;
  height: fit-content;
  border: 2px solid black;
  background-color: lightgrey;
  font-weight: bold;
  padding: 8px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 5px;
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