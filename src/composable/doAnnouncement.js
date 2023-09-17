import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL + `/announcements`

const getAnnouncement = async () => {
  try {
    const res = await fetch(`${API_HOST}`)
    if (res.ok) {
      const allannouncement = await res.json()
      return allannouncement
    } else {
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getInformation = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`)
    if (res.ok) {
      const announcement = await res.json()
      return announcement
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json()
      alert(`The request page is not available`)
      router.push("/admin/announcement")
      return announcement
    } else {
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getInformationForUpdate = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/update/${id}`)
    if (res.ok) {
      const announcement = await res.json()
      return announcement
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json()
      alert(`The request page is not available`)
      router.push("/admin/announcement")
      return announcement
    } else {
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const createAnnouncement = async (newAnnouncement) => {
  try {
    const res = await fetch(`${API_HOST}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    })
    if (res.status === 200) {
      const addedAccount = await res.json() //keep info that added from backend
      router.push("/admin/announcement")
      return addedAccount
    } else if (res.status === 500) {
      alert(`There is an error`)
      router.push("/admin/announcement")
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
    const res = await fetch(`${API_HOST}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
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
    } else {
      throw new Error("Can not edit")
    }
  } catch (error) {
    console.error(error)
  }
}

const getPage = async (page) => {
  try {
    const res = await fetch(`${API_HOST}/pages?page=${page}`)
    if (res.ok) {
      const ann = await res.json()
      return ann
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const annUserId = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`)
    if (res.ok) {
      const annDetail = await res.json()
      return annDetail
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json()
      alert(`The request page is not available`)
      router.push("/announcement")
      return announcement
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getAnnouncementActive = async (page, categoryId) => {
  try {
    const res = await fetch(`${API_HOST}/pages?page=${page}&mode=active&category=${categoryId}`)
    if (res.ok) {
      const ann = await res.json()
      return ann
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

const getAnnouncementClose = async (page, categoryId) => {
  try {
    const res = await fetch(`${API_HOST}/pages?page=${page}&mode=close&category=${categoryId}`)
    if (res.ok) {
      const ann = await res.json()
      return ann;
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