import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../types/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import "./SurveyTypeManagement.scss";
import { Survey } from "../../types/Survey";

interface SurveyType {
  id: string;
  surveyName: string;
  isDelete: boolean;
}

interface EditSurveyForm {
  maxScore: number;
  surveyTypeId: string;
  surveyName: string;
}

const SurveyTypeManagement: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveyTypes, setSurveyTypes] = useState<SurveyType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { surveyTypeId } = useParams<{ surveyTypeId: string }>();

  // States for the unified popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [editForm, setEditForm] = useState<EditSurveyForm>({
    maxScore: 0,
    surveyTypeId: "",
    surveyName: ""
  });
  const [currentSurveyType, setCurrentSurveyType] = useState<SurveyType | null>(null);

  useEffect(() => {
    fetchSurveyTypes();
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5199/Survey");
      setSurveys(response.data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách khảo sát", toastConfig);
    }
  };

  const fetchSurveyTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5199/SurveyType");
      setSurveyTypes(response.data);
      return response.data; // Trả về danh sách survey types
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách loại khảo sát", toastConfig);
      return [];
    }
  };

  // Fetch a single survey by ID
  const fetchSurveyById = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5199/Survey/${id}`);
      return response.data;
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin khảo sát", toastConfig);
      return null;
    }
  };

  const mergedSurveys = surveys.map((survey) => {
    const surveyType = surveyTypes.find((type) => type.id === survey.surveyTypeId);
    return {
      ...survey,
      surveyName: surveyType ? surveyType.surveyName : "Không xác định",
    };
  });

  const filteredSurveys = mergedSurveys.filter((survey) =>
    survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open unified edit popup
  const openEditPopup = async (surveyId: string) => {
    const surveyData = await fetchSurveyById(surveyId);
    if (!surveyData) return;

    // Đợi fetchSurveyTypes() hoàn tất trước khi tìm
    const updatedSurveyTypes = await fetchSurveyTypes();
    console.log("Survey Data:", surveyData);
    console.log("Survey Types:", updatedSurveyTypes);

    const surveyType = updatedSurveyTypes.find((type: SurveyType) => type.id === surveyData.surveyTypeId);

    if (!surveyType) {
      toast.error("Không tìm thấy thông tin loại khảo sát", toastConfig);
      return;
    }

    setEditingSurvey(surveyData);
    setCurrentSurveyType(surveyType);

    setEditForm({
      maxScore: surveyData.maxScore,
      surveyTypeId: surveyData.surveyTypeId,
      surveyName: surveyType.surveyName
    });

    setShowEditPopup(true);
  };

  // Close the popup
  const closeEditPopup = () => {
    setShowEditPopup(false);
    setEditingSurvey(null);
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === "maxScore" ? Number(value) : value,
    });
  };

  // Submit the unified edit form
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSurvey) return;

    try {
      // Cập nhật survey (chỉ maxScore)
      await axios.put(`http://localhost:5199/Survey/${editingSurvey.id}`, {
        maxScore: editForm.maxScore
      });

      // Cập nhật surveyType (chỉ surveyName)
      await axios.put(`http://localhost:5199/SurveyType/${editForm.surveyTypeId}`, {
        surveyName: editForm.surveyName
      });

      toast.success("Cập nhật khảo sát thành công!", toastConfig);

      // Cập nhật lại danh sách khảo sát & loại khảo sát
      await fetchSurveys();
      await fetchSurveyTypes();

      closeEditPopup();
    } catch (error) {
      toast.error("Cập nhật khảo sát thất bại", toastConfig);
    }
  };

  const handleDelete = async (surveyId: string) => {
    try {
      await axios.delete(`http://localhost:5199/Survey/${surveyId}`);
      toast.success("Xóa khảo sát thành công!", toastConfig);
      fetchSurveys();
    } catch (error) {
      toast.error("Lỗi khi xóa khảo sát", toastConfig);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1>Quản Lý Khảo Sát</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm kiếm khảo sát..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="search-icon" />
      </div>

      <button onClick={() => navigate("/path/to/new-survey-page")}>Thêm Bài Khảo Sát</button>

      <table>
        <thead>
          <tr>
            <th>Tên Loại Khảo Sát</th>
            <th>Điểm tối đa</th>
            <th>Trạng Thái</th>
            <th>Thao tác</th>
            <th>Xem danh sách câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredSurveys.map((survey) => (
            <tr key={survey.id}>
              <td>{survey.surveyName}</td>
              <td>{survey.maxScore}</td>
              <td className={survey.isDeleted ? "inactive" : "active"}>
                {survey.isDeleted ? "Inactive" : "Active"}
              </td>
              <td className="actions">
                {!survey.isDeleted ? (
                  <>
                    <button onClick={() => openEditPopup(survey.id)}>
                      <FiEdit2 /> Chỉnh Sửa
                    </button>
                    <button className="delete" onClick={() => handleDelete(survey.id)}>
                      <FiTrash2 /> Xóa
                    </button>
                  </>
                ) : null}
              </td>
              <td className="QuestionList">
                <i
                  style={{ cursor: "pointer", fontStyle: "italic", color: "#007bff" }}
                  onClick={() => navigate(`survey-management/${survey.id}`)}
                >
                  View
                </i>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Unified Edit Popup Modal */}
      {showEditPopup && editingSurvey && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Chỉnh Sửa Khảo Sát</h2>
              <button className="close-button" onClick={closeEditPopup}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="surveyName">Tên loại khảo sát:</label>
                <input
                  type="text"
                  id="surveyName"
                  name="surveyName"
                  value={editForm.surveyName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxScore">Điểm tối đa:</label>
                <input
                  type="number"
                  id="maxScore"
                  name="maxScore"
                  value={editForm.maxScore}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">
                  Lưu
                </button>
                <button type="button" className="cancel-button" onClick={closeEditPopup}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyTypeManagement;