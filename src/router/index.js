import { createRouter, createWebHistory } from "vue-router"
import Announcement from "../components/Announcement.vue"
import AnnouncementView from "../components/AnnouncementView.vue"
import AddEditAnnouncement  from "../components/AddEditAnnouncement.vue"

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
      component: AddEditAnnouncement,
    },
    {
      path: "/admin/announcement/:id/edit",
      name: "UpdateAnnouncement",
      component: AddEditAnnouncement,
    }
  ],
})

export default router
