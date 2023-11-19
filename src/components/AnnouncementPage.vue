<script setup>
import { ref, onBeforeMount, computed, watchEffect} from "vue";
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js";
import { getAnnouncementActive, getAnnouncementClose } from "../composable/doAnnouncement.js";
import { useRouter } from "vue-router";
import { usePageStore } from '../stores/page.js'
import { useModeStore } from '../stores/mode.js'

const router = useRouter()
const time = Intl.DateTimeFormat().resolvedOptions().timeZone;
const pageStore = usePageStore()
const Page = ref(pageStore.page)
const PageClose = ref(pageStore.closePage)
const announcementActivepage = ref([]);
const announcementClosepage = ref([]);
const disablePrev = ref(true)
const disableNext = ref(false)
const modeStore = useModeStore()
const activebutton = ref(modeStore.ActiveCloseBut)
const PageNum = ref([])
const ClosePageNum = ref([])
const categoryId = ref(0)


const nextPage = async () => {
  Page.value += 1
  Page.value === announcementActivepage.value.totalPages ? disableNext.value = true : Page.value
  announcementActivepage.value = await getAnnouncementActive(Page.value, categoryId.value)
  if (announcementActivepage.value.last === true) { disableNext.value = true }
  else (disableNext.value = false)
  if (announcementActivepage.value.first === true) { disablePrev.value = true }
  else (disablePrev.value = false)
}

const nextClosePage = async () => {
  PageClose.value += 1
  PageClose.value === announcementClosepage.value.totalPages ? disableNext.value = true : PageClose.value
  announcementClosepage.value = await getAnnouncementClose(PageClose.value, categoryId.value)
  if (announcementActivepage.value.last === true) { disableNext.value = true }
  else (disableNext.value = false)
  if (announcementActivepage.value.first === true) { disablePrev.value = true }
  else (disablePrev.value = false)
}

const prevPage = async () => {
  if (Page.value > 0) {
    Page.value -= 1
  announcementActivepage.value = await getAnnouncementActive(Page.value, categoryId.value)
  }
  if (announcementActivepage.value.first === true) { disablePrev.value = true }
  else (disablePrev.value = false)
  if (announcementActivepage.value.last === true) { disableNext.value = true }
  else (disableNext.value = false)
}

const prevClosePage = async () => {
  PageClose.value -= 1
  announcementClosepage.value = await getAnnouncementClose(PageClose.value, categoryId.value)
  if (announcementClosepage.value.first === true) { disablePrev.value = true }
  else (disablePrev.value = false)
  if (announcementClosepage.value.last === true) { disableNext.value = true }
  else (disableNext.value = false)
}

const changePage = async (page) => {
  Page.value = page - 1
  announcementActivepage.value = await getAnnouncementActive(Page.value, categoryId.value)
  pageStore.setPage(Page.value)
  if (Page.value === 0) { disablePrev.value = true }
  else (disablePrev.value = false)
  if (Page.value === announcementActivepage.value.totalPages - 1) { disableNext.value = true }
  else (disableNext.value = false)
}

const changeClosePage = async (page) => {
  PageClose.value = page - 1
  announcementClosepage.value = await getAnnouncementClose(PageClose.value, categoryId.value)
  pageStore.setClosePage(PageClose.value)
  if (PageClose.value === 0) { disablePrev.value = true }
  else (disablePrev.value = false)
  if (PageClose.value === announcementClosepage.value.totalPages - 1) { disableNext.value = true }
  else (disableNext.value = false)
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
})

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
})

const activetext = (acc) => {
  modeStore.setMode(acc)
  if (acc === false) {
    return 'Close Announcement'
  } else {
    return 'Active Announcements'
  }
}

const AnnDetail = (viewId) => {
  router.push({ name: 'AnnouncementDetailPage', params: { id: viewId } })
}

onBeforeMount(async () => {
  announcementActivepage.value = await getAnnouncementActive(Page.value, categoryId.value)
  PageNum.value = Array.from({ length: announcementActivepage.value.totalPages }, (_, i) => i + 1)
  announcementClosepage.value = await getAnnouncementClose(PageClose.value, categoryId.value)
  ClosePageNum.value = Array.from({ length: announcementClosepage.value.totalPages }, (_, i) => i + 1)
  watchEffect(() => {
  if (announcementActivepage.value.first === true) {
    disablePrev.value = true
  }
})
})

const changeCategory = async () => {
  Page.value = 0
  PageClose.value = 0
  pageStore.setPage(Page.value)
  pageStore.setClosePage(PageClose.value)
  announcementActivepage.value = await getAnnouncementActive(Page.value, categoryId.value)
  PageNum.value = Array.from({ length: announcementActivepage.value.totalPages }, (_, i) => i + 1)
  announcementClosepage.value = await getAnnouncementClose(PageClose.value, categoryId.value)
  ClosePageNum.value = Array.from({ length: announcementClosepage.value.totalPages }, (_, i) => i + 1)
  if (Page.value === 0 ) { disablePrev.value = true }
  else (disablePrev.value = false)
  if (Page.value === announcementActivepage.value.totalPages - 1) { disableNext.value = true }
  else (disableNext.value = false)
}
</script>
 
<template>
  <div class="w-full flex flex-col">
    <h1 class="text-4xl font-bold flex justify-center font-style: sans-serif">
      SIT Announcement System (SAS)
    </h1>

    <div class="w-full flex justify-center">
      <div class="w-4/6 flex flex-col">
        <div class="mt-1">
          <h1 class="float-left"><b>Date/Time Shown in Timezone:</b> {{ time }}</h1>
          <select @change="changeCategory()" v-model="categoryId" class="ann-category-filter">
            <option id="0" :value=0>ทั้งหมด</option>
            <option id="1" :value=1>ทั่วไป</option>
            <option id="2" :value=2>ทุนการศึกษา</option>
            <option id="3" :value=3>หางาน</option>
            <option id="4" :value=4>ฝึกงาน</option>
          </select>
          <button @click="activebutton = !activebutton; Page = 0; PageClose = 0" class="ann-button float-right mb-2 mr-1">
            {{ activetext(activebutton) }}
          </button>
        </div>

        <table v-if="activebutton === true && announcementClosepage.totalElements != 0" class="w-full text-center text-gray-500 dark:text-gray-400">
          <tr class="tableHead text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th class="trHead">No.</th>
            <th class="trHead">Title</th>
            <th class="trHead">Close Date</th>
            <th class="trHead">Category</th>
          </tr>
          <tr v-for="(ann, index) in announcementClosepage.content" :key="index"
            class="ann-item bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>{{ index + 1 + (announcementClosepage.size * announcementClosepage.page) }}</td>
            <td class="ann-title" id="titleClick" @click="AnnDetail(ann.id)">
              <p>{{ ann.announcementTitle }}</p>
            </td>
            <td class="ann-close-date">{{ changeDateTimeFormat(ann.closeDate) }}</td>
            <td class="ann-category">{{ ann.announcementCategory }}</td>
          </tr>
        </table>
        <h1 v-if="activebutton === true && announcementClosepage.totalElements == 0" class="w-full flex justify-center">No Announcement</h1>

        <table v-if="activebutton === false && announcementActivepage.totalElements != 0" class="w-full text-center text-gray-500 dark:text-gray-400">
          <tr class="tableHead text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th class="trHead">No.</th>
            <th class="trHead">Title</th>
            <th class="trHead">Category</th>
          </tr>
          <tr v-for="(ann, index) in announcementActivepage.content" :key="index"
            class="ann-item bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-10">
            <td>{{ index + 1 + (announcementActivepage.size * announcementActivepage.page) }}</td>
            <td class="ann-title" id="titleClick" @click="AnnDetail(ann.id)">
              <p>{{ ann.announcementTitle }}</p>
            </td>
            <td class="ann-category">{{ ann.announcementCategory }}</td>
          </tr>
        </table>
        <h1 v-if="activebutton === false && announcementActivepage.totalElements == 0" class="w-full flex justify-center">No Announcement</h1>

        <div class="butAcDiv ml-4 mt-4" v-if="PageNum.length >= 2 && activebutton === false">
          <button class="ann-page-prev p-2" @click="prevPage" :disabled="disablePrev">Prev</button>
          <!-- <button v-for="(ann, index) in PageNum" class="butPage p-2" :key="index" :id="getClass(index)" @click="changePage(index)">{{ index +1 }}</button> -->
          <button v-for="(page, index) in paginationButton" :key="index"
            :style="[page === Page + 1 ? 'background-color: black; color: white;' : '']" :class="['ann-page-' + index]"
            @click="changePage(page)" class="butPage p-2 rounded-lg">
            {{ page }}
          </button>
          <!-- <button v-for="page in visibleButton" :key="page" :class="getClass(page)" @click="changePage(page)"
          class="butPage">{{ page }}</button> -->
          <button class="ann-page-next p-2" @click="nextPage" :disabled="disableNext">Next</button>
        </div>

        <div class="butCloseDiv ml-4 mt-4" v-if="ClosePageNum.length >= 2 && activebutton === true">
          <button class="ann-page-prev p-2" @click="prevClosePage" :disabled="disablePrev">Prev</button>
          <!-- <button v-for="(ann, index) in ClosePageNum" class="butPage p-2" :key="index" :id="getClass(index)" @click="changePage(index)">{{ index +1 }}</button> -->
          <button v-for="(page, index) in paginationCloseButton" :key="index"
            :style="[page === PageClose + 1 ? 'background-color: black; color: white;' : '']"
            :class="['ann-page-' + index]" @click="changeClosePage(page)" class="butPage">
            {{ page }}
          </button>
          <!-- <button v-for="page in visibleButton" :key="page" :class="getClass(page)" @click="changePage(page)"
          class="butPage">{{ page }}</button> -->
          <button class="ann-page-next p-2" @click="nextClosePage" :disabled="disableNext">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
.butPage,
.ann-page-prev,
.ann-page-next {
  border: 2px solid black;
  border-radius: 5px;
  font-weight: bold;
  margin-right: 5px;
  width: 80px;
}

.ann-page-prev,
.ann-page-next {
  background-color: grey;
}

.ann-button {
  border: 2px solid black;
  background-color: lightgrey;
  border-radius: 5px;
  font-weight: bold;
  padding: 5px;
}

button:enabled:hover {
  background-color: black;
  color: white;
  font-weight: bold;
}

td {
  padding: 20px;
  font-size: 18px;
}

select {
  border: 2px solid black;
  margin: 0.5%;
  border-radius: 5px;
}

h1 {
  font-size: 34px;
}

h3 {
  font-size: 24px;
}
</style>