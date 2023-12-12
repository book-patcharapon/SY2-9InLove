<script setup>
import {ref, onBeforeMount} from 'vue'
import {useRoute} from 'vue-router'
import {changeDateTimeFormat} from '../composable/changeDateTimeFormat.js'
import {getAnnouncementDetail} from '../composable/doAnnouncement.js'
import {useTokenStore} from "@/stores/token";
import router from "../router";

const haveInfo = ref()
const announcementDetail = ref([])
const {params} = useRoute()
const {accessToken} = useTokenStore()

onBeforeMount(async () => {
  const checkToken = await getAnnouncementDetail(params.id);
  if (typeof checkToken === "object") {
    announcementDetail.value = checkToken
  }
  if (!announcementDetail.value) {
    announcementDetail.value = [];
  } else if (checkToken === 'Applied new token') {
    announcementDetail.value = await getAnnouncementDetail(params.id);
  }
  // announcementDetail.value = await getInformation(params.id)
  if (announcementDetail) {
    haveInfo.value = true
  }
})

const back = () => {
  // Use the history object to go back
  window.history.back()
}

</script>

<template>
  <div class="w-full flex justify-center">
    <div v-if="haveInfo" class="flex flex-col p-4 w-3/6">
      <h1 class="text-4xl p-4 font-bold">Announcement Detail:</h1>
      <div class="content text-xl">
        <p class="ann-title"><b>TITLE:</b> {{ announcementDetail.announcementTitle }}</p>
        <p class="ann-category"><b>CATEGORY:</b> {{ announcementDetail.announcementCategory }}</p>
        <p class="ann-description"><b>DESCRIPTION:</b> {{ announcementDetail.announcementDescription }}</p>
        <p class="ann-publish-date"><b>PUBLISH DATE:</b> {{ changeDateTimeFormat(announcementDetail.publishDate) }}</p>
        <p class="ann-close-date"><b>ClOSE DATE:</b> {{ changeDateTimeFormat(announcementDetail.closeDate) }}</p>
        <p class="ann-display"><b>DISPLAY:</b> {{ announcementDetail.announcementDisplay }}</p>
      </div>
      <div class="flex my-2">
<!--        <RouterLink :to="{ name: 'Announcement' }" class="ann-button">-->
<!--          <button>BACK</button>-->
<!--        </RouterLink>-->
        <button @click="back">
          BACK
        </button>

        <RouterLink :to="{ name: 'UpdateAnnouncement', params: { id: params.id } }" v-if="accessToken"
                    class="ann-button">
          <button>EDIT</button>
        </RouterLink>
      </div>
    </div>

    <div v-else>
      <h1>The request page is not available</h1>
    </div>
  </div>
</template>

<style scoped>
button {
  border: 2px solid black;
  background-color: lightgrey;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
}

button:enabled:hover {
  background-color: black;
  color: white;
}

.content {
  border: 3px solid black;
  padding: 1rem;
  border-radius: 0.5rem;
}

p {
  margin: 1.5% 0%;
}
</style>
