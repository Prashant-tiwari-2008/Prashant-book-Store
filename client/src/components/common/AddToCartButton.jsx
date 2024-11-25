import React from 'react'
import CustomeButton from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cartService';

const AddToCartButton = ({ book }) => {
    debugger
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { item: cartList } = useSelector(state => state.cart);
    let isBookInCart = false;

    if (cartList) { //run only when user is logged in
        isBookInCart = cartList.some(item => item._id === book._id)
    }
    // check is the book in wishlist

    const AddToCart = async(book) => {
        debugger
        try {
            if (isBookInCart) {
                navigate("/cart");
            } else {
                dispatch(addItemToCart(book));
                // await addToCart(book._id)
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