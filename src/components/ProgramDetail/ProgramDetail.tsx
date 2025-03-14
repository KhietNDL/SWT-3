import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./ProgramDetail.scss";

const UNSPLASH_ACCESS_KEY = "lKeuedjOVx61M-ThaCZzVH7Jctq7kukuK9BqecOzv-w"; // Thay bằng API Key của bạn

function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programData, setProgramData] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Lấy dữ liệu chương trình từ API
    fetch(`http://localhost:5199/Subscription/${id}`)
      .then((res) => res.json())
      .then((data) => setProgramData(data))
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));

    // Lấy hình ảnh ngẫu nhiên từ Unsplash API
    fetch(`https://api.unsplash.com/photos/random?query=education,children&client_id=${UNSPLASH_ACCESS_KEY}`)
      .then((res) => res.json())
      .then((data) => setImageUrl(data.urls.regular))
      .catch(() => setImageUrl("/default-image.jpg"));
  }, [id]);

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
    const orderId = "123"; // Tạm thời dùng ID giả
    navigate(`/order-detail/${orderId}`);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  if (!programData) return <p>Loading...</p>;

  return (
    <div className="program-detail-page">
      <Header />
      <main className="program-detail-content">
        <div className="program-detail-hero">
          <img src={imageUrl} alt="Program" />
        </div>

        <div className="program-title">
          <h1>{programData.subscriptionName}</h1>
          <p>Chuyên gia: {programData.psychologistName}</p>
          <p>Danh mục: {programData.categoryName}</p>
        </div>

        <div className="program-description">
          <p>{programData.description}</p>
        </div>

        <div className="program-detail-sections">
          <div className="detail-section">
            <div className="section-header" onClick={() => toggleSection("purpose")}>
              <h2>Mục đích</h2>
              {expandedSections.includes("purpose") ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.includes("purpose") && (
              <div className="section-content">
                <p>{programData.purpose}</p>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div className="section-header" onClick={() => toggleSection("criteria")}>
              <h2>Các chỉ số đánh giá</h2>
              {expandedSections.includes("criteria") ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.includes("criteria") && (
              <div className="section-content">
                <p>{programData.criteria}</p>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div className="section-header" onClick={() => toggleSection("focusGroup")}>
              <h2>Nhóm đối tượng</h2>
              {expandedSections.includes("focusGroup") ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.includes("focusGroup") && (
              <div className="section-content">
                <p>{programData.focusGroup}</p>
              </div>
            )}
          </div>

          <div className="detail-section">
            <div className="section-header" onClick={() => toggleSection("assessmentTool")}>
              <h2>Công cụ đánh giá</h2>
              {expandedSections.includes("assessmentTool") ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.includes("assessmentTool") && (
              <div className="section-content">
                <p>{programData.assessmentTool}</p>
              </div>
            )}
          </div>
        </div>

        <div className="program-detail-footer">
          <p className="duration">Thời gian liệu trình: {programData.duration} ngày</p>
          <p className="price">Giá: ${programData.price.toFixed(2)}</p>
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
