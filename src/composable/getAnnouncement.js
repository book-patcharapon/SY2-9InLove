import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL

const getAnnouncement = async () => {
  try {
    const res = await fetch(`${API_HOST}/announcements`)
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
    const res = await fetch(`${API_HOST}/announcements/${id}`);
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
    console.error(`ERROR: ${error}`);
  }
};

const getInformationForUpdate = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/announcements/update/${id}`);
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
    console.error(`ERROR: ${error}`);
  }
};

export { getAnnouncement, getInformation, getInformationForUpdate }