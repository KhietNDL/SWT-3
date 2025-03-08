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
    navigate("/payment"); // hoặc trang đích khác
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
          <h1>Đánh giá sự phát triển</h1>
        </div>

        <div className="program-description">
          <p>
            Sự phát triển với tốc độ nhanh và đầy biến động của thời đại 4.0,
            cùng với yêu cầu ngày càng cao của nhà trường và những bất cập trong
            thực tiễn giáo dục; Sự kì vọng của cha mẹ, thầy cô đang tạo ra những
            áp lực rất lớn và gây căng thẳng trong cuộc sống, học tập và quá
            trình phát triển của trẻ em. Mặt khác, sự hiểu biết của cha mẹ bận
            rộn cũng như kỹ năng sống của các em vẫn còn hạn chế trong giao tiếp
            rộng rãi.
          </p>
          <p>
            Thực tế cho thấy trẻ em hiện nay dễ gặp những rối nhiễu cảm xúc (Lo
            âu, trầm cảm…), rối loạn phát triển (tự kỷ, chậm phát triển, khó
            khăn ngôn ngữ giao tiếp), các khó khăn học tập (như đọc, viết, tính
            toán…), những rối loạn về hành vi (chống đối, bỏ học, trốn cắp, hung
            tính…) mà bản thân không hề biết.
          </p>
          <p>
            Ngoài ra, việc khám phá và hiểu rõ năng lực bản thân, định hướng
            nghề nghiệp phù hợp giúp cho trẻ có thể phát triển toàn diện hơn,
            giúp người học định hướng được nghề nghiệp phù hợp với năng lực của
            bản thân và nhu cầu của thị trường lao động, từ đó có kế hoạch để
            quyết định lựa chọn con đường học tập phù hợp với bản thân mình
            trong tương lai.
          </p>
          <p>
            Vì vậy, Viện Tâm lý Giáo dục BrainCare thiết kế chương trình Đánh
            giá sức khỏe tâm lý toàn diện. Phát hiện và tầm soát các nhân cách
            và tính khí của trẻ em, nhằm Đánh giá Nhận cách và Định giá Trí tuệ
            cảm xúc giúp hướng nghề nghiệp trong tương lai nhằm phát triển toàn
            diện các trường hợp trẻ em gặp khó khăn, phát hiện khả năng tiềm
            tàng của cá nhân và mang lại sự thành công, hòa nhập xã hội, hạnh
            phúc hơn.
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
                <p>
                  Đánh giá toàn diện sự phát triển của trẻ, phát hiện sớm các
                  khó khăn và có biện pháp can thiệp kịp thời.
                </p>
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
                  <li>Chỉ số phát triển nhận thức</li>
                  <li>Chỉ số phát triển ngôn ngữ</li>
                  <li>Chỉ số phát triển vận động</li>
                  <li>Chỉ số phát triển cảm xúc xã hội</li>
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
                <p>Trẻ em từ 2-18 tuổi có nhu cầu đánh giá sự phát triển.</p>
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
                  <li>Bộ công cụ đánh giá chuẩn hóa quốc tế</li>
                  <li>Phiếu quan sát hành vi</li>
                  <li>Bảng hỏi dành cho phụ huynh</li>
                  <li>Bài tập đánh giá theo độ tuổi</li>
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
                  <li>Chuyên gia tâm lý trẻ em</li>
                  <li>Chuyên gia đánh giá phát triển</li>
                  <li>Chuyên gia giáo dục đặc biệt</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="program-detail-footer">
          <p className="duration">Thời gian liệu trình: 3-6 tuần</p>
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
