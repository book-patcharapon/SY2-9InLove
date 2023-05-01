import { ref } from "vue"
import router from "../router"
const API_HOST = import.meta.env.VITE_BASE_URL
const announcement = ref([])

const getInformation = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`)
    if (res.ok) {
      announcement.value = await res.json()
      return announcement.value
    } else {
      alert(`The request page is not available`)
      router.push("/admin/announcement")
      announcement.value = await res.json()
      return announcement.value

      
    }
  } catch (error) {
    console.log(`ERROR: can't read data, ${error}`)
  }
};

export { getInformation, announcement }
