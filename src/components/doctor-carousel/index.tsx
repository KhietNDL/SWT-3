// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

// import required modules
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { DoctorType } from "../../types/doctor";
export default function DoctorCarousel() {
  const [poster, setPoster] = useState<DoctorType[]>([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      "https://679e3cf1946b0e23c062eb69.mockapi.io/Doctor"
    );
    console.log();
    setPoster(response.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className="doctor-carousel"
    >
      {poster.map((doctor) => (
        <SwiperSlide>
          <div className="doctor-card">
            <div className="doctor-image">
              <img src={doctor.poster_path} alt={doctor.name} />
            </div>
            <div className="doctor-info">
              <h2>{doctor.name}</h2>
              <p className="title">{doctor.role}</p>
              <p className="info">{doctor.info}</p>
              <Button type="primary" className="doctor-button">
                Xem thêm
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
