import DoctorCarousel from "../../components/doctor-carousel";
import DoctorInfo from "../../components/doctor-information";
import Footer from "../../components/footer";
import Header from "../../components/header";

function BookingDetail() {
  return (
    <div>
      <Header/>
      <DoctorInfo/>
      <DoctorCarousel numberOfSlides={4} autoplay={false} />
      <Footer/>
    </div>
  )
}

export default BookingDetail