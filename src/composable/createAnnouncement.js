import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL;

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
    } else {
      throw new Error("Can not add")
    }
  } catch (error) {
    alert(`ERROR: can't read data, ${error}`)
    console.log(`ERROR: can't read data, ${error}`)
  }
};

export { createAnnouncement };
