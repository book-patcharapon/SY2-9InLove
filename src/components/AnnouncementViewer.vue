<script setup>
import {ref, onBeforeMount, onMounted} from "vue";
import {getAnnouncement, getAnnouncementCategory} from "@/composable/doAnnouncement";
import {changeDateTimeFormat} from "@/composable/changeDateTimeFormat";

const announcements = ref([])
const time = Intl.DateTimeFormat().resolvedOptions().timeZone;
const categoryId = ref(0)

onMounted(async () => {
  announcements.value = await getAnnouncement()
})

const changeCategory = async (categoryId) => {
  announcements.value = await getAnnouncementCategory(categoryId)
}

</script>

<template>
  <div class="w-full h-screen flex flex-col items-center">

    <div v-if="announcements" class="w-full flex flex-col justify-center items-center">
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
      </div>

      <table class="w-5/6 my-2">
        <thead class="text-xl uppercase">
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Category</th>
          <th>Publish Date</th>
          <th>Close Date</th>
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
          <td>
            <RouterLink :to="{ name: 'AnnouncementDetail', params: { id: ann.id } }" class="ann-button mr-3 rounded-sm">
              <button>VIEW</button>
            </RouterLink>
          </td>
        </tr>
        </tbody>
      </table>

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

