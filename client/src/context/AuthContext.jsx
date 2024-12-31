import { createContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux'
import { verifyToken } from '../services/authService';
import Loader from '../components/common/Loader';
import { fetchUserDetail } from '../services/userService';
import { setUserDetails } from '../redux/slices/userSlice';
import { setWishlist } from '../redux/slices/WishListSlice';
import { setCartList } from '../redux/slices/cartSlice';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['isLoggedIn'],
        queryFn: () => verifyToken(),
        staleTime: 10 * 60 * 1000, // Optionally set stale time // todo : need to read
        cacheTime: 30 * 60 * 1000,
        retry: 0, // Optional caching to minimize re-fetching // todo: need to read
    })

    const fetchUserData = async () => {
        try {
            const userData = await fetchUserDetail();
            dispatch(setUserDetails(userData));
            dispatch(setWishlist(userData?.data.wishList))
            dispatch(setCartList(userData?.data.cartList))
        } catch (error) {
            console.log("Failed to fetch user Details : ", error);
            setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        if (data) {
            setIsLoggedIn(true);
            fetchUserData();
        } else if (isError) {
            setIsLoggedIn(false);
        }
    }, [data, isError])

    const loginMethod = () => {
        setIsLoggedIn(true)
    }

    const logOutMethod = () => {
        setIsLoggedIn(false)
    }

    // code suggested by chatGPT
    // const loginMethod = (userData) => {
    //     setIsLoggedIn(true);
    //     dispatch(setUserDetails(userData));
    // };

    // const logOutMethod = () => {
    //     setIsLoggedIn(false);
    //     dispatch(clearUserDetails());
    // };

    if (isPending) return <div className='flex justify-center items-center my-5 w-full h-full'><Loader /></div>;


    return (
        <AuthContext.Provider value={{ isLoggedIn, loginMethod, logOutMethod }}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    )

}

export default AuthProvider;