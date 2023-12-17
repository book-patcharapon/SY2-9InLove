import {createRouter, createWebHistory} from "vue-router"
import Announcement from "../components/Announcement.vue"
import AnnouncementViewer from "@/components/AnnouncementViewer.vue";
import AnnouncementDetail from "../components/AnnouncementDetail.vue"
import AddEditAnnouncement from "../components/AddEditAnnouncement.vue"
import AnnouncementPage from "../components/AnnouncementPage.vue"
import AnnouncementDetailPage from "../components/AnnouncementDetailPage.vue"
import User from "../components/User.vue"
import AddEditUser from "../components/AddEditUser.vue"
import MatchPassword from "../components/MatchPassword.vue"
import SASLogin from "../components/SASLogin.vue"
// import AdminPage from "../components/AdminPage.vue"

// import { accessToken } from "../stores/useTokenStore";
import { jwtDecode } from "jwt-decode";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: SASLogin
        },
        {
            path: "/admin/announcement",
            name: "Announcement",
            component: Announcement,
        },
        {
            path: "/admin/announcementViewer",
            name: "AnnouncementViewer",
            component: AnnouncementViewer
        },
        {
            path: "/admin/announcement/:id",
            name: "AdminAnnouncementDetail",
            component: AnnouncementDetail,
        },
        {
            path: '/announcement/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail,
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
            name: "AnnouncementPage",
            component: AnnouncementPage,
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
        },
        {
            path: "/",
            children: [
              {
                path: "/admin/user",
                name:"User",
                component: User,
                beforeEnter: (to, form, next) => {
                    if (localStorage.getItem("accessToken")=='') {
                        alert("please login")
                        next('/login')
                    }
                    const decodeToken = jwtDecode(localStorage.getItem("accessToken"));
                    if(decodeToken.role === 'admin'){
                      next()
                    }else if(decodeToken.role === 'announcer'){
                      alert("You do not have permission to access this page.")
                      next('/announcement')
                    }else{
                      next('/announcement')
                    }
                  }
              },
              {
                path: "/admin/user/add",
                name:"AddUser",
                component: AddEditUser,
                beforeEnter: (to, form, next) => {
                    if (localStorage.getItem("accessToken")=='') {
                        alert("please login")
                        next('/login')
                    }
                    const decodeToken = jwtDecode(localStorage.getItem("accessToken"));
                    if(decodeToken.role === 'admin'){
                      next()
                    }else if(decodeToken.role === 'announcer'){
                      alert("You do not have permission to access this page.")
                      next('/announcement')
                    }else{
                      next('/announcement')
                    }
                  }
              },
              {
                path: "/admin/user/match",
                name:"MatchPassword",
                component: MatchPassword,
                beforeEnter: (to, form, next) => {
                    if (localStorage.getItem("accessToken")=='') {
                        alert("please login")
                        next('/login')
                    }
                    const decodeToken = jwtDecode(localStorage.getItem("accessToken"));
                    if(decodeToken.role === 'admin'){
                      next()
                    }else if(decodeToken.role === 'announcer'){
                      alert("You do not have permission to access this page.")
                      next('/announcement')
                    }else{
                      next('/announcement')
                    }
                  }
              },
              {
                path: "/admin/user/:id/edit",
                name:"EditUser",
                component: AddEditUser,
                beforeEnter: (to, form, next) => {
                    if (localStorage.getItem("accessToken")=='') {
                        alert("please login")
                        next('/login')
                    }
                    const decodeToken = jwtDecode(localStorage.getItem("accessToken"));
                    if(decodeToken.role === 'admin'){
                      next()
                    }else if(decodeToken.role === 'announcer'){
                      alert("You do not have permission to access this page.")
                      next('/announcement')
                    }else{
                      next('/announcement')
                    }
                  }
                }
            ]
        }
    ]
})

export default router
