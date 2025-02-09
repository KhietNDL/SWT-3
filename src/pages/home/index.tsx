import Carousel from '../../components/carousel'
import Footer from '../../components/footer'
import Header from '../../components/header'
import DoctorCarousel from "../../components/doctor-carousel"
import BlogAndDocument from '../../components/blog-and-document'
function HomePage() {
  return (
    <div>
      <Header/>
      <Carousel numberOfSlides={1} autoplay= {true} />
      <DoctorCarousel/>
      <BlogAndDocument />
      <Footer />
    </div>
  )
}

export default HomePage