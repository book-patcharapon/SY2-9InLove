<script setup>
import { ref, onBeforeMount } from "vue";
import { getAnnouncement } from "../composable/doAnnouncement.js";
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js";
import { useTokenStore } from '../stores/token.js'
import { reqAccessToken } from "../composable/doUser"
const API_HOST = import.meta.env.VITE_BASE_URL;
const announcements = ref([]);
const time = Intl.DateTimeFormat().resolvedOptions().timeZone;


onBeforeMount(async () => {
  // announcements.value = await getAnnouncement()
  const checkToken = await getAnnouncement();
    if (typeof checkToken === "object") {
      announcements.value = checkToken
    }
    if (!announcements.value) {
      announcements.value = [];
    }
    else if (checkToken === 'Applied new token') {
      announcements.value = await getAnnouncement();}
})

const deleteAnn = async (annID) => {
  if (confirm("Do you want to delete?")) {
    try {
      const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
      const res = await fetch(`${API_HOST}/announcements/${annID}`, { method: "DELETE" ,
      headers: { Authorization: `Bearer ${accessToken}` },}) //Delete to backend
      if (res.status === 200) {
        announcements.value = announcements.value.filter((ann) => ann.id !== annID); //Delete to frontend
      } else if (res.status === 400) {
        alert('There is no this announcement')
      }else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
      }else {
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
      SIT Announcement System (SAS)
    </h1>
    
    <div v-if="announcements" class="w-full flex justify-center">
      <div class="flex flex-col w-5/6">
        <div class="my-2">
          <p class="text-xl float-left"><b>Date/Time Shown in Timezone:</b> {{ time }}</p>
          <RouterLink :to="{ name: 'AddAnnouncement' }" class="ann-button float-right">
            <button>Add Announcement</button>
          </RouterLink>
        </div>

        <table class="w-full text-center text-gray-400">
          <thead class="text-xl uppercase bg-gray-700 text-gray-400 ">
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Publish Date</th>
              <th>Close Date</th>
              <th>Display</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr class="ann-item bg-gray-800 border-gray-700"
              v-for="(ann, index) in announcements" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="ann-title">{{ ann.announcementTitle }}</td>
              <td class="ann-category">{{ ann.announcementCategory }}</td>
              <td class="ann-publish-date">{{ changeDateTimeFormat(ann.publishDate) }}</td>
              <td class="ann-close-date">{{ changeDateTimeFormat(ann.closeDate) }}</td>
              <td class="ann-display">{{ ann.announcementDisplay }}</td>
              <td>
                <RouterLink :to="{ name: 'AnnouncementView', params: { id: ann.id } }" class="ann-button mr-3 rounded-sm">
                  <button>VIEW</button>
                </RouterLink>
                <button class="ann-button" @click="deleteAnn(ann.id)">
                  DELETE
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else>
      <h1>NO ANNOUNCEMENT</h1>
    </div>
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
