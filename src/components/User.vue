<script setup>
import { ref, onBeforeMount } from "vue";
import { getUsers } from "../composable/doUser.js"
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
const users = ref([])
const time = Intl.DateTimeFormat().resolvedOptions().timeZone;

onBeforeMount(async () => {
    users.value = await getUsers()
})

const deleteUser = async (userId) => {
  if (confirm("Do you want to delete?")) {
    try {
      const res = await fetch(`${VITE_BASE_URL}/users/${userId}`, { method: "DELETE" }) //Delete to backend
      if (res.status === 200) {
        users.value = users.value.filter((usr) => usr.id !== userId); //Delete to frontend
      } else if (res.status === 400) {
        alert('There is no this announcement')
      } else {
        throw new Error(`Cannot delete`)
      }
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }
}
</script>
 
<template>
    <div class="w-full flex flex-col">
        <h1 class="text-4xl font-bold flex justify-center font-style:sans-serif">
            User Management
        </h1>
    </div>

    <div v-if="users" class="w-full flex justify-center">
        <div class="flex flex-col w-5/6">
            <div class="my-2">
                <p class="ann-timezone text-xl float-left"><b>Date/Time Shown in Timezone:</b> {{ time }}</p>
                <RouterLink :to="{ name: 'AddUser' }" class="ann-button float-right">
                    <button>Add User</button>
                </RouterLink> 
            </div>

            <table class="w-full text-center text-gray-400">
                <thead class="text-xl uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created On</th>
                        <th>Updated On</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="ann-item bg-gray-800 border-gray-700" v-for="(user, index) in users" :key="index">
                        <td>{{ index + 1 }}</td>
                        <!-- <td>{{ user.id }}</td> -->
                        <td class="ann-username">{{ user.username }}</td>
                        <td class="ann-name">{{ user.name }}</td>
                        <td class="ann-email">{{ user.email }}</td>
                        <td class="ann-role">{{ user.role }}</td>
                        <td class="ann-created-on">{{ changeDateTimeFormat(user.createdOn) }}</td>
                        <td class="ann-updated-on">{{ changeDateTimeFormat(user.updatedOn) }}</td>
                        <td>
                            <RouterLink :to="{ name: 'EditUser', params: { id: user.id } }" class="ann-button mr-3 rounded-sm">
                                <button>edit</button>
                            </RouterLink>
                            <button class="ann-button" @click="deleteUser(user.id)">
                                delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-else>
        NO USER
    </div>
</template>
 
<style scoped>
button {
  border: 2px solid black;
  background-color: lightgrey;
  color: black;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 5px;
}

button:enabled:hover {
  background-color: black;
  color: white;
}

th {
  padding: 0.5em;
}

td {
  padding: 1em 0.5em;
}
</style>