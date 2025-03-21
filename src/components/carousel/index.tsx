// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./index.scss";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { CarouselProps } from "../../types/carousel";
import Carousel1 from "../../images/Screenshot 2025-03-21 081912.png";
import Carousel2 from "../../images/Screenshot 2025-03-21 081935.png";
import Carousel3 from "../../images/Screenshot 2025-03-21 082003.png";

export default function Carousel({
  numberOfSlides = 1,
  autoplay = false,
}: CarouselProps) {
  const localImages = [Carousel1, Carousel2, Carousel3];

  return (
    <>
      <Swiper
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={autoplay ? [Navigation, Autoplay] : [Navigation]}
        className={`carousel ${numberOfSlides > 1 ? "multi" : ""}`}
      >
        {localImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Carousel ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
