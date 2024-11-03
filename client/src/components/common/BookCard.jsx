import React from 'react'
import WishlistButton from './WishlistButton';
import { Tooltip } from "flowbite-react";
import CustomeButton from './Button';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {

    return (
        <div className='max-w-[210px] max-h-[500px] h-[410px]'>
            <article className='mb-2.5 p-1.5 bg-transparent cursor-pointer border-[0.76px] border-[#bfbfbf] h-full rounded-md'>
                <div className='relative p-1 !pb-0'>
                    <Link to={`/bookDetail/${book._id}`} >
                        <div aria-hidden="true" className='flex items-center justify-center max-h-[300px] min-h-[200px] overflow-hidden cursor-pointer'>
                            <img src={book.ThumbnailURL} className='h-[250px] w-[190px]' />
                        </div>
                    </Link>
                </div>
                <div className='mt-1 flex flex-col pl-1'>
                    <Tooltip content={book.title} placement="top">
                        <h5 className='font-[700] text-lg'>{book.title.slice(0, 14) + '...'}</h5>
                    </Tooltip>
                    <p className='font-semibold'>{book.author[0] || "dummy author"}</p>
                    <div className='flex gap-2 mt-1 text-lg'>
                        <div className='font-[700]'><span>₹{book.selling_price}</span></div>
                        <div className='line-through'><span>₹{book.retail_price}</span></div>
                        <div><span>({(book.discount)}%)</span></div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='flex gap-4'>
                        <WishlistButton book={book} />
                        <CustomeButton title={'Add To Cart'} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default BookCard