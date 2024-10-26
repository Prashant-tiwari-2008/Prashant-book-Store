import React from 'react'
import bookSample from './../../assets/images/book-Sample.jpg'
import WishlistButton from './WishlistButton';
import CustomeButton from './Button';

const BookCard = ({ Book }) => {
    return (
        <div className='max-w-[180px] max-h-[500px] h-[410px]'>
            <article className='mb-2.5 p-1.5 bg-transparent cursor-pointer border-[0.76px] border-[#bfbfbf] h-full rounded-md'>
                <div className='relative p-1 !pb-0'>
                    <div aria-hidden="true" className='flex items-center justify-center max-h-[300px] min-h-[200px] overflow-hidden cursor-pointer'>
                        <img src={bookSample} className='h-[250px]' />
                    </div>
                </div>
                <div className='mt-1 flex flex-col pl-1'>
                    <h4 className='font-[700] text-lg'>Atomic Habit</h4>
                    <p className='font-semibold'>James Clear</p>
                    <div className='flex gap-2 mt-1 text-lg'>
                        <div className='font-[700]'><span>₹{"500"}</span></div>
                        <div className='line-through'><span>₹{"800"}</span></div>
                        <div><span>(-30%)</span></div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='flex gap-2'>
                        <WishlistButton />
                        <CustomeButton title={'Add To Cart'} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default BookCard