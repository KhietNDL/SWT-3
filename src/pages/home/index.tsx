import Carousel from "../../components/carousel";
import Footer from "../../components/footer";
import Header from "../../components/header";
import DoctorCarousel from "../../components/doctor-carousel";
import BlogAndDocument from "../../components/blog-and-document";
import AssessmentList from "../../components/SurveyListUser/AssessmentList";
import ServiceIntro from "../../components/review-services";
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
