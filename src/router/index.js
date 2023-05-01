import { createRouter, createWebHistory } from "vue-router"
import Announcement from "../components/Announcement.vue"
import AnnouncementView from "../components/AnnouncementView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/admin/announcement",
    },
    {
      path: "/admin/announcement",
      name: "Announcement",
      component: Announcement,
    },
    {
      path: "/admin/announcement/:id",
      name: "AnnouncementView",
      component: AnnouncementView,
    }
  ],
})

export default router
