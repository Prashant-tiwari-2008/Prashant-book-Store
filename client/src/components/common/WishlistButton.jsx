import React from 'react'
import { Button } from 'flowbite-react'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { addItemToWishlist, removeItemFromWishlist } from '../../redux/slices/WishListSlice';
import { addToWishList, removeFromWishList } from '../../services/userService';

const WishlistButton = ({ book }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.items);
    const isBookInWishlist = wishlist.some(item => item._id === book._id)

    const toggleWishList = async () => {
        try {
            if (isBookInWishlist) {
                dispatch(removeItemFromWishlist(book));
                await removeFromWishList(book._id);
            } else {
                dispatch(addItemToWishlist(book));
                await addToWishList(book._id)
            }
        } catch (error) {
            console.log("failed to update wishlist:", error);
            if (isBookInWishlist) {
                dispatch(addItemToWishlist(book))
            } else {
                dispatch(removeFromWishList(book))
            }
        }
    }

    return (
        <Button onClick={toggleWishList} className='self-center items-center w-7 h-7 md:w-10 md:h-10' color='gray' pill>
            {!isBookInWishlist ? (
                <IoIosHeartEmpty className='md:text-3xl' />
            ) : (
                <IoIosHeart className='md:text-3xl text-red-700' />
            )}
        </Button>
    )
}

export default WishlistButton;
