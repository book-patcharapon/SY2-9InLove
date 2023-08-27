import router from "../router";

const API_HOST = import.meta.env.VITE_BASE_URL

const getPage = async (page) => {
  try {
    const res = await fetch(`${API_HOST}/announcements/pages?page=${page}`);
    if (res.ok) {
      const ann = await res.json();
      return ann;
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

const annUserId = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/announcements/${id}`);
    if (res.ok) {
      const annDetail = await res.json();
      return annDetail;
    } else if (res.status === 400 || res.status === 404) {
      const announcement = await res.json();
      alert(`The request page is not available`);
      router.push("/announcement");
      return announcement;
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

const getActive = async (page, categoryId) => {
  try {
    const res = await fetch(`${API_HOST}/announcements/pages?page=${page}&mode=active&category=${categoryId}`);
    if (res.ok) {
      const ann = await res.json();
      return ann;
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

const getClose = async (page, categoryId) => {
  try {
    const res = await fetch(`${API_HOST}/announcements/pages?page=${page}&mode=close&category=${categoryId}`)
    if (res.ok) {
      const ann = await res.json();
      return ann;
    }
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

export { getPage, annUserId, getActive, getClose }
