import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

//
import 'swiper/css';
import './../../assets/css/banner.css'
import { Autoplay } from 'swiper/modules';

//images
import banner1 from './../../assets/images/banner-1.jpg'
import banner2 from './../../assets/images/banner-2.jpg'
import banner3 from './../../assets/images/banner-3.jpg'
import banner4 from './../../assets/images/banner-4.jpg'
import banner5 from './../../assets/images/banner-5.jpg'
import banner6 from './../../assets/images/banner-6.gif'

const Banner = () => {
    return (
        <div className='my-5'>
            <Swiper 
                spaceBetween={0} 
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false,speed: 15000}}
                modules={[Autoplay]}
                className='mySwiper'
            >
                <SwiperSlide><img src={banner1}></img></SwiperSlide>
                <SwiperSlide><img src={banner2}></img></SwiperSlide>
                <SwiperSlide><img src={banner3}></img></SwiperSlide>
                <SwiperSlide><img src={banner4}></img></SwiperSlide>
                <SwiperSlide><img src={banner5}></img></SwiperSlide>
                <SwiperSlide><img src={banner6}></img></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Banner