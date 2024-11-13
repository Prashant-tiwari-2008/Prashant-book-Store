import React from 'react'
import CustomeButton from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCard, removeItemFromCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cartService';

const AddToCartButton = ({ book }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    debugger
    const cartList = useSelector(state => state.cartList);
    console.log("cartlist",cartList)
    const isBookInCart = cartList.some(item => item._id === book._id)
    // check is the book in wishlist

    const AddToCart = async () => {
        try {
            if (isBookInCart) {
                navigate("/cart");
            } else {
                dispatch(addItemToCard(book));
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
                <CustomeButton title={'Add to Cart'} handleClick={AddToCart} />)
                : (
                    <CustomeButton title={'Go to Cart'} handleClick={AddToCart} />
                )
            }

        </div>
    )
}

export default AddToCartButton