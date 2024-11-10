import axios from "axios";

// import { useSelector } from 'react-redux'; // can not call outside the function component


//base API URLs 
const BASE_URL = "http://localhost:4001/api/v1/user";
const ADMIN_URL = "http://localhost:4001/api/v1/user/admin";


const getBaseUrl = () => {
    // const { role } = useSelector(state => state.user.role) // can not call outside the function
    // const role = store.getState()?.user?.role;
    // return role === 'admin' ? ADMIN_URL : BASE_URL
}

// console.log(getBaseUrl(), "get base url")
/**
 * 
 * @returns will return the user details
 */
export const fetchUserDetail = async () => {
    try {
        let url = `http://localhost:4001/api/v1/user`
        let response = await axios.get(url, { withCredentials: true });
        if (response.data.success) {
            return response.data;
        } else {
            console.log("error in fetching book details")
        }
    } catch (error) {
        console.log(error, "error");
        throw error.response.data;
    }
}

/**
 * 
 * @param {String} bookId 
 * @param {String} userId 
 * @returns updated user wishlist
 */
export const addToWishList = async (bookId) => {
    try {
        let url = `http://localhost:4001/api/v1/user/addtowishlit`
        let response = await axios.put(url, { bookId }, { withCredentials: true });
        if (response.data.success) {
            return response.data;
        } else {
            console.log("error in adding book to widhlist")
        }
    } catch (error) {
        console.log(error, "error");
        throw error.response.data;
    }
}

/**
 * 
 * @param {String} bookId 
 * @param {String} userId 
 * @returns updated user wishlist
 */
export const removeFromWishList = async (bookId) => {
    try {
        let url = `http://localhost:4001/api/v1/user/removeFromWishList`
        let response = await axios.put(url, { bookId }, { withCredentials: true });
        if (response.data.success) {
            return response.data;
        } else {
            console.log("error in adding book to widhlist")
        }
    } catch (error) {
        console.log(error, "error");
        throw error.response.data;
    }
}
