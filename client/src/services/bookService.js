import axios from 'axios';

export const fetchBooks = async (category, startIndex, limit) => {
    try {
        let url = `http://localhost:4001/api/v1/book/getBestSellerByCategory?BisacCode=${category}&startIndex=${startIndex}&limit=${limit}`
        const response = await axios.get(url);
        if (response.data.success) {
            return response.data.data;
        } else {
            console.log("error in fetching the response");
        }
    } catch (error) {
        console.log("Error fetch books", error);
        throw error;
    }
} 