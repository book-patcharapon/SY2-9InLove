const API_HOST = import.meta.env.VITE_BASE_URL

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
    console.log(`ERROR: can't read data, ${error}`)
  }
}

export { getAnnouncement }