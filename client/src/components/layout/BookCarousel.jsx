import React from 'react'
import BookCard from '../common/BookCard'

const BookCarousel = ({ title, books }) => {
    return (
        <div className='my-5'>
            <div className='flex justify-between mb-4'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-sm underline text-yellow-400'>View All</p>
            </div>
            
            {books && books.map((book) => (
                <BookCard book={book} />
            )
            )}
        </div>
    )
}

export default BookCarousel