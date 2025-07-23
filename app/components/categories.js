import React, { useRef } from 'react';
import Category from './category';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar';

export default () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className='categories'>
            <div className='flex'>
                <p className='shop'>Shop by category</p>
                <div className="custom-navigation">
                    <button ref={prevRef} className="swiper-button-pre">
                        <div></div>
                    </button>
                    <button ref={nextRef} className="swiper-button-nex">
                        <div></div>
                    </button>
                </div>
            </div>
            
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={0}
                loop={false}
                speed={1000}
                slidesPerView={4} 
                

                //navigation
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                    // Ensure swiper knows about navigation elements once rendered
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                <SwiperSlide>
                    <Category />
                </SwiperSlide>
                <SwiperSlide>
                    <Category />
                </SwiperSlide>
                <SwiperSlide>
                    <Category />
                </SwiperSlide>
                <SwiperSlide>
                    <Category />
                </SwiperSlide>
                <SwiperSlide>
                    <Category />
                </SwiperSlide>
                <SwiperSlide>
                    <Category />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};