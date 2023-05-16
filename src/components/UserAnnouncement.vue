<script setup>
import { ref, onBeforeMount,computed } from "vue";
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js";
import { getActive,getClose } from "../composable/getUserAnnouncement";
import {getAnnouncement} from "../composable/getAnnouncement.js";
import { useRouter } from "vue-router";
import { usePageStore } from '../stores/page.js'
import { useModeStore } from '../stores/mode.js'
const router = useRouter()
const time = Intl.DateTimeFormat().resolvedOptions().timeZone;
const pageStore = usePageStore()
const Page = ref(pageStore.page)
const PageClose = ref(pageStore.closePage)
const announcements = ref([]);
const announcementActivepage = ref([]);
const announcementClosepage = ref([]);
const disablePrev = ref(true)
const disableNext = ref(false)
const modeStore = useModeStore()
const activebutton = ref(modeStore.ActiveCloseBut)
const PageNum = ref([])
const ClosePageNum = ref([])


const nextPage = async() => {
  Page.value += 1 
  Page.value === announcementActivepage.value.totalPages ? disableNext.value = true :Page.value
  announcementActivepage.value = await getActive(Page.value)
  if(Page.value === announcementActivepage.value.totalPages-1){disableNext.value = true}
  else(disableNext.value = false)
  if(Page.value === 0){disablePrev.value = true}
  else(disablePrev.value = false)  
  console.log(Page.value)
}
const nextClosePage = async() => {
  PageClose.value += 1 
  PageClose.value === announcementClosepage.value.totalPages ? disableNext.value = true :PageClose.value
  announcementClosepage.value = await getClose(PageClose.value)
  if(PageClose.value === announcementClosepage.value.totalPages-1){disableNext.value = true}
  else(disableNext.value = false)
  if(PageClose.value === 0){disablePrev.value = true}
  else(disablePrev.value = false)  
  console.log(PageClose.value)
}
const prevPage = async() => {
  Page.value -= 1 
  announcementActivepage.value = await getActive(Page.value)
  if(Page.value === 0){disablePrev.value = true}
  else(disablePrev.value = false)

  if(Page.value === announcementActivepage.value.totalPages -1){disableNext.value = true}
  else(disableNext.value = false)
  console.log(Page.value)
}
const prevClosePage = async() => {
  PageClose.value -= 1 
  announcementClosepage.value = await getClose(PageClose.value)
  if(PageClose.value === 0){disablePrev.value = true}
  else(disablePrev.value = false)

  if(PageClose.value === announcementActivepage.value.totalPages -1){disableNext.value = true}
  else(disableNext.value = false)
  console.log(PageClose.value)
}
const changePage =async (page) =>{
  Page.value = page -1
  announcementActivepage.value = await getActive(Page.value)
  pageStore.setPage(Page.value)
  if(Page.value === 0){disablePrev.value = true}
  else(disablePrev.value = false)

  if(Page.value === announcementActivepage.value.totalPages -1){disableNext.value = true}
  else(disableNext.value = false)
}

const changeClosePage =async (page) =>{
  PageClose.value = page - 1
  announcementClosepage.value = await getClose(PageClose.value)

    pageStore.setClosePage(PageClose.value)
  if(PageClose.value === 0){disablePrev.value = true}
  else(disablePrev.value = false)

  if(PageClose.value === announcementClosepage.value.totalPages -1){disableNext.value = true}
  else(disableNext.value = false)
}

const paginationButton = computed(() => {
  const totalPages = announcementActivepage.value.totalPages
  const currentPage = Page.value + 1;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 10) {
    if (currentPage <= 10) {
      endPage = 10;
    } else if (currentPage >= totalPages) {
      startPage = totalPages - 9;
    } else {
      startPage = currentPage - 9;
      endPage = currentPage;
    }
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
});

const paginationCloseButton = computed(() => {
  const totalPages = announcementClosepage.value.totalPages
  const currentPage = PageClose.value + 1;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 10) {
    if (currentPage <= 10) {
      endPage = 10;
    } else if (currentPage >= totalPages) {
      startPage = totalPages - 9;
    } else {
      startPage = currentPage - 9;
      endPage = currentPage;
    }
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
});



const activetext = (acc) => {
  modeStore.setMode(acc)
    if (acc === false) {
        return 'Close Announcement'
    } else {
     return 'Active Announcements'
    }
}
const AnnDetail = (viewId) => {
  router.push({ name: 'UserViewAnnouncement', params: { id: viewId } })
}

onBeforeMount(async () => {
    announcements.value = await getAnnouncement();
    announcementActivepage.value = await getActive(Page.value)
    console.log(Page.value);
    console.log(announcementActivepage.value);
    PageNum.value = Array.from({ length: announcementActivepage.value.totalPages }, (_, i) => i + 1)
    announcementClosepage.value = await getClose(PageClose.value)
    ClosePageNum.value = Array.from({ length: announcementClosepage.value.totalPages }, (_, i) => i + 1)
});
</script>
 
<template>
    <div class="w-full flex flex-col">
        <h1 class="text-4xl font-bold flex justify-center font-style: sans-serif">
            SIT Announcement System (SAS)
        </h1>
        <div>
            <h1 class="text-xl float-left"><b>Date/Time Shown in Timezone:</b> {{ time }}</h1>
            <button @click="activebutton = !activebutton; Page = 0; PageClose = 0" class="ann-button float-right p-2 mb-2 mr-1">
                {{ activetext(activebutton) }}
            </button>
        </div>        

        <!-- <div class="ann-button" id="addDiv">
        </div> -->

        <div v-if="announcements.length === 0">No Announcement</div>

        <div v-else class="relative overflow-x-auto">
            <table v-if="activebutton === true" class="w-full text-center text-gray-500 dark:text-gray-400">
                <tr class="tableHead text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th class="trHead">No.</th>
                    <th class="trHead">Title</th>
                    <th class="trHead">Close Date</th>
                    <th class="trHead">Category</th>
                </tr>
                <tr v-for="(ann, index) in announcementClosepage.content" :key="index" class="ann-item bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>{{ index+1 + (announcementClosepage.size*announcementClosepage.page)  }}</td>
                    <td class="ann-title" id="titleClick" @click="AnnDetail(ann.id)">
                        <p>{{ ann.announcementTitle }}</p>
                    </td>
                    <td class="ann-close-date">{{ changeDateTimeFormat(ann.closeDate) }}</td>
                    <td class="ann-category">{{ ann.announcementCategory }}</td>
                </tr>
            </table>
            <table v-if="activebutton === false" class="w-full text-center text-gray-500 dark:text-gray-400">
                <tr class="tableHead text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th class="trHead">No.</th>
                    <th class="trHead">Title</th>
                    <th class="trHead">Category</th>
                </tr>
                <tr v-for="(ann, index) in announcementActivepage.content" :key="index" class="ann-item bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-10">
                    <td>{{ index+1 + (announcementActivepage.size*announcementActivepage.page) }}</td>
                    <td class="ann-title" id="titleClick" @click="AnnDetail(ann.id)">
                        <p>{{ ann.announcementTitle }}</p>
                    </td>
                    <td class="ann-category">{{ ann.announcementCategory }}</td>
                </tr>
            </table>


    <div class="butAcDiv ml-4 mt-4" v-if="PageNum.length >= 2 && activebutton === false ">
        <button class="ann-page-prev p-2" @click="prevPage" :disabled="disablePrev">Prev</button>
        <!-- <button v-for="(ann, index) in PageNum" class="butPage p-2" :key="index" :id="getClass(index)" @click="changePage(index)">{{ index +1 }}</button> -->
        <button v-for="(page,index) in paginationButton" :key="index" :style="[page === Page + 1 ? 'background-color: lightgray':'' ]" :class="['ann-page-'+ index]" @click="changePage(page)" class="butPage">{{ page }}</button>
        <!-- <button v-for="page in visibleButton" :key="page" :class="getClass(page)" @click="changePage(page)"
          class="butPage">{{ page }}</button> -->
        <button class="ann-page-next p-2" @click="nextPage" :disabled="disableNext">Next</button>
      </div>

      <div class="butCloseDiv ml-4 mt-4" v-if="ClosePageNum.length >= 2 && activebutton === true">
        <button class="ann-page-prev p-2" @click="prevClosePage" :disabled="disablePrev">Prev</button>
        <!-- <button v-for="(ann, index) in ClosePageNum" class="butPage p-2" :key="index" :id="getClass(index)" @click="changePage(index)">{{ index +1 }}</button> -->
        <button v-for="(page,index) in paginationCloseButton" :key="index" :style="[page === PageClose + 1 ? 'background-color: lightgray':'' ]" :class="['ann-page-'+ index]" @click="changeClosePage(page)" class="butPage">{{ page }}</button>
        <!-- <button v-for="page in visibleButton" :key="page" :class="getClass(page)" @click="changePage(page)"
          class="butPage">{{ page }}</button> -->
        <button class="ann-page-next p-2" @click="nextClosePage" :disabled="disableNext">Next</button>
      </div>


        </div>
    </div>
</template>
 
<style scoped>
.ann-page-prev,.ann-page-next,.ann-button{
  background-color: gray;
  border: 0px solid;
  border-radius: 5px;
  margin-left: 100 px;
}
.butPage{
  margin: 5px;
  border: 0.5px solid black;
  
}

td{
  padding: 20px;
  font-size: 18px;
}
</style>