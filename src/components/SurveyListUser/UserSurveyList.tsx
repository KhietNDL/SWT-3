import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiSearch, FiClipboard, FiRefreshCw } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./UserSurveyList.scss";
import { Survey } from "../../types/Survey";
import { SurveyType } from "../../types/SurveyType";
import { toastService } from "../../types/toastConfig";

const UserSurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveSurveys();
  }, []);

  const fetchActiveSurveys = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5199/Survey");
      // Lọc chỉ lấy các khảo sát còn hoạt động (không bị xóa)
      const activeSurveys = response.data.filter((survey: Survey) => !survey.isDeleted);
      
      // Lấy thông tin loại khảo sát
      const typesResponse = await axios.get("http://localhost:5199/SurveyType");
      const surveyTypes = typesResponse.data;
      
      // Gộp thông tin khảo sát với tên loại khảo sát
      const mergedSurveys = activeSurveys.map((survey: Survey) => {
        // Convert both IDs to strings to ensure proper comparison
        const surveyType = surveyTypes.find((type: SurveyType) => 
          String(type.id) === String(survey.surveyTypeId)
        );
        
        return {
          ...survey,
          surveyName: surveyType ? surveyType.surveyName : "Không xác định"
        };
      });
      
      setSurveys(mergedSurveys);
      toastService.success("Đã tải danh sách khảo sát thành công");
    } catch (error) {
      console.error("Error fetching surveys:", error);
      toastService.error("Không thể tải danh sách khảo sát. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const startSurvey = (survey: Survey) => {
    if (survey && survey.id) {
      navigate(`/take-survey/${survey.id}`);
    } else {
      toastService.error("Không thể bắt đầu khảo sát. ID khảo sát không tồn tại.");
    }
  };

  const filteredSurveys: Survey[] = surveys.filter((survey: Survey) =>
    survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-survey-list">
      {/* Mỗi component có ToastContainer riêng */}
      <ToastContainer />
      
      <div className="survey-header">
        <h1>Danh Sách Khảo Sát</h1>
        <div className="controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm khảo sát..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchActiveSurveys} 
            className="refresh-button"
            disabled={isLoading}
          >
            <FiRefreshCw className={isLoading ? "spinning" : ""} />
            Làm mới
          </button>
        </div>
      </div>
      
      <div className="survey-list">
        {isLoading ? (
          <div className="loading-message">Đang tải danh sách khảo sát...</div>
        ) : filteredSurveys.length === 0 ? (
          <div className="empty-message">
            <FiClipboard className="empty-icon" />
            <p>Không có khảo sát nào hiện tại</p>
          </div>
        ) : (
          <div className="survey-grid">
            {filteredSurveys.map((survey) => (
              <div className="survey-card" key={survey.id}>
                <div className="survey-info">
                  <h3>{survey.surveyName}</h3>
                  <p>Điểm tối đa: {survey.maxScore}</p>
                </div>
                <button
                  className="start-button"
                  onClick={() => startSurvey(survey)}
                >
                  Làm bài
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSurveyList;