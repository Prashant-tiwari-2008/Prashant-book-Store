import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Button } from 'flowbite-react'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../services/cartService';
import { addItemToCart, reducerItemQuantity, removeItemFromCart } from '../../redux/slices/cartSlice';

const CheckoutCard = ({ book, quantity }) => {

    const dispatch = useDispatch();


    const handleRemoveFromCart = async () => {
        try {
            dispatch(removeItemFromCart(book._id))
            await removeFromCart(book._id)
        } catch (error) {
            console.log("Error in removing from cart", error);
            dispatch(addItemToCart(book));
        }
    }

    const handleIncrementItem = async () => {
        try {
            dispatch(addItemToCart(book));
            await addToCart(book._id)
        } catch (error) {
            console.log("Error in incrementing item", error)
            dispatch(removeItemFromCart(book._id))
        }
    }

    const handleDecrementItem = async () => {
        debugger            
        try {
            if (quantity == 1) {
                dispatch(removeItemFromCart(book._id))
            } else {
                dispatch(reducerItemQuantity(book._id))
            }
        } catch (error) {
            console.log("Error in incrementing item", error)
            dispatch(addItemToCart(book));
        }
    }

    return (
        <>
            {/* item listing */}
            <hr className="h-[2px] mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className='flex mt-5 gap-5 w-full'>
                {/* book image */}
                <div>
                    <img src={book.ThumbnailURL} className='h-36 w-[125px]' alt="book-Thumbnail" />
                </div>

                {/* Book detail */}
                <div className='flex flex-col gap-2 w-full'>
                    <p>{book.title}</p>
                    <p>by : {'testing'}</p>
                    <div className="flex items-center gap-3">
                        <p className="text-gray-700 font-medium">Qty:</p>
                        <button onClick={handleDecrementItem}
                            className="w-8 h-8 bg-gray-200 text-gray-700 font-bold border border-gray-300 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            -
                        </button>
                        <p className="text-gray-700 font-semibold">{quantity ? quantity : 1}</p>
                        <button onClick={handleIncrementItem}
                            className="w-8 h-8 bg-gray-200 text-gray-700 font-bold border border-gray-300 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            +
                        </button>
                    </div>

                </div>

                {/* price detail and remove */}
                <div className='flex flex-col float-right'>
                    <div className='float-right '>
                        <IoClose className='float-right cursor-pointer' onClick={() => handleRemoveFromCart()} />
                    </div>
                    <div className='flex gap-2 mt-1 text-lg items-center'>
                        <div className='text-sm'><span>({(book.discount)}%)</span></div>
                        <div className='line-through text-sm'><span>₹{book.retail_price}</span></div>
                        <div className=''><span>₹{book.selling_price}</span></div>
                    </div>
                    <div>
                        <p>Shipping Charges: <span className='text-blue-600'>FREE</span></p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CheckoutCard