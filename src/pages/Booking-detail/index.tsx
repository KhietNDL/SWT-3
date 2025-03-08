import DoctorCarousel from "../../components/DoctorCarousel";
import DoctorInfo from "../../components/DoctorInformation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function BookingDetail() {
  return (
    <div>
      <Header />
      <DoctorInfo />
      <DoctorCarousel numberOfSlides={4} autoplay={false} />
      <Footer />
    </div>
  );
}

export default BookingDetail;
