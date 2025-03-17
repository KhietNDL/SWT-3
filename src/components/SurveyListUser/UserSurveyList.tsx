import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiSearch, FiClipboard } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./UserSurveyList.scss";
import { Survey } from "../../types/Survey";
import { SurveyType } from "../../types/SurveyType";
const UserSurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveSurveys();
  }, []);

  const fetchActiveSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5199/Survey");
      // Lọc chỉ lấy các khảo sát còn hoạt động (không bị xóa)
      const activeSurveys = response.data.filter((survey: Survey) => !survey.isDeleted);
      
      // Lấy thông tin loại khảo sát
      const typesResponse = await axios.get("http://localhost:5199/SurveyType");
      const surveyTypes = typesResponse.data;
      
      // Gộp thông tin khảo sát với tên loại khảo sát
      const mergedSurveys = activeSurveys.map((survey: Survey) => {
        const surveyType = surveyTypes.find((type: SurveyType) => type.id === survey.surveyTypeId);
        return {
          ...survey,
          surveyName: surveyType ? surveyType.surveyName : "Không xác định"
        };
      });
  
      setSurveys(mergedSurveys);
  
      // Cải thiện console.log
      console.log("Danh sách Survey:", mergedSurveys);
    } catch (error) {
      toast.error("Không thể tải danh sách khảo sát. Vui lòng thử lại sau.");
    }
  };
  

  const startSurvey = (surveyId: string) => {
    console.log("Survey đã chọn có ID là:", surveyId);
    navigate(`/take-survey/${surveyId}`);
  };

  const filteredSurveys: Survey[] = surveys.filter((survey: Survey) =>
    survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-survey-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="header">
        <h1>Danh Sách Khảo Sát</h1>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm khảo sát..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredSurveys.length === 0 ? (
        <div className="empty-state">
          <p>Không có khảo sát nào hiện tại</p>
        </div>
      ) : (
        <div className="survey-grid">
          {filteredSurveys.map((survey) => (
            <div className="survey-card" key={survey.id}>
              <div className="survey-info">
                <h2>{survey.surveyName}</h2>
                <p className="survey-score">Điểm tối đa: {survey.maxScore}</p>
              </div>
              <button 
                className="take-survey-btn"
                onClick={() => startSurvey(survey.id)}
              >
                <FiClipboard className="icon" /> 
                Làm bài
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSurveyList;