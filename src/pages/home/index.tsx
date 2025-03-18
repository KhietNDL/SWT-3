import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import DoctorCarousel from "../../components/DoctorCarousel";
import BlogAndDocument from "../../components/BlogAndDocument";
import AssessmentList from "../../components/SurveyListUser/UserSurveyList";
import ServiceIntro from "../../components/ReviewServices";
function HomePage() {
  return (
    <div>
      <Header />
      <Carousel numberOfSlides={1} autoplay={true} />
      <ServiceIntro />
      <AssessmentList />
      <DoctorCarousel />
      <BlogAndDocument />
      <Footer />
    </div>
  );
}

export default HomePage;
