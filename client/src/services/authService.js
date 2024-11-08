import axios from "axios";

export const registerUser = async (userDetails) => {
    try {
        let url = `http://localhost:4001/api/v1/auth/signup`
        let response = await axios.post(url, userDetails);
        if (response.data.success) {
            return response.data;
        } else {
            console.log("error in register")
        }
    } catch (error) {
        console.log(error, "error")
        throw error.response.data;
    }
}

export const login = async (userDetails) => {
    try {
        let url = `http://localhost:4001/api/v1/auth/login`
        let response = await axios.post(url, userDetails, { withCredentials: true });
        if (response.data.success) {
            return response.data
        } else {
            console.log("error in login")
        }
    } catch (error) {
        console.log(error, "error")
        throw error.response.data;
    }
}

export const verifyToken = async () => {
    try {
        let url = `http://localhost:4001/api/v1/auth/verifyToken`;
        let response = await axios.get(url, { withCredentials: true });
        if (response.data.success) {
            return response.data;
        } else {
            console.log("error in verify toke")
        }
    } catch (error) {
        console.log("error", error);
        throw error.response;
    }
}   