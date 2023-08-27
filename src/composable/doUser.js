// import router from "../router";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const getUsers = async () => {
    try {
        const res = await fetch(`${VITE_BASE_URL}/users`)
        if (res.ok) {
            const alluser = await res.json()
            return alluser
        } else {
            throw new Error(`No User`)
        }
    } catch (error) {
        console.log(`Error`)
    }
}
// http://localhost:8080/api/users
// ${URL_USER}
export { getUsers }