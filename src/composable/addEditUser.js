import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL;

const createUser = async (User) => {
    try {
      const res = await fetch(`${API_HOST}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(User),
      })
      if (res.status === 200) {
        const addedUser = await res.json() //keep info that added from backend
        router.push("/admin/user")
        return addedUser
      } else if (res.status === 500) {
        alert(`There is an error`)
        router.push("/admin/user")
      }
       else {
        throw new Error('Cannot add')
      }
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  };

const updateUser = async (id, User) => {
  try {
    const res = await fetch(`${API_HOST}/users/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(User),
    });
    if (res.status === 200) {
      const updatedUser = await res.json();
      router.push("/admin/user");
      return updatedUser
    } else if (res.status === 404) {
      const updatedUser = await res.json();
      alert('The request page is not available')
      router.push("/admin/user");
      return updatedUser
    } else {
      throw new Error("Can not edit");
    }
  } catch (error) {
    console.error(error);
  }
};


export { createUser,updateUser }