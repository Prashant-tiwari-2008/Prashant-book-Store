import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react'
import { verifyToken } from '../services/authService';
import Loader from '../components/common/Loader';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setiIsLoggedIn] = useState(null);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['isLoggedIn'],
        queryFn: () => verifyToken(),
        staleTime: 10 * 60 * 1000, // Optionally set stale time // todo : need to read
        cacheTime: 30 * 60 * 1000,
        retry: 0, // Optional caching to minimize re-fetching // todo: need to read
    })

    useEffect(() => {
        if (data) {
            setiIsLoggedIn(true);
        } else if (isError) {
            setiIsLoggedIn(false);
        }
    }, [data, isError])

    const loginMethod = (userData) => {
        setUser(userData);
        setiIsLoggedIn(true)
    }

    const logOutMethod = () => {
        setUser(null);
        setiIsLoggedIn(false)
    }

    if (isPending) return <div className='flex justify-center items-center my-5 w-full h-full'><Loader /></div>;


    return (
        <AuthContext.Provider value={{ user, isLoggedIn, loginMethod, logOutMethod }}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    )

}

export default AuthProvider;