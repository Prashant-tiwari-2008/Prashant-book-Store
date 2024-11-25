import React from 'react'
import { IoClose } from "react-icons/io5";
import { Button } from 'flowbite-react'
import { useDispatch } from 'react-redux';

const CheckoutCard = ({ book }) => {
    const dispatch = useDispatch();

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
                    <div className='flex gap-2'>
                        <p>Qty :</p>
                        <Button>-</Button>
                        <p>{1}</p>
                        <Button>+</Button>

                    </div>
                </div>

                {/* price detail and remove */}
                <div className='flex flex-col float-right'>
                    <div className='float-right '>
                        <IoClose className='float-right' />
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