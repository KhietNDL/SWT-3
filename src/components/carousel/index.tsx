// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./index.scss";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { PosterType, CarouselProps } from "../../types/carousel";

export default function Carousel({
  numberOfSlides = 1,
  autoplay = false,
}: CarouselProps) {
  const [poster, setPoster] = useState<PosterType[]>([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      "https://67825c7ac51d092c3dcf3248.mockapi.io/SS"
    );
    console.log();
    setPoster(response.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
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
        {poster.map((Poster) => (
          <SwiperSlide>
            <img src={Poster.poster_path} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
