import { Link } from "react-router-dom";
import "./index.scss";
import { Button } from "antd";
import booking from "../../images/booking.png";
import quiz from "../../images/quiz.jpg";
import program from "../../images/program.jpg";
interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ image, title, description, link }: ServiceCardProps) => (
  <div className="service-card">
    <img src={image} alt={title} className="service-image" />
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
    <Link to={link}>
      <Button type="primary" className="login-button">
        Xem chi tiết
      </Button>
    </Link>
  </div>
);

function ServiceIntro() {
  const services = [
    {
      image: booking,
      title: "Tham vấn và Trị liệu tâm lý",
      description:
        "Thực hiện tham vấn, tư vấn tâm lý trực tiếp, trực tuyến cho học sinh, cặp đôi, gia đình...",
      link: "/booking",
    },
    {
      image: quiz,
      title: "Sàng lọc và Đánh giá trẻ em",
      description:
        "Hỗ trợ theo dõi sự phát triển của trẻ với bộ công cụ sàng lọc tin cậy nhất hiện nay...",
      link: "/test",
    },
    {
      image: program,
      title: "Đào tạo",
      description:
        "Đào tạo để cập đến việc dạy các kỹ năng thực hành, nghề nghiệp hay kiến thức liên quan...",
      link: "/dich-vu",
    },
  ];

  return (
    <div className="service-intro">
      <h2 className="main-title">BrainCare tập trung vào</h2>
      <div className="service-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}

export default ServiceIntro;
