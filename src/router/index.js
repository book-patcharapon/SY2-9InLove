import { createRouter, createWebHistory } from "vue-router"
import Announcement from "../components/Announcement.vue"
import AnnouncementView from "../components/AnnouncementView.vue"
import AddEditAnnouncement  from "../components/AddEditAnnouncement.vue"
import UserAnnouncement from "../components/UserAnnouncement.vue"
import UserViewAnnouncement from "../components/UserViewAnnouncement.vue"
import User from "../components/User.vue"
import AddEditUser from "../components/AddEditUser.vue"
import MatchPassword from "../components/MatchPassword.vue"
import SASLogin from "../components/SASLogin.vue"
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
    },
    {
      path: "/announcement",
      name: "UserAnnouncement",
      component: UserAnnouncement,
    },
    {
      path: '/announcement/:id',
      name: 'UserViewAnnouncement',
      component: UserViewAnnouncement,
    },
    {
      path: '/admin/user',
      name: 'User',
      component: User,
    },
    {
      path: '/admin/user/add',
      name: 'AddUser',
      component: AddEditUser,
    },
    {
      path: '/admin/user/:id/edit',
      name: 'EditUser',
      component: AddEditUser,
    },
    {
      path: '/admin/user/match',
      name: 'MatchPassword',
      component: MatchPassword,
    },
    {
      path: '/login',
      name: 'SASLogin',
      component: SASLogin,
    }
  ],
})

export default router
