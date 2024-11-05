import axios from 'axios';

export const fetchBooks = async (filterOption, currentPage) => {
    try {
        const flattenedOptions = {};
        for (const [key, value] of Object.entries(filterOption)) {
            if (Array.isArray(value)) {
                flattenedOptions[key] = value.join(',');
            } else {
                flattenedOptions[key] = value;
            }
        }
        const params = new URLSearchParams(flattenedOptions);
        const queryString = params.toString();
        let url = `http://localhost:4001/api/v1/book?${queryString}&currentPage=${currentPage || 1}`
        
        let response = await axios.get(url);
        if (response.data.success) {
            return response.data;
        } else {
            console.log("error in fetching the response")
        }
    } catch (error) {
        console.log("Error in fetching books", error);
        throw error;
    }
}

export const fetchBook = async (BookId) => {
    try {
        let url = `http://localhost:4001/api/v1/book/${BookId}`;
        const response = await axios.get(url);
        if (response.data.success) {
            return response.data.data;
        } else {
            console.log("Error in fetch the response")
        }
    } catch (error) {
        console.log(error, "error")
        throw error;
    }
}

export const fetchFilterConfig = async (category) => {
    try {
        let url = `http://localhost:4001/api/v1/book/filters?BisacCode=${category}`
        const response = await axios.get(url);
        if (response.data.success) {
            return response.data.data
        } else {
            console.log("error in fetch the response")
        }
    } catch (error) {
        console.log("Eror fetch Books", error);
        throw error;
    }
}   