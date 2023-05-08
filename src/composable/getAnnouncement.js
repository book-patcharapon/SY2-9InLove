import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL+"/api/announcements"

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

const getInformation = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`);
    if (res.ok) {
      const announcement = await res.json();
      return announcement;
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json();
      alert(`The request page is not available`);
      router.push("/admin/announcement");
      return announcement
    } else {
      throw new Error(`No Announcement`);
    }
  } catch (error) {
    console.log(`ERROR: can't read data, ${error}`);
  }
};

const getInformationForUpdate = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/update/${id}`);
    if (res.ok) {
      const announcement = await res.json();
      return announcement;
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json();
      alert(`The request page is not available`);
      router.push("/admin/announcement");
      return announcement;
    } else {
      throw new Error(`No Announcement`);
    }
  } catch (error) {
    console.log(`ERROR: can't read data, ${error}`);
  }
};

export { getAnnouncement, getInformation, getInformationForUpdate }