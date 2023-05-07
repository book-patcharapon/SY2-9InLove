import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL;

const updateAnnouncement = async (id, announcement) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`, {
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
    }else {
      throw new Error("Can not edit");
    }
  } catch (error) {
    console.log(error);
  }
};

export { updateAnnouncement }

// update frontend
// announcementDetail.value.map((ann) => {
//   if (ann.id === updatedAnnouncement.id) {
//     ann.announcementTitle = updatedAnnouncement.announcementTitle;
//     ann.announcementCategory = updatedAnnouncement.announcementCategory;
//     ann.announcementDescription = updatedAnnouncement.announcementDescription;
//     ann.publishDate = updatedAnnouncement.publishDate;
//     ann.closeDate = updatedAnnouncement.closeDate;
//     ann.announcementDisplay = updatedAnnouncement.announcementDisplay;
//   }
//   return ann;
// });
