import { ref } from "vue"
const API_HOST = import.meta.env.VITE_BASE_URL
const allannouncement = ref()

const getAnnouncement = async () => {
  try {
    const res = await fetch(`${API_HOST}`)
    if (res.ok) {
      allannouncement.value = await res.json()
      return allannouncement.value
    } else {
      throw new Error(`No Announcement`)
    }
  } catch (error) {
    console.log(`ERROR: can't read data, ${error}`)
  }
}

// const getInformation= (id) => {
//   return  fetch(`http://localhost:5000/Announcement/${id}`)
//       .then(resp => resp.json())
//       .catch(error => `ERROR cannot read data: ${error}`);
//}

export { getAnnouncement, allannouncement }
