import router from "../router";
import { reqAccessToken } from "../composable/doUser"
import { useTokenStore  } from "../stores/token.js"

const API_HOST = import.meta.env.VITE_BASE_URL + `/announcements`


const getAnnouncement = async () => {
  try {
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const allannouncement = await res.json()
      return allannouncement
    } else if (res.status === 401){
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
    else{
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getInformation = async (id) => {
  try {
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/${id}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const announcement = await res.json()
      return announcement
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json()
      alert(`The request page is not available`)
      router.push("/admin/announcement")
      return announcement
    } else if (res.status === 401){
      const reqAccess = await reqAccessToken()
      return reqAccess
    } else {
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getInformationForUpdate = async (id) => {
  try {
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/update/${id}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const announcement = await res.json()
      return announcement
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json()
      alert(`The request page is not available`)
      router.push("/admin/announcement")
      return announcement
    } else if (res.status === 401){
      const reqAccess = await reqAccessToken()
      return reqAccess
    } else {
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const createAnnouncement = async (newAnnouncement) => {
  try {
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}`, {
      method: "POST",
      headers: { "content-type": "application/json",Authorization: `Bearer ${accessToken}`},
      body: JSON.stringify(newAnnouncement),
    })
    if (res.status === 200) {
      const addedAccount = await res.json() //keep info that added from backend
      router.push("/admin/announcement")
      return addedAccount
    } else if (res.status === 500) {
      alert(`There is an error`)
      router.push("/admin/announcement")
    } else if (res.status === 401){
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
    else {
      throw new Error('Cannot add')
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const updateAnnouncement = async (id, announcement) => {
  try {
    const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json",Authorization: `Bearer ${accessToken }` },
      body: JSON.stringify(announcement),
    })
    if (res.status === 200) {
      const updatedAnnouncement = await res.json()
      router.push("/admin/announcement")
      return updatedAnnouncement
    } else if (res.status === 404) {
      const updatedAnnouncement = await res.json()
      alert('The request page is not available')
      router.push("/admin/announcement")
      return updatedAnnouncement
    } else if (res.status === 401){
      const reqAccess = await reqAccessToken()
      return reqAccess
    } else {
      throw new Error("Can not edit")
    }
  } catch (error) {
    console.error(error)
  }
}

const getPage = async (page) => {
  try {
    const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/pages?page=${page}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const ann = await res.json()
      return ann
    }else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const annUserId = async (id) => {
  try {
    const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/${id}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const annDetail = await res.json()
      return annDetail
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json()
      alert(`The request page is not available`)
      router.push("/announcement")
      return announcement
    }else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getAnnouncementActive = async (page, categoryId) => {
  try {
    const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/pages?page=${page}&mode=active&category=${categoryId}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const announcement = await res.json()
      return announcement
    }else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getAnnouncementClose = async (page, categoryId) => {
  try {
    const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
    const res = await fetch(`${API_HOST}/pages?page=${page}&mode=close&category=${categoryId}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (res.ok) {
      const announcement = await res.json()
      return announcement;
    }else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

export { getAnnouncement, 
  getInformation, 
  getInformationForUpdate, 
  createAnnouncement, 
  updateAnnouncement, 
  annUserId, 
  getPage, 
  getAnnouncementActive, 
  getAnnouncementClose }