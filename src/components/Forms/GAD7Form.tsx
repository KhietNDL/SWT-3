import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./GAD7Form.scss";
import { questions } from "../../types/GAD7Ques";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Modal } from "antd";

const GAD7Form = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));

  if (id !== "1") {
    return (
      <div className="error-message">
        <h2>Lỗi: Không có form cho bài kiểm tra này.</h2>
        <p>Bài kiểm tra bạn yêu cầu không tồn tại. Vui lòng chọn lại.</p>
      </div>
    );
  }

  const handleChange = (index: number, value: number) => {
    
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (!user) {
      Modal.warning({
        title: "Yêu cầu đăng nhập",
        content: "Vui lòng đăng nhập để đặt lịch khám.",
        okText: "Đăng nhập ngay",
        onOk: () => navigate("/login"),
      });
    } else {
    event.preventDefault();
    const totalScore = responses.reduce((acc, val) => acc + val, 0);
    localStorage.setItem('gad7Score', totalScore.toString());
    window.location.href = '/survey_result';
    }
  };

  

  return (
    <form className="gad7-form" onSubmit={handleSubmit}>
      <h2>Bảng Đánh Giá Lo Âu GAD-7</h2>
      {questions.map((question, index) => (
        <div key={index} className="question">
          <label>{question}</label>
          <select onChange={(e) => handleChange(index, Number(e.target.value))} defaultValue={0}>
            <option value={0}>Không bao giờ</option>
            <option value={1}>Vài ngày</option>
            <option value={2}>Hơn một nửa số ngày</option>
            <option value={3}>Gần như mỗi ngày</option>
          </select>
        </div>
      ))}
      <button type="submit">Xem kết quả khảo sát</button>
    </form>
  );
};

export default GAD7Form;