<script setup>
import { ref, onBeforeMount } from "vue"
import { getAnnouncement } from "../composable/getAnnouncement.js"
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js"

const announcements = ref([])
const time = Intl.DateTimeFormat().resolvedOptions().timeZone


onBeforeMount(async () => {
    announcements.value = await getAnnouncement()
    if(!announcements.value){
        announcements.value =[]
    }

})
</script>
 
<template>
    <div class="w-full">
        <h1 class="text-4xl font-bold flex justify-center">SIT Announcement System (SAS)</h1>
        <p class="text-xl"><b>Date/Time Shown in Timezone:</b> {{ time }}</p>
        <div v-if="announcements.length === 0">No Announcement</div>
        <div v-else class="relative overflow-x-auto">
            <table class="w-full text-center text-gray-500 dark:text-gray-400">
                <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Publish Date</th>
                        <th>Close date</th>
                        <th>Display</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="ann-item  bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(ann, index) in announcements" :key="index">
                        <th>{{ index+1 }}</th>
                        <td class="ann-title">{{ ann.announcementTitle }}</td>
                        <td class="ann-category">{{ ann.announcementCategory }}</td>
                        <td class="ann-publish-date">{{ changeDateTimeFormat(ann.publishDate) }}</td>
                        <td class="ann-close-date">{{ changeDateTimeFormat(ann.closeDate) }}</td>
                        <td class="ann-display">{{ ann.announcementDisplay }}</td>
                        <td>
                            <RouterLink :to="{ name: 'AnnouncementView', params: { id: ann.id } }" class="ann-button">
                                <button>
                                    view
                                </button>
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- <div>
            <AnnouncementView />
        </div> -->
    </div>
</template>
 
<style scoped>
button {
    border: 2px solid black;
    background-color: lightgrey;
    color: black;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
}
th {
    padding: 0.5em;
}

td {
    padding: 1em 0.5em;
}
</style>