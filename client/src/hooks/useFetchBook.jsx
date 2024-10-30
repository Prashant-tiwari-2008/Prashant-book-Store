import { useEffect, useState } from 'react'
import { fetchBooks } from '../services/bookService';

const useFetchBooks = (category, start, limit) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const startIndex = start || 0;
    const endIndex = limit || 9;

    useEffect(() => {
        const getBooks = async () => {
            try {
                let result = await fetchBooks(category, startIndex, endIndex);
                setBooks(result);
            } catch (error) {
                console.log("Error in useFetch", error);
                return null;
            }
            setLoading(false);
        }
        getBooks();
    }, [category, start, limit])

    return { books, loading };
}

export default useFetchBooks;