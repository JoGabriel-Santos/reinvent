import axios from "axios";

const API = axios.create({ baseURL: 'https://reinvent-server.vercel.app' });

/*
    API.interceptors.request.use((request) => {
        if (localStorage.getItem('profile')) {
            request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))['token']}`
        }

        return request
    })
 */

export const signin = (userInfo) => API.post("/user/signin", userInfo);
export const signup = (userInfo) => API.post("/user/signup", userInfo);
export const changeUserInfo = (userInfo) => API.patch("/user/changeUserInfo", userInfo);

export const getProducts = () => API.get("/product/getProducts");
export const publishProduct = (userLogged, productInfo) => API.post("/product/publishProduct", { userLogged, productInfo });