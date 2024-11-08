import { Button } from 'flowbite-react'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItemToWishlist, removeItemFromWishlist } from '../../redux/slices/WishListSlice';

const WishlistButton = ({ book }) => {
    
    const [wishlist, setWishlist] = useState(false);
    const dispatch = useDispatch();

    const toggleWishList = () => {
        const newWishlistState = !wishlist;
        setWishlist(newWishlistState);
        if (newWishlistState) {
            dispatch(addItemToWishlist(book))
        } else {
            dispatch(removeItemFromWishlist(book))
        }
    }

    return (
        <Button onClick={toggleWishList} className='self-center items-center w-7 h-7 md:w-10 md:h-10' color='gray' pill>
            {!wishlist ? <IoIosHeartEmpty className='md:text-3xl' /> : <IoIosHeart className='md:text-3xl text-red-700' />}
        </Button>
    )
}

export default WishlistButton;
