import React from 'react'
import CustomeButton from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cartService';
import { removeItemFromWishlist } from '../../redux/slices/WishListSlice';
import { removeFromWishList } from '../../services/userService';

const AddToCartButton = ({ book }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items: cartList } = useSelector(state => state.cart);
    const { items: wishlist } = useSelector(state => state.wishlist);


    let isBookInCart = false;
    //run only when user is logged in
    if (cartList) {
        isBookInCart = cartList.some(item => item._id === book._id)
    }

    let isBookInWishList = false;
    // check is the book in wishlist
    if (wishlist) {
        isBookInWishList = wishlist.some(item => item._id === book._id)
    }


    const AddToCart = async (book) => {
        try {
            if (isBookInCart) {
                navigate("/cart");
            } else {
                dispatch(addItemToCart(book));
                await addToCart(book._id);
                if (isBookInWishList) {
                    removeItemFromWishlist(book._id)
                    await removeFromWishList(book._id)
                }
            }
        } catch (error) {
            console.log("failed to add in cart");
            dispatch(removeItemFromCart(book));
        }
    }

    return (
        <div>
            {!isBookInCart ? (
                <CustomeButton title={'Add to Cart'} handleClick={() => AddToCart(book)} />)
                : (
                    <CustomeButton title={'Go to Cart'} handleClick={() => AddToCart(book)} />
                )
            }

        </div>
    )
}

export default AddToCartButton