import { createRouter, createWebHistory } from "vue-router"
import Announcement from "../components/Announcement.vue"
import AnnouncementView from "../components/AnnouncementView.vue"
import  AddAnnouncement  from "../components/AddAnnouncement.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin/announcement",
      name: "Announcement",
      component: Announcement,
    },
    {
      path: "/admin/announcement/:id",
      name: "AnnouncementView",
      component: AnnouncementView,
    },
    {
      path: "/admin/announcement/add",
      name: "AddAnnouncement",
      component: AddAnnouncement,
    }
  ],
})

export default router
