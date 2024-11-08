import axios from "axios";

/**
 * 
 * @param {String} bookId 
 * @param {String} userId 
 * @returns updated user wishlist
 */
export const addToWishList = async (bookId, userId) => {
    try {
        let url = `http://localhost:4001/api/v1/user/addtowishlit/${userId}`
        let response = await axios.post(url, bookId);
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
 * @returns will return the user details
 */
export const fetchUserDetail = async () => {
    try {
        let url = `http://localhost:4001/api/v1/user/profile`
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