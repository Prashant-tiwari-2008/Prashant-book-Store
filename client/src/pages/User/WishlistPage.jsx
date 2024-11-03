import React from 'react'
import { useSelector } from 'react-redux'
import BookCard from '../../components/common/BookCard';

const WishlistPage = () => {
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <div className='flex flex-col gap-8'>
            <div className='text-center'>
                <h1 className='font-bold text-4xl'>Wishlist</h1>
                <p>{wishlistItems?.length || 0} items</p>
            </div>
            <div className='flex flex-wrap gap-6'>
                {wishlistItems && wishlistItems.map((item, index) => (
                    <BookCard book={item} key={index} />
                ))}
            </div>


        </div>
    );
}

export default WishlistPage
