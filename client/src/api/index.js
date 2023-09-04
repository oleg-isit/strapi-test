import {auth} from "./auth";
import {content} from "./content";
import {createAPI} from "../utils/request/simple";
import {products} from "./products";

const handleError = (e) => {
    if (!!e.error.message) {
        return [e.error.message]
    }
    return ['Server error']
}

const config = {
    domain: process.env.REACT_APP_API_URL,
    getToken: () => localStorage.getItem('token') || false,
    getRefreshToken: () => localStorage.getItem('refreshToken') || undefined,
    errorHandling: handleError
};


export const API = createAPI({auth, content, products}, config)
