import router from "../router";
// import { reqAccessToken } from './doToken.js'
import { useTokenStore } from '../stores/token.js'

const API_HOST = import.meta.env.VITE_BASE_URL ;
// const useTokenStore = useModeStore()


const getUsers = async () => {
  try {
    const tokenStore = useTokenStore()
    const accessToken = tokenStore.accessToken
    const response = await fetch(`${API_HOST}/users`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.ok) {
      const alluser = await response.json();
      return alluser;
    } else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

const reqAccessToken = async() => {
  try {
    const tokenStore = useTokenStore()
    const refreshToken = tokenStore.refreshToken
    const response = await fetch(`${API_HOST}/token`, {
      method: "GET",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (response.ok) {
      const res = await response.json();
      tokenStore.setAccessToken(res.token)
      return 'Applied new token'
    } else if (response.status === 401) {
      router.push("/login")
      return 'refreshToken exp'
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

const createUser = async (user) => {
  try {
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const response = await fetch(`${API_HOST}/users`, {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      router.push("/admin/user");
    } else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
    } else {
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
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const response = await fetch(`${API_HOST}/users/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json", Authorization: `Bearer ${accessToken}` },
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
    }else if (response.status === 401) {
      const reqAccess = await reqAccessToken()
      return reqAccess
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
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const response = await fetch(`${API_HOST}/users/${id}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else if (response.status === 400 || response.status === 404) {
      const user = await response.json();
      alert(`The request page is not available`);
      router.push("/admin/user");
      return user;
    } else if (res.status === 401){
      const checkToken = await reqAccessToken()
      return checkToken
    } else {
      throw new Error(`No user`);
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

const checkPassword = async (user) => {
  try {
    const tokenStore = useTokenStore()
const accessToken = tokenStore.accessToken
    const response = await fetch(`${API_HOST}/users/match`, {
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
  reqAccessToken,
};
