<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount, watch } from "vue";
import { createAnnouncement, updateAnnouncement, getInformationForUpdate } from "../composable/doAnnouncement.js";
import router from "../router";
// import { updateAnnouncement } from "../composable/editAnnouncement.js";
// import { getInformationForUpdate } from "../composable/getAnnouncement.js";

const { params } = useRoute();
const newAnn = ref({});
const pubDate = ref();
const pubTime = ref();
const cloDate = ref();
const cloTime = ref();
const edited = ref(false);
const haveInfo = ref(false)

onBeforeMount(async () => {
  if (params.id) {
    // Edit mode
    const checkToken = await getInformationForUpdate(params.id);
    if (typeof checkToken === "object") {
      newAnn.value = checkToken
    } if (!newAnn.value) {
      newAnn.value = {};
    } else if (checkToken === 'Applied new token') {
      newAnn.value = await getInformationForUpdate(params.id);
    }
    if (newAnn.value) {
      haveInfo.value = true
    }
    if (newAnn.value.publishDate || newAnn.value.closeDate) {
      [pubDate.value, pubTime.value] = changeUTCtoLocalDatetime(newAnn.value.publishDate);
      [cloDate.value, cloTime.value] = changeUTCtoLocalDatetime(newAnn.value.closeDate);
    }
    if (newAnn.value.announcementDisplay === "Y") {
      newAnn.value.announcementDisplay = true;
    } else {
      newAnn.value.announcementDisplay = false;
    }
    watch(
      [newAnn, pubDate, pubTime, cloDate, cloTime],
      async () => {
        edited.value = true;
      },
      { deep: true }
    )
  } else {
    // Add mode
    haveInfo.value = true
    // Default value
    newAnn.value = {
      announcementTitle: "",
      announcementDescription: "",
      publishDate: null,
      closeDate: null,
      announcementDisplay: false,
      categoryId: 1,
    };
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
    const month = String(utcDate.getMonth() + 1).padStart(2, "0");
    const day = String(utcDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    // Time
    const time = utcDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return [date, time];
  } else {
    return [null, null];
  }
}

const addEditNewAnnouncement = (newAnn) => {
  if (newAnn.announcementTitle && newAnn.announcementDescription) {
    newAnn.publishDate = changeDateTimeToUTC(pubDate, pubTime);
    newAnn.closeDate = changeDateTimeToUTC(cloDate, cloTime);
    newAnn.announcementDisplay = newAnn.announcementDisplay ? "Y" : "N";
    if (params.id) {
      updateAnnouncement(params.id, newAnn) //update to backend
    } else {
      createAnnouncement(newAnn); //add to backend
    }
  } else {
    alert(`Please enter title and description`)
  }
}
</script>

<template>
  <div class="w-full">
    <div v-if="haveInfo">
      <h1 v-if="params.id" class="text-4xl font-bold flex justify-center">Edit Announcement:</h1>
      <h1 v-else class="text-4xl font-bold flex justify-center">Add Announcement:</h1>
      <div class="middle">
        <p class="font-bold text-2xl">TITLE</p>
        <input type="text" id="title" v-model="newAnn.announcementTitle" class="ann-title w-full"
          placeholder="Enter a title" :maxlength="200" /><br />

        <p>CATEGORY</p>
        <select v-model="newAnn.categoryId" class="ann-category">
          <option id="1" :value=1>ทั่วไป</option>
          <option id="2" :value=2>ทุนการศึกษา</option>
          <option id="3" :value=3>หางาน</option>
          <option id="4" :value=4>ฝึกงาน</option>
        </select><br />

        <p>DESCRIPTION</p>
        <textarea v-model="newAnn.announcementDescription" class="ann-description w-full h-36" name="description"
          :maxlength="10000" placeholder="Enter description"></textarea>

        <p>PUBLISH DATE</p>
        <input v-model="pubDate" type="date" class="ann-publish-date" />
        <input v-model="pubTime" type="time" class="ann-publish-time" /><br />

        <p>CLOSE DATE</p>
        <input v-model="cloDate" type="date" class="ann-close-date" />
        <input v-model="cloTime" type="time" class="ann-close-time" /><br />

        <p>DISPLAY</p>
        <input v-model="newAnn.announcementDisplay" type="checkbox" name="Display" id="Display" class="ann-display" />
        <label for="Display">Check to show this announcement</label><br />

        <button @click="addEditNewAnnouncement(newAnn)" v-if="!params.id" class="ann-button">
          SUBMIT
        </button>

        <button @click="addEditNewAnnouncement(newAnn)" v-if="params.id" class="ann-button" :disabled="!edited">
          EDIT
        </button>

        <button @click="$router.push('/admin/announcement')" class="ann-button">
          CANCEL
        </button>
      </div>
    </div>

    <div v-else>
      <h1>The request page is not available</h1>
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
  border: 2px solid black;
  background-color: lightgrey;
  font-weight: bold;
  padding: 8px;
  margin-top: 10px;
  margin-right: 5px;
  border-radius: 5px;
}

button:enabled:hover {
  background-color: black;
  color: white;
}

.middle {
  margin: 1% 20%;
  padding: 1%;
  border: 3px solid black;
  border-radius: 8px;
}
</style>
