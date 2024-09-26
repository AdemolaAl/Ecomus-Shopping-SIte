import Slides from './slides'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y,  Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar';

export default function ThreeDivSlider () {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      loop ={true}
      speed = {1000}
      slidesPerView={1}
      //navigation
      pagination={{ clickable: true }}
      //scrollbar={{ draggable: true }}
      autoplay = {{delay:'3000',  }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <Slides />
      </SwiperSlide>
      <SwiperSlide><Slides text1={'Modern design'} images='/Slideshow_Electronics1-removebg-preview.png' color='rgba(239,250,252,255)'/></SwiperSlide>
      <SwiperSlide><Slides text1={'Fast charging'} images='/Slideshow_Electronics3-removebg-preview.png' color='rgba(253,246,238,255)'/></SwiperSlide>
    </Swiper>
  );
};