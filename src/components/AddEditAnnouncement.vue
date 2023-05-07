<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { createAnnouncement } from "../composable/createAnnouncement.js";
import { updateAnnouncement } from "../composable/editAnnouncement.js";
import { getInformationForUpdate } from "../composable/getAnnouncementForUpdate.js";

const { params } = useRoute();
const newAnn = ref({});
const pubDate = ref();
const pubTime = ref();
const cloDate = ref();
const cloTime = ref();
let edited = -5;

onMounted(async () => {
  if (!params.id) {
    // Add mode
    // Default value
    newAnn.value = {
      announcementTitle: "",
      announcementDescription: "",
      publishDate: null,
      closeDate: null,
      announcementDisplay: false,
      categoryId: 1,
    };
  } else {
    // Edit mode
    newAnn.value = await getInformationForUpdate(params.id);
    if (newAnn.value.publishDate || newAnn.value.closeDate) {
      [pubDate.value, pubTime.value] = changeUTCtoLocalDatetime(newAnn.value.publishDate);
      [cloDate.value, cloTime.value] = changeUTCtoLocalDatetime(newAnn.value.closeDate);
    }
    if (newAnn.value.announcementDisplay === "Y") {
      newAnn.value.announcementDisplay = true
    } else {
      newAnn.value.announcementDisplay = false
    }
  }
});

const changeDateTimeToUTC = (date, time) => {
  if (date.value && time.value) {
    const newFormat = new Date(`${date.value}T${time.value}`);
    return newFormat.toISOString();
  } else {
    return null;
  }
};

const changeUTCtoLocalDatetime = (utcDatetime) => {
  if (utcDatetime !== null) {
    // Date
    const utcDate = new Date(utcDatetime);
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0');
    const day = String(utcDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    // Time
    const time = utcDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    return [date, time];
  } else {
    return [null, null]
  }
};

const addNewAnnouncement = (newAnn) => {
  newAnn.publishDate = changeDateTimeToUTC(pubDate, pubTime);
  newAnn.closeDate = changeDateTimeToUTC(cloDate, cloTime);
  newAnn.announcementDisplay = !newAnn.announcementDisplay ? "N" : "Y";
  createAnnouncement(newAnn); //add to backend
};

const editAnnouncement = (updateAnn) => {
  newAnn.value.publishDate = changeDateTimeToUTC(pubDate, pubTime);
  newAnn.value.closeDate = changeDateTimeToUTC(cloDate, cloTime);
  newAnn.value.announcementDisplay = !newAnn.value.announcementDisplay ? "N" : "Y";
  updateAnnouncement(params.id, updateAnn); // update to backend
};

watch(
  [newAnn], async () => {
    edited++;
  },
  { deep: true }
);

const variablesToWatch = [pubDate, pubTime, cloDate, cloTime]; // List of variables to monitor
variablesToWatch.forEach(variable => {
  watch([variable], async () => {
    edited++;
  }, { deep: true });
});

</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl font-bold flex justify-center">Announcement Detail:</h1>
    <div class="middle">
      <!-- <div class="ann-title"> -->
      <p>Title</p>
      <input type="text" v-model="newAnn.announcementTitle" class="ann-title w-full" placeholder="Enter a title" /><br />
      <!-- </div> -->

      <p>Category</p>
      <select v-model="newAnn.categoryId" class="ann-category">
        <option id="1" value="1">ทั่วไป</option>
        <option id="2" value="2">ทุนการศึกษา</option>
        <option id="3" value="3">หางาน</option>
        <option id="4" value="4">ฝึกงาน</option>
      </select><br />

      <p>Description</p>
      <textarea v-model="newAnn.announcementDescription" class="ann-description w-full h-36" name="description"
        placeholder="Enter description"></textarea>

      <p>Publish Date</p>
      <input v-model="pubDate" type="date" class="ann-publish-date" />
      <input v-model="pubTime" type="time" class="ann-publish-time" /><br />

      <p>Close Date</p>
      <input v-model="cloDate" type="date" class="ann-close-date" />
      <input v-model="cloTime" type="time" class="ann-close-time" /><br />

      <p>Display</p>
      <input v-model="newAnn.announcementDisplay" type="checkbox" name="Display" id="Display" class="ann-display" />
      <label for="Display">Check to show this announcement</label><br />

      <button @click="addNewAnnouncement(newAnn)" v-if="!params.id" class="ann-button">
        Submit
      </button>

      <button @click="editAnnouncement(newAnn)" v-if="params.id" class="ann-button" :disabled="edited <= 0">
        Edit
      </button>

      <button @click="$router.push('/admin/announcement')" class="ann-button my-2">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
select,
textarea,
input {
  border: 1px solid grey;
  margin: 0.5%;
  border-radius: 5px;
}

button {
  border: 2px solid grey;
  background-color: grey;
  padding: 8px;
  margin: 2px;
  margin-right: 5px;
  border-radius: 5px;
}

.middle {
  margin: 1%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 1%;
  border: 1px solid black;
}
</style>
