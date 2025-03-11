import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Program.scss";

function Program() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [programTitle, setProgramTitle] = useState<string>(''); // Thêm state để lưu title
  const navigate = useNavigate();

  const programs = [
    {
      id: 1,
      title: "Giải Tỏa Lo Âu - Hướng Tới Tương Lai Tươi Sáng",
      shortDesc: "Chương trình giúp học sinh giảm bớt lo âu, cải thiện khả năng quản lý căng thẳng trong môi trường học đường thông qua các buổi tư vấn và kỹ thuật thư giãn...",
      link: "/danh-gia/lo-au"
    },
    {
      id: 2,
      title: "Vượt Qua Trầm Cảm - Đánh Thức Niềm Tin Cuộc Sống",
      shortDesc: "Chương trình cung cấp các buổi trị liệu tâm lý và tư vấn cho học sinh mắc chứng trầm cảm, giúp họ vượt qua cảm giác cô đơn và tuyệt vọng trong môi trường học đường.",
      link: "/danh-gia/tram-cam"
    },
    {
      id: 3,
      title: "Kỹ Năng Chinh Phục Lo Âu - Tự Tin Vượt Lên",
      shortDesc: "Chương trình này giúp học sinh xây dựng các kỹ năng đối phó hiệu quả với lo âu và căng thẳng thông qua các bài tập thực tế và tư vấn cá nhân...",
      link: "/danh-gia/ky-nang-doi-pho-lo-au"
    },
    {
      id: 4,
      title: "Chinh Phục Lo Âu",
      shortDesc: "Chương trình này giúp học sinh xây dựng các kỹ năng đối phó với lo âu trong học đường và cuộc sống.",
      link: "/danh-gia/chinh-phuc-lo-au"
    },
    {
      id: 5,
      title: "Giảm Căng Thẳng Để Học Tốt Hơn",
      shortDesc: "Chương trình giúp học sinh giảm căng thẳng để nâng cao hiệu quả học tập và cải thiện sức khỏe tinh thần.",
      link: "/danh-gia/giam-cang-thang"
    },
    {
      id: 6,
      title: "Điều Chỉnh Thói Quen Sống Tích Cực",
      shortDesc: "Chương trình hướng dẫn học sinh điều chỉnh thói quen sống để có một cuộc sống tích cực và đầy đủ.",
      link: "/danh-gia/thoquen-tich-cuc"
    },
    {
      id: 7,
      title: "Phát Triển Kỹ Năng Quản Lý Thời Gian",
      shortDesc: "Chương trình giúp học sinh phát triển kỹ năng quản lý thời gian hiệu quả để cải thiện công việc học tập.",
      link: "/danh-gia/quan-ly-thoi-gian"
    },
    {
      id: 8,
      title: "Xây Dựng Niềm Tin Tự Tin Vào Bản Thân",
      shortDesc: "Chương trình giúp học sinh phát triển sự tự tin và niềm tin vào bản thân để vượt qua mọi thử thách.",
      link: "/danh-gia/tu-tin"
    }
  ];

  const handleServiceClick = (id: number, title: string) => {
    setSelectedService(selectedService === id ? null : id); // Toggle selected service
    setProgramTitle(title); // Cập nhật title khi click vào chương trình
  };

  const handleViewMore = (link: string) => {
    navigate(link);
  };

  return (
    <div className="program-page">
      <Header />

      <main className="program-content">
        <div className="program-hero">
          <h1>{programTitle || "Các dịch vụ đánh giá tâm lý"}</h1> {/* Hiển thị title cập nhật hoặc mặc định */}
          <p>Hệ thống đánh giá toàn diện theo tiêu chuẩn quốc tế</p>
        </div>

        <div className="services-grid">
          {programs.map((program) => (
            <div key={program.id} className="service-card">
              <div 
                className="service-header" 
                onClick={() => handleServiceClick(program.id, program.title)}
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
