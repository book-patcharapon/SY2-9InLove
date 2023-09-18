<script setup>
import { useRoute } from "vue-router"
import { ref, onBeforeMount } from "vue"
import { checkPassword } from "../composable/doUser.js"

const userLogin = ref({})
const status = ref()
const errorDetail = ref()

onBeforeMount(async () => {
  userLogin.value = {
    username: "",
    password: "",
  }
})

const matchPassword = async (user) => {
  status.value = await checkPassword(user)
}
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
      <div class="w-3/6 flex flex-col mt-8">
        <div v-if="status==200" class="ann-message green-bord">
            <h3>Password Matched</h3>
        </div>
        <div v-if="status==401" class="ann-message red-bord">
            <h3>Password NOT Matched</h3>
        </div>
        <div v-if="status==404" class="ann-message red-bord">
            <h3>The specified username DOES NOT exist</h3>
        </div>
      </div>

      <div class="w-3/6 flex flex-col mt-4 bord">
        <h1 class="font-bold">Match Password</h1>
        <br />

        <h3 class="font-bold">Username</h3>
        <input
          type="text"
          id="title"
          v-model="userLogin.username"
          v-on:input="changeddata"
          class="ann-username w-full p-2"
          placeholder="Enter your username"
          :maxlength="45"
        />
        <!-- password -->
        <h3 class="font-bold">Password</h3>
        <input
          type="password"
          id="password"
          v-model="userLogin.password"
          class="ann-password w-full p-2"
          placeholder="Please enter your password"
          :minlength="8"
          :maxlength="14"
        /><br />
        
        <button @click="matchPassword(userLogin)" class="ann-button">
          Match or not
        </button>
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
