import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL;

const updateAnnouncement = async (id, announcement) => {
  try {
    const res = await fetch(`${API_HOST}/announcements/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(announcement),
    });
    if (res.status === 200) {
      const updatedAnnouncement = await res.json();
      router.push("/admin/announcement");
      return updatedAnnouncement
    } else if (res.status === 404) {
      const updatedAnnouncement = await res.json();
      alert('The request page is not available')
      router.push("/admin/announcement");
      return updatedAnnouncement
    } else {
      throw new Error("Can not edit");
    }
  } catch (error) {
    console.error(error);
  }
};

export { updateAnnouncement }
