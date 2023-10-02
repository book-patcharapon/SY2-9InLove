import router from "../router";
import { useTokenStore } from "../stores/token";

const API_HOST = import.meta.env.VITE_BASE_URL + `/announcements`;
// const tokenStore = useTokenStore();

const reqAccessToken = async () => {
  try {
    const tokenStore = useTokenStore();
    const refreshToken = tokenStore.refreshToken;
    const response = await fetch(`${API_HOST}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (response.ok) {
      const response = await response.json();
      tokenStore.setAccessToken(response.token);
      return "Applied new token";
    } else if (response.status === 401) {
      return "refreshToken exp";
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
};

export { reqAccessToken };
