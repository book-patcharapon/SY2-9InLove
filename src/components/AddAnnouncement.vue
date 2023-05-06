<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { createAnnouncement } from "../composable/createAnnouncement.js";
// defineEmits(['add'])

const router = useRouter();
const newAnn = ref({});
const annTitle = ref();
const annDescription = ref();
const annPublishDate = ref();
const annPublishTime = ref();
const annCloseDate = ref();
const annCloseTime = ref();
const annDisplay = ref();
const catId = ref();

// const newTitle = ref('')
// const newDesc = ref('')
// const pubDate = ref('')
// const pubTime = ref('')
// const publishDate = pubDate.value+pubTime.value+":00Z"
// const closeDate = ref('')
// const closeTime = ref('')
// const closeDatetime = closeDate.value+closeTime.value+":00Z"
// const newDisplay = ref()
// const newCateID = ref()

// const changeDateTimeToUTC = (date, time) => {
//     if (date && time) {
//         const newFormat = new Date(date.value + " " + time.value)
//         return newFormat
//     }
// }
const changeDateTimeToUTC = (date, time) => {
  console.log(date.value);
  console.log(time);
  if (date && time) {
    const newFormat = new Date(`${date.value}T${time.value}:00`);
    console.log(newFormat);
    return newFormat.toISOString();
  } else {
    return null;
  }
};
onMounted(async () => {
  newAnn.value = {
    announcementTitle: "",
    announcementDescription: "",
    publishDate: null,
    closeDate: null,
    announcementDisplay: "N",
    categoryID: 1,
  };
});

const addNewAnnouncement = (newAnnouncement) => {
  createAnnouncement(newAnnouncement); //add backend
};

const submit = () => {
  newAnn.value.announcementTitle = annTitle.value === "" ? null : annTitle.value;
  newAnn.value.announcementDescription = annDescription.value === "" ? null : annDescription.value;
  newAnn.value.publishDate = changeDateTimeToUTC(annPublishDate, annPublishTime);
  newAnn.value.closeDate = changeDateTimeToUTC(annCloseDate, annCloseTime);
  newAnn.value.announcementDisplay = annDisplay.value ? "Y" : "N";
  newAnn.value.categoryID = catId.value === undefined ? null : catId.value;
  console.log(newAnn);
  addNewAnnouncement(newAnn.value);
};
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl font-bold flex justify-center">Announcement Detail:</h1>
    <div class="middle">
      <div class="ann-title">
        <p>Title</p>
        <input
          type="text"
          v-model="annTitle"
          class="ann-title w-full"
          placeholder="Enter a title"
        /><br />
      </div>

      <p>Category</p>
      <select v-model="catId" class="ann-category">
        <option id="1" value="1">ทั่วไป</option>
        <option id="2" value="2">ทุนการศึกษา</option>
        <option id="3" value="3">หางาน</option>
        <option id="4" value="4">ฝึกงาน</option></select
      ><br />

      <p>Description</p>
      <textarea
        v-model="annDescription"
        class="ann-description w-full h-36"
        name="description"
        placeholder="Enter description"
      ></textarea>

      <p>Publish Date</p>
      <input v-model="annPublishDate" type="date" class="ann-publish-date" />
      <input
        v-model="annPublishTime"
        type="time"
        class="ann-publish-time"
      /><br />

      <p>Close Date</p>
      <input v-model="annCloseDate" type="date" class="ann-close-date" />
      <input v-model="annCloseTime" type="time" class="ann-close-time" /><br />

      <p>Display</p>
      <input
        v-model="annDisplay"
        type="checkbox"
        name="Display"
        id="Display"
        class="ann-display"
      />
      <label>Check to show this announcement</label><br />

      <button @click="submit" class="ann-button">Submit</button>

      <button @click="$router.go(-1)" class="ann-button my-2">cancel</button>
    </div>
  </div>
</template>

<style scoped>
select,
textarea,
input {
  border: 1px solid grey;
  margin: 0.5%;
  /* padding: %; */
  border-radius: 5px;
}

button {
  border: 0.5px solid grey;
  padding: 1.5px;
  margin: 2px;
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
