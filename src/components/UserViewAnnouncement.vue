<script setup>
import { onBeforeMount, ref } from "vue";
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js";
import { useRoute, RouterLink } from "vue-router";
import { annUserId } from "../composable/doAnnouncement";
import { useModeStore } from '../stores/mode.js'

const haveInfo = ref()
const { params } = useRoute();
const AnnDetail = ref([]);
const modeStore = useModeStore()
const checkMode = ref(modeStore.ActiveCloseBut);

onBeforeMount(async () => {
  AnnDetail.value = await annUserId(params.id)
  if (AnnDetail) {
    haveInfo.value = true
  }
})
</script>
 
<template>
  <div class="big ml-2">
    <div v-if="!haveInfo">
      <h1>The request page is not available</h1>
    </div>

    <div v-else>
      <h2 border-style: double>Announcement Detail :</h2>
      <div class="ann-item">
        <div class="head">
          <h1 class="ann-title">
            {{ AnnDetail.announcementTitle }}<br />
            <span class="ann-category">{{ AnnDetail.announcementCategory }}</span><br>
            <span class="ann-close-date" v-if="checkMode === true">Closed On: {{ changeDateTimeFormat(AnnDetail.closeDate)
            }}</span>
          </h1>
          <hr style="border: 0.1px solid lightgray" />
          <div style="width: 100%">
            <p class="ann-description" style="font-size: 18px;">
              <!-- <b style="font-size: 20px;">Description: </b> -->
              {{ AnnDetail.announcementDescription }}
            </p>
          </div>
        </div>

        <hr style="border: 0.1px solid lightgray" />
        
        <div class="butClass">
          <RouterLink :to="{ name: 'UserAnnouncement' }">
            <button class="ann-button mt-2 p-2">Back</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
.ann-button {
  background-color: gray;
  border-radius: 5px;
}

.big {
  display: block;
  justify-content: center;
}
</style>