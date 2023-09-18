import router from "../router";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL + `/users`;

const getUsers = async () => {
  try {
    const response = await fetch(`${VITE_BASE_URL}`);
    if (response.ok) {
      const alluser = await response.json();
      return alluser;
    } else {
      throw new Error(`Not found user`);
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

const createUser = async (user) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status === 200) {
       //keep info that added from backend
      router.push("/admin/user");
    //   return addedUser;
    }
    else {
        const addedUser = await response.json();
        throw addedUser.detail
    }
  } catch (error) {
    throw error;
    // console.log(`ERROR: ${error}`)
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status === 200) {
      const updatedUser = await response.json();
      router.push("/admin/user");
      return updatedUser;
    } else if (response.status === 404) {
      const updatedUser = await response.json();
      alert("The request page is not available");
      router.push("/admin/user");
      return updatedUser;
    } else {
        const addedUser = await response.json();
        throw addedUser.detail
    }
  } catch (error) {
    throw error;
  }
};

const getUserDetailForUpdate = async (id) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/${id}`);
    if (response.ok) {
      const user = await response.json();
      return user;
    } else if (response.status === 400 || response.status === 404) {
      const user = await response.json();
      alert(`The request page is not available`);
      router.push("/admin/user");
      return user;
    } else {
      throw new Error(`No user`);
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

const checkPassword = async (user) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/match`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    return response.status;
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

export {
  getUsers,
  createUser,
  updateUser,
  getUserDetailForUpdate,
  checkPassword,
};
