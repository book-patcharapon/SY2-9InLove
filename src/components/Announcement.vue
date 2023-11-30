<script setup>
import {ref, onBeforeMount} from "vue";
import {
  getAnnouncement,
  getAnnouncementActive,
  getAnnouncementClose,
  getAnnouncementFilterCategory
} from "../composable/doAnnouncement.js";
import {changeDateTimeFormat} from "../composable/changeDateTimeFormat.js";
import {useTokenStore} from '../stores/token.js'
import {getUserByUsername, reqAccessToken} from "../composable/doUser"
import {jwtDecode} from "jwt-decode";

const API_HOST = import.meta.env.VITE_BASE_URL;
const announcements = ref([]);
const time = Intl.DateTimeFormat().resolvedOptions().timeZone;
const categoryId = ref(0)
const tokenStore = useTokenStore()
const {accessToken} = useTokenStore()
const username = ref()
const user = ref()

onBeforeMount(async () => {
  // announcements.value = await getAnnouncement()
  if (accessToken) {
    username.value = await jwtDecode(accessToken)
    user.value = await getUserByUsername(username.value.sub)
  }

  const checkToken = await getAnnouncement();

  if (typeof checkToken === "object") {
    announcements.value = checkToken
  }

  if (!announcements.value) {
    announcements.value = [];
  } else if (checkToken === 'Applied new token') {
    announcements.value = await getAnnouncement();
  }
})

const changeCategory = async (categoryId) => {
  announcements.value = await getAnnouncementFilterCategory(categoryId)
}

const deleteAnnouncement = async (annID) => {
  if (confirm("Do you want to delete?")) {
    try {
      const tokenStore = useTokenStore()
      const accessToken = tokenStore.accessToken
      const res = await fetch(`${API_HOST}/announcements/${annID}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      if (res.status === 200) {
        announcements.value = announcements.value.filter((ann) => ann.id !== annID); // Delete to frontend
      } else if (res.status === 400) {
        alert('There is no this announcement')
      } else if (res.status === 401) {
        const reqAccess = await reqAccessToken()
        return reqAccess
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
  <div class="w-full h-screen flex flex-col items-center">

    <div v-if="announcements" class="w-full flex flex-col justify-center items-center">
<!--      flex justify-center font-style:sans-serif-->
      <h1 class="font-bold">SIT Announcement System (SAS)</h1>

      <div class="w-5/6 my-2">
        <h3 class="font-bold float-left">Choose category: </h3>
        <select @change="changeCategory(categoryId)" v-model="categoryId">
          <option id="0" :value=0>ทั้งหมด</option>
          <option id="1" :value=1>ทั่วไป</option>
          <option id="2" :value=2>ทุนการศึกษา</option>
          <option id="3" :value=3>หางาน</option>
          <option id="4" :value=4>ฝึกงาน</option>
        </select>

        <RouterLink :to="{ name: 'AddAnnouncement' }" class="float-right ann-button">
          <button>ADD ANNOUNCEMENT</button>
        </RouterLink>
      </div>

      <table v-if="announcements.length != 0" class="w-5/6 my-2">
        <thead class="text-xl uppercase">
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Category</th>
          <th>Publish Date</th>
          <th>Close Date</th>
          <th>Display</th>
          <th v-if="user && user.role === 'admin'">Owner</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
        <tr class="ann-item" v-for="(ann, index) in announcements" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="ann-title">{{ ann.announcementTitle }}</td>
          <td class="ann-category">{{ ann.announcementCategory }}</td>
          <td class="ann-publish-date">{{ changeDateTimeFormat(ann.publishDate) }}</td>
          <td class="ann-close-date">{{ changeDateTimeFormat(ann.closeDate) }}</td>
          <td class="ann-display">{{ ann.announcementDisplay }}</td>
          <td class="ann-owner" v-if="user && user.role === 'admin'">{{ ann.announcementOwner }}</td>
          <td>
            <RouterLink :to="{ name: 'AnnouncementDetail', params: { id: ann.id } }"
                        class="ann-button mr-3 rounded-sm">
              <button>VIEW</button>
            </RouterLink>
            <button class="ann-button" @click="deleteAnnouncement(ann.id)">
              DELETE
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <h1 v-else>No Announcement</h1>

      <div class="below">
        <p><b>Date/Time Shown in Timezone:</b> {{ time }}</p>
      </div>
    </div>

    <div v-else class="vertical-center">
      <h1>NO ANNOUNCEMENT</h1>
    </div>
  </div>
</template>

<style scoped>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.below {
  position: fixed;
  bottom: 0;
}

button {
  border: 2px solid black;
  background-color: lightgrey;
  color: black;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 5px;
}

button:enabled:hover {
  background-color: black;
  color: white;
}

select {
  border: 2px solid black;
  padding: 0.25%;
  /*margin: 0.5%;*/
  margin-left: 0.5%;
  border-radius: 5px;
}

table {
  border: 2px solid black;
  text-align: center;
}

th {
  padding: 0.5em;
  background-color: lightgrey;
}

td {
  padding: 1em 0.5em;
  border: 2px solid black;
}

h1 {
  font-size: 34px;
}

h3 {
  font-size: 24px;
}
</style>
