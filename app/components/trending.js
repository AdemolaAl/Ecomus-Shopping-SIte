import React, { useRef , useEffect } from 'react';
import { ProductDiv2 } from './productdiv';
import Image from 'next/image';

import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())



// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar';




export default ({ Content = ProductDiv2 }) => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    


    const { data: products, error } = useSWR('/home-products', fetcher)




    if (error) return <div>Failed to load</div>
    if (!products) return null

    console.log(products)

    return (
        <div className='categories2'>
            <div className='flex'>
                <p className='shop'>Trending products</p>
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
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={80}
                loop={false}
                speed={1000}
                slidesPerView={4}
                
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                className='swipe'
                onSwiper={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                {products.map((product, idx) => (
                    <SwiperSlide key={product.id || idx} >
                        <a href={`/test/${product.shortId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='productdiv2'>
                                <div className='cvr'>
                                    <Image
                                        src={product.images[0].image || '/apple-iphone-12-r1.jpg'}
                                        alt={product.name || 'Product image'}
                                        width={500}
                                        height={300}
                                    />
                                </div>
                                <div className='texts'>
                                    <p>{product.productName || 'Product Name'}</p>
                                    <p className='disscount'>{product.originalPrice ? `$${product.originalPrice}` : '$0'}</p>
                                    <p className='original'>{product.DiscountPrice ? `$${product.DiscountPrice}` : '$0'}</p>
                                    
                                </div>
                                
                            </div></a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};