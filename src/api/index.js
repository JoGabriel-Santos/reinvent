import axios from "axios";

const API = axios.create({ baseURL: 'https://reinvent-server.vercel.app' });
// const API = axios.create({ baseURL: 'http://localhost:5000' });

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
export const getCreatorById = (id_creator) => API.get(`/user/getCreatorById/${id_creator}`);
export const changeUserInfo = (userInfo) => API.patch("/user/changeUserInfo", userInfo);

export const getProductById = (id_product) => API.get(`/product/getProductById/${id_product}`);
export const getProducts = (id_creator) => API.get(`/product/getProducts/${id_creator}`);
export const publishProduct = (userLogged, productInfo) => API.post("/product/publishProduct", { userLogged, productInfo });