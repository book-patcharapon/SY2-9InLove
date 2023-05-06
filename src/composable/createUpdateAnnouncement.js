import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL;

// method post. if it success, it will return status 201 / other methods return status 200
const createAnnouncement = async (newAnnouncement) => {
  try {
    checkUpdateAccount(newAnnouncement);
    // Add backend
    const res = await fetch(`${API_HOST}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    });
    if (res.status === 201) {
      const addedAccount = await res.json();
      router.push("/admin/announcement");
    } else {
      throw new Error("Can not add");
    }
  } catch (error) {
    console.log(`ERROR: can't read data, ${error}`);
  }
};

const updateAnnouncement = async (id, announcement) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(announcement),
    });
    if (res.status === 200) {
      const updatedAnnouncement = await res.json();
      // update frontend
      announcementDetail.value.map((ann) => {
        if (ann.id === updatedAnnouncement.id) {
          ann.announcementTitle = updatedAnnouncement.announcementTitle;
          ann.announcementCategory = updatedAnnouncement.announcementCategory;
          ann.announcementDescription = updatedAnnouncement.announcementDescription;
          ann.publishDate = updatedAnnouncement.publishDate;
          ann.closeDate = updatedAnnouncement.closeDate;
          ann.announcementDisplay = updatedAnnouncement.announcementDisplay;
        }
        return ann;
      });
      router.push("/admin/announcement");
      // editAccount.value = undefined; //clear the text box when u want edit again
    } else {
      throw new Error("Can not edit");
    }
  } catch (error) {
    console.log(error);
  }
};

export { createAnnouncement, updateAnnouncement };
