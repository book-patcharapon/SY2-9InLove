<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { changeDateTimeFormat } from '../composable/changeDateTimeFormat.js'
import { getInformation} from '../composable/getAnnouncementbyId.js'

const haveInfo = ref()
const announcementDetail = ref([])
const { params } = useRoute()

onBeforeMount(async () => {
    announcementDetail.value = await getInformation(params.id)
    if (announcementDetail) {
        haveInfo.value = true
    }
})
</script>
 
<template>
    <div class="w-full centerr">
        <div v-if="haveInfo" class=" p-4">
            <h1 class="text-4xl p-4">Announcement Detail:</h1>
        <div class="border-4 p-8">
            <!-- <table class="w-full text-medium text-left">
                <tbody class="bg-white border-b text-purple-200 dark:bg-gray-800 dark:border-gray-700">
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                        <td>
                            Title:
                        </td>

                    </tr>
                </tbody>
            </table> -->
            <p><b>Title:</b> <span class="ann-title">{{ announcementDetail.announcementTitle }}</span></p>
            <p><b>Category:</b> <span class="ann-category">{{ announcementDetail.announcementCategory }}</span></p>
            <p><b>Description:</b> <span class="ann-description">{{ announcementDetail.announcementDescription }}</span></p>
            <p><b>PublishDate:</b> <span class="ann-publish-date">{{ changeDateTimeFormat(announcementDetail.publishDate) }}</span></p>
            <p><b>CloseDate:</b> <span class="ann-close-date">{{ changeDateTimeFormat(announcementDetail.closeDate) }}</span></p>
            <p><b>Display:</b> <span class="ann-display">{{ announcementDetail.announcementDisplay }}</span></p>
        </div>
        <RouterLink :to="{ name: 'Announcement' }" class="ann-button">
                <button  class="my-2">
                    Back
                </button>
            </RouterLink>
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
    color: black;
    font-weight: bold;
    padding: 5px;
}

.centerr {
    display : flex ;
    justify-content: center;
}

</style>
