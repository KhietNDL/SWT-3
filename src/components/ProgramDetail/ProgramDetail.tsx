import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./ProgramDetail.scss";
import childImg from "../../images/child-development.jpg";

function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleRegister = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
  
    const orderId = "123"; // ⚠ Tạm thời dùng ID giả, sau này thay bằng API
    navigate(`/order-detail/${orderId}`); // ✅ Truyền ID khi điều hướng
  };
  

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const isSectionExpanded = (section: string) => {
    return expandedSections.includes(section);
  };

  return (
    <div className="program-detail-page">
      <Header />

      <main className="program-detail-content">
        <div className="program-detail-hero">
          <img src={childImg} alt="Child Development" />
        </div>

        <div className="program-title">
          <h1>Giải Tỏa Lo Âu- Hướng Tới Tương Lai Tươi Sáng</h1>
        </div>

        <div className="program-description">
          <p>
            Trong bối cảnh học đường ngày càng trở nên căng thẳng, với những yêu cầu và kỳ vọng ngày càng cao, không ít học sinh cảm thấy lo âu, áp lực và khó khăn trong việc quản lý cảm xúc của bản thân. Điều này có thể ảnh hưởng đến sức khỏe tâm lý, cũng như kết quả học tập và phát triển cá nhân của các em.
            </p>
          <p>
            Chương trình "Giải Tỏa Lo Âu - Hướng Tới Tương Lai Tươi Sáng" được thiết kế đặc biệt để giúp học sinh giảm bớt lo âu , cải thiện khả năng quản lý căng thẳng và xây dựng những kỹ năng sống thiết yếu. Thông qua tư vấn chuyên sâu và các kỹ thuật thư gianx hiểuj quả, các em sẽ được trang bị những công cụ để đối phó với aps lực trong học tập cũng như cuộc sống.
          </p>
            
          <p>
            Chúng tôi hiểu rằng sự phát triển toàn diện không chỉ dựa vào kết quả học tập mà còn phụ thuộc vào sức khỏe tinh thần. Vì vậy, chương trình này không chỉ giúp học sinh nâng cao khả năng kiểm soát cảm xúc, mà còn hỗ trợ các em phát triển tự tin hơn, dễ dàng vượt qua các thử thách trong cuộc sống.
          </p>
          <p>
            Với sự đồng hành của các chuyên gia tâm lý hàng đầu, chương trình sẽ giúp học sinh thoải mái hơn trong môi trường học đường, từ đó mở ra những cơ hội tốt đẹp hơn cho tương lai của các em 
          </p>
        </div>

        <div className="program-detail-sections">
          <div className="detail-section">
            <div
              className="section-header"
              onClick={() => toggleSection("purpose")}
            >
              <h2>Mục đích</h2>
              {isSectionExpanded("purpose") ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {isSectionExpanded("purpose") && (
              <div className="section-content">
                <p>Mục tiêu của chương trình là giảm lo âu và cải thiện khả năng quản lý căng thẳng của học sinh, giúp các em học sinh trở nên tự tin hơn trong học tập và cuộc sống.</p>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div
              className="section-header"
              onClick={() => toggleSection("indicators")}
            >
              <h2>Các chỉ số đánh giá</h2>
              {isSectionExpanded("indicators") ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {isSectionExpanded("indicators") && (
              <div className="section-content">
                <ul>
                  <li>Chỉ số lo âu học đường</li>
                  <li>Chỉ số căng thẳng và stress</li>
                  <li>Chỉ số khả năng đối phó với khó khăn</li>
                  <li>Chỉ số tự tin và khả năng giải quyết vấn đề</li>
                </ul>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div
              className="section-header"
              onClick={() => toggleSection("target")}
            >
              <h2>Đối tượng</h2>
              {isSectionExpanded("target") ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {isSectionExpanded("target") && (
              <div className="section-content">
                <p>Chương trình này dành cho học sinh từ 12-18 tuổi, đặt biệt là những em gặp phải lo âu, căng thẳng trong môi trường và có nhu cầu cải thiện kỹ năng quản lý cảm xúc, giảm lo âu.</p>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div
              className="section-header"
              onClick={() => toggleSection("tools")}
            >
              <h2>Công cụ đánh giá</h2>
              {isSectionExpanded("tools") ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {isSectionExpanded("tools") && (
              <div className="section-content">
                <ul>
                  <li>Bộ công cụ đánh giá lo âu học đường</li>
                  <li>Bài tập thư giãn và kỹ thuật thở </li>
                  <li>Bảng câu hỏi tự đánh giá mức độ căng thẳng</li>
                  <li>Hướng dẫn thực hành tự quản lý cảm xúc</li>
                </ul>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div
              className="section-header"
              onClick={() => toggleSection("experts")}
            >
              <h2>Các chuyên gia</h2>
              {isSectionExpanded("experts") ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {isSectionExpanded("experts") && (
              <div className="section-content">
                <ul>
                  <li>Chuyên gia tâm lý học đường</li>
                  <li>Chuyên gia tư vấn sức khỏe tâm lý trẻ em</li>
                  <li>Chuyên gia đào tạo kỹ năng sống cho học sinh</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="program-detail-footer">
          <p className="duration">Thời gian liệu trình: 4-6 tuần</p>
          <button className="register-button" onClick={handleRegister}>
            Đăng ký
          </button>
        </div>

        <Modal
          title="Xác nhận đăng ký"
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <p>Bạn có chắc là sẽ mua gói này không?</p>
        </Modal>
      </main>

      <Footer />
    </div>
  );
}

export default ProgramDetail;
