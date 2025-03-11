import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./Program.scss";

function Program() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
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
      shortDesc: "Chương trình cung cấp các buổi trị liệu tâm lý và tư vấn cho học sinh mắc chứng trầm cảm, giúp họ vượt qua cảm giác cô đơn và tuyệt vọng trong môi trường học đường..",
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
      title: "Kết NỐi Cảm Xúc - Tư Vấn Nhóm Cho Trẻ Mắc Trầm Cảm",
      shortDesc: "Chương trình tổ chức các buổi tư vấn tâm lý nhóm giúp học sinh trầm cảm chia sẻ cảm xúc và nhận sự hỗ trợ từ cộng đồng, giảm bớt sự cô đơn và khủng hoảng...",
      link: "/danh-gia/tu-van-tam-ly-nhom"
    },
    {
      id: 5,
      title: "Thiền & Thư Giãn - Khám Phá Tâm An, Học Tốt",
      shortDesc: "Các bài tập thiền và thư giãn trong chương trình giúp học sinh giảm căng thẳng, cải thiện tâm trạng và tăng cường sự tập trung trong học tập...",
      link: "/danh-gia/thu-gian-thien-dinh"
    },
    {
      id: 6,
      title: "Nhận Thức & Hành Động - Chấm Dứt Lo Âu và Trầm Cảm",
      shortDesc: "Chương Trình cung cấp các buổi hội thảo và tài liệu giáo dục để học sinh nhận thức rõ hơn về các triệu chứng lo âu và trầm cảm, giúp họ tìm kiếm sự hỗ trợ kịp thời ",
      link: "/danh-gia/nhan-thuc-lo-au-tram-cam"
    },
    {
      id: 7,
      title: "Khám Phá Cảm Xúc - Tìm Hiểu Bản Thân Thật Sự",
      shortDesc: "Chương trình này giúp học sinh nhận diện và hiểu rõ cảm xúc của bản thân, từ đó tìm ra các phương pháp cân bằng tâm lý và đối phó với lo âu và trầm cảm...",
      link: "/danh-gia/kham-pha-cam-xuc"
    },
    {
      id: 8,
      title: "Khám Phá Tâm Lý Học Đường- Hiểu Rõ Về Chính Mình",
      shortDesc: "Chương trình này giúp học sinh nắm bắt các yếu tố tác động đến tâm lý học đường, từ đó học cách đối phó với các vấn đề học tập và xã hội có thể ảnh hưởng đến sức khỏe tâm lý ... ",
      link: "/danh-gia/tam-ly-hoc-duong"
    }
  ];

  const handleServiceClick = (id: number) => {
    setSelectedService(selectedService === id ? null : id);  // Tắt hoặc bật mô tả
  };

  const handleViewMore = (link: string) => {
    navigate(link); // Điều hướng đến trang chi tiết
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
