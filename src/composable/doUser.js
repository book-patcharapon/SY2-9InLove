// import router from "../router";

// const URL_USER = import.meta.env.URL_USER

const getUsers = async () => {
    try {
        const res = await fetch(`http://localhost:8080/api/users`)
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

export { getUsers }