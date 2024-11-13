import axios from "axios";

export const addToCart = async ({ bookId }) => {
    try {
        let url = 'http://localhost:4001/api/v1/addToCart';
        let response = axios.put(url, { bookId }, { withCredentials: true });
        if ((await response).data.success) {
            return response.data
        } else {
            console.log("error in adding the book in cart")
        }
    } catch (error) {
        console.log("Error in AddToCart : ", error);
        throw error.response.data
    }
}

export const removeFromCart = async ({ bookId }) => {
    try {
        let url = 'http://localhost:4001/api/v1/removeFromCart';
        let response = axios.put(url, { bookId }, { withCredentials: true });
        if ((await response).data.success) {
            return response.data
        } else {
            console.log("error in adding the book in cart")
        }
    } catch (error) {
        console.log("Error in AddToCart : ", error);
        throw error.response.data
    }
}