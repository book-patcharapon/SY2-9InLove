import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL;

const createAnnouncement = async (newAnnouncement) => {
  console.log(newAnnouncement);
  try {
    // checkUpdateAccount(newAnnouncement);
    const res = await fetch('http://localhost:8080/api/announcements', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    }); //Add account at backend
    // method post. if it success, it will return status 201 / other methods return status 200
    if (res.status === 201) {
      const addedAccount = await res.json(); //keep info that added from backend
      account.value.push(addedAccount); //add account at frontend
      router.push("/admin/announcement");
    } else {
      throw new Error("Can not add");
    }
  } catch (error) {
    console.log(`ERROR: can't read data, ${error}`);
  }
};

const deleteAnn = async (annID) => {
  try {
      const res = await fetch(`http://localhost:8080/api/announcements/${annID}`, { method: 'DELETE' }) //Delete backend
      if (res.ok) {
        announcements.value = announcements.value.filter((ann) => ann.id !== annID) //Delete frontend
          // alert(`Delete success`)
      } else {
          throw new Error(`Cannot delete`)
      }
  } catch (err) {
      alert(`Error: ${err}`)
  }
}
export { createAnnouncement, deleteAnn };
