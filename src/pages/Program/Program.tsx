import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Program.scss";

function Program() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const navigate = useNavigate();

  const programs = [
    {
      id: 1,
      title: "Đánh giá sự phát triển của trẻ",
      shortDesc:
        "Sự phát triển với tốc độ nhanh và đầy biến động của thời đại 4.0, cùng với yêu cầu ngày càng cao của nhà trường và những bất cập trong thực tiễn giáo dục đang tạo ra những áp lực rất lớn cho trẻ em...",
      link: "/danh-gia/phat-trien",
    },
    {
      id: 2,
      title: "Từ 6 tuổi trở lên - RAVEN",
      shortDesc:
        "Test Raven là một công cụ đánh giá trí thông minh phi ngôn ngữ, được sử dụng rộng rãi để đo lường khả năng tư duy logic và giải quyết vấn đề của trẻ từ 6 tuổi trở lên...",
      link: "/danh-gia/raven",
    },
    {
      id: 3,
      title: "Thang đo đánh giá trí tuệ của Wechsler",
      shortDesc:
        "Thang đo Wechsler là công cụ đánh giá toàn diện về chỉ số thông minh (IQ), bao gồm các kỹ năng ngôn ngữ, tư duy logic, trí nhớ và tốc độ xử lý thông tin...",
      link: "/danh-gia/wechsler",
    },
    {
      id: 4,
      title: "Cấu trúc nhân cách - EPI",
      shortDesc:
        "Bài test EPI (Eysenck Personality Inventory) đánh giá các đặc điểm tính cách cơ bản như hướng nội - hướng ngoại, tính ổn định cảm xúc và tính cách...",
      link: "/danh-gia/epi",
    },
    {
      id: 5,
      title: "Tăng động giảm tập trung - ADHD",
      shortDesc:
        "Đánh giá các triệu chứng của rối loạn tăng động giảm chú ý (ADHD) thông qua các tiêu chí chuẩn đoán quốc tế, giúp phát hiện sớm và có biện pháp can thiệp kịp thời...",
      link: "/danh-gia/adhd",
    },
    {
      id: 6,
      title: "Định hướng nghề nghiệp - MBTI",
      shortDesc:
        "Test MBTI (Myers-Briggs Type Indicator) giúp học sinh hiểu rõ về tính cách, sở thích và điểm mạnh của bản thân, từ đó có định hướng nghề nghiệp phù hợp...",
      link: "/danh-gia/mbti",
    },
    {
      id: 7,
      title: "Đánh giá tính cách - DISC",
      shortDesc:
        "Mô hình DISC đánh giá bốn khía cạnh chính của tính cách: Quyết đoán (D), Ảnh hưởng (I), Ổn định (S) và Cẩn trọng (C), giúp hiểu rõ phong cách làm việc và giao tiếp...",
      link: "/danh-gia/disc",
    },
    {
      id: 8,
      title: "M-Chart-R đánh giá trẻ tự kỷ",
      shortDesc:
        "M-CHAT-R (Modified Checklist for Autism in Toddlers) là công cụ sàng lọc giúp phát hiện sớm dấu hiệu rối loạn phổ tự kỷ ở trẻ nhỏ...",
      link: "/danh-gia/mchat",
    },
  ];

  const handleServiceClick = (id: number) => {
    setSelectedService(selectedService === id ? null : id);
  };

  const handleViewMore = (link: string) => {
    navigate(link);
  };

  return (
    <div className="program-page">
      <Header />

      <main className="program-content">
        <div className="program-hero">
          <h1>Các dịch vụ đánh giá tâm lý</h1>
          <p>Hệ thống đánh giá toàn diện theo tiêu chuẩn quốc tế</p>
        </div>

        <div className="services-grid">
          {programs.map((program) => (
            <div key={program.id} className="service-card">
              <div
                className="service-header"
                onClick={() => handleServiceClick(program.id)}
              >
                <h2>{program.title}</h2>
              </div>

              {selectedService === program.id && (
                <div className="service-description">
                  <p>{program.shortDesc}</p>
                  <button
                    className="view-more"
                    onClick={() => handleViewMore(program.link)}
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Program;
