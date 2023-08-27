<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import Nav from '@/components/Nav.vue';
</script>
 
<template>

<div class="w-full flex justify-center">
    <Nav>

</Nav>
        <div v-if="haveInfo" class="flex flex-col p-4 w-3/6">
            <h1 class="text-4xl p-4 font-bold">Announcement Detail:</h1>
            <div class="content text-xl">
                <p class="ann-title"><b>Title:</b> {{ announcementDetail.announcementTitle }}</p>
                <p class="ann-category"><b>Category:</b> {{ announcementDetail.announcementCategory }}</p>
                <p class="ann-description"><b>Description:</b> {{ announcementDetail.announcementDescription }}</p>
                <p class="ann-publish-date"><b>PublishDate:</b> {{ changeDateTimeFormat(announcementDetail.publishDate) }}</p>
                <p class="ann-close-date"><b>CloseDate:</b> {{ changeDateTimeFormat(announcementDetail.closeDate) }}</p>
                <p class="ann-display"><b>Display:</b> {{ announcementDetail.announcementDisplay }}</p>
            </div>
            <div class="flex my-2">
                <RouterLink :to="{ name: 'Announcement' }" class="ann-button">
                    <button>Back</button>
                </RouterLink>

                <RouterLink :to="{ name: 'UpdateAnnouncement', params: { id: params.id } }" class="ann-button">
                    <button>Edit</button>
                </RouterLink>
            </div>
        </div>

        <div v-else>
            <h1>The request page is not available</h1>
        </div>
    </div>
</template>
 
<style scoped>

</style>