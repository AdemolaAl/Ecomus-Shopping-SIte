import React, { useRef, useState } from 'react';
import { ProductDiv2 } from '@/app/components/productdiv';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar';

export default ({ Content = ProductDiv2, text = 'People Also bought' }) => {


    const [isHovered, setIsHovered] = useState(false);


    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (



        <div className='categories3' onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            <p className='shop' style={{ textAlign: 'center' }}>{text}</p>

            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={40}
                loop={false}
                speed={500}
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
                
                    <div className="custom-navigation">
                        <div className={isHovered ? 'flex3' : 'flex-none'}>
                            <button ref={prevRef}  className="swiper-button-pre">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button ref={nextRef} className="swiper-button-nex">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                
                

                <SwiperSlide>
                    <Content />
                </SwiperSlide>
                <SwiperSlide>
                    <Content />
                </SwiperSlide>
                <SwiperSlide>
                    <Content />
                </SwiperSlide>
                <SwiperSlide>
                    <Content />
                </SwiperSlide>
                <SwiperSlide>
                    <Content />
                </SwiperSlide>
                <SwiperSlide>
                    <Content />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};