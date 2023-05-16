import router from "../router";
const API_HOST = import.meta.env.VITE_BASE_URL
const getPage = async (page) => {
  try {
    const res = await fetch(`${API_HOST}/pages?page=${page}`);
    if (res.ok) {
      const ann = await res.json();
      return ann;
    }
  } catch (error) {
    console.log(`ERROR cannot read data: ${error}`);
  }
};

const annUserId = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/${id}`);
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
    console.log(`ERROR cannot read data: ${error}`);
  }
};

const getActive = async (page) => {
  try {
    const res = await fetch(`${API_HOST}/pages?page=${page}&mode=active`);
    if (res.ok) {
      const ann = await res.json();
      return ann;
    }
  } catch (error) {
    console.log(`ERROR cannot read data: ${error}`);
  }
};

const getClose = async (page) => {
  try {

    const res = await fetch(`${API_HOST}/pages?page=${page}&mode=close`);
    if (res.ok) {
      const ann = await res.json();
      return ann;
    }
  } catch (error) {
    console.log(`ERROR cannot read data: ${error}`);
  }
};

export { getPage, annUserId, getActive, getClose };
