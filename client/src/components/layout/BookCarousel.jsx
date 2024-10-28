import React from 'react'
import BookCard from '../common/BookCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import { FreeMode,Navigation } from 'swiper/modules';

const BookCarousel = ({ title, books }) => {
    return (
        <div className='my-7'>
            <div className='flex justify-between mb-4'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-sm underline text-yellow-400'>View All</p>
            </div>

            <Swiper
                slidesPerView={7}
                spaceBetween={35}
                freeMode={true}
                modules={[FreeMode,Navigation]}
                className='mySwiper'
            >
                {books && books.map((book) => (
                    <SwiperSlide><BookCard book={book} /></SwiperSlide>
                )
                )}
            </Swiper>



        </div>
    )
}

export default BookCarousel