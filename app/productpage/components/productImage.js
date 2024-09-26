import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function App({first='/xbox1.jpg', second='/xbox2.jpg', third='/xbox3.jpg', fourth='/xbox4.jpg'}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeSlide, setActiveSlide] = useState(null); // Track the active slide

    return (
        <div className='productImg'>
            <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <Image
                        src={first}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='main'
                        
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={second}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='main'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={third}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='main'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={fourth}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='main'
                    />
                </SwiperSlide>
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                height={'100%'}
                spaceBetween={20}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide
                    onClick={() => setActiveSlide(1)}
                >
                    <Image
                        src={first}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='sub'

                        style={{
                            border: activeSlide === 1 ? '1px solid black' : '1px solid #d3d3d3',
                            cursor: 'pointer',
                        }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={second}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='sub'

                        onClick={() => setActiveSlide(2)}
                        style={{
                            border: activeSlide === 2 ? '1px solid black' : '1px solid #d3d3d3',
                            cursor: 'pointer',
                        }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={third}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='sub'


                        onClick={() => setActiveSlide(3)}
                        style={{
                            border: activeSlide === 3 ? '1px solid black' : '1px solid #d3d3d3',
                            cursor: 'pointer',
                        }}
                    />
                </SwiperSlide>
                <SwiperSlide
                    onClick={() => setActiveSlide(4)}

                >
                    <Image
                        src={fourth}
                        alt="Example image"
                        width={500}
                        height={300}
                        className='sub'

                        style={{
                            border: activeSlide === 4 ? '1px solid black' : '1px solid #d3d3d3',
                            cursor: 'pointer',
                        }}
                    />
                </SwiperSlide>
            </Swiper>
        </ div>
    );
}
