// pages/index.js or components/ContinuousSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import required modules

const ContinuousSlider = () => {
  return (
    <div style={{ maxWidth: '100vw', overflow: 'hidden', backgroundColor:'#93f859' }}>
      <Swiper
        modules={[Autoplay]} // Include the modules you need
        spaceBetween={0} // Space between slides
        slidesPerView={2} // Number of slides to show
        autoplay={{
          delay: 3000, // Delay between slide transitions in milliseconds (e.g., 3000ms = 3 seconds)
          disableOnInteraction: false, // Continue autoplay even after interaction
        }}
        loop={true} // Enable infinite looping
        speed={800} // Adjust speed for smoothness (in milliseconds)
        cssMode={true} // Smooth scrolling
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        <SwiperSlide style={{ width: '100%', textAlign: 'center' }}>
          <p>NEW SEASON, NEW STYLES: FASHION SALE YOU CAN'T MISS</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: '100%', textAlign: 'center' }}>
          <p>LIMITED TIME OFFER: FASHION SALE YOU CAN'T RESIST</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: '100%', textAlign: 'center' }}>
          <p>FREE SHIPPING AND RETURN</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: '100%', textAlign: 'center' }}>
          <p>NEW SEASON, NEW STYLES: FASHION SALE YOU CAN'T MISS</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: '100%', textAlign: 'center' }}>
          <p>LIMITED TIME OFFER: FASHION SALE YOU CAN'T RESIST</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: '100%', textAlign: 'center' }}>
          <p>FREE SHIPPING AND RETURN</p>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
};

export default ContinuousSlider;
