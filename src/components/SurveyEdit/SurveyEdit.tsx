import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../types/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import "./SurveyEdit.scss";

interface Answer {
  id: string;
  content: string;
  point: number;
}

interface Question {
  id: string;
  contentQ: string;
  answerList: Answer[];
}

const SurveyEdit: React.FC = () => {
  console.log("SurveyEdit component rendered");
  const { surveyId } = useParams<{ surveyId: string }>();
  const { SurveyQuestionId } = useParams<{ SurveyQuestionId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const navigate = useNavigate();

  // Question editing states
  const [editQuestionText, setEditQuestionText] = useState<string>("");

  // Answer editing states
  const [editAnswerText, setEditAnswerText] = useState<string>("");
  const [editAnswerPoint, setEditAnswerPoint] = useState<number>(0);

  // New answer states
  const [newAnswerContent, setNewAnswerContent] = useState<string>("");
  const [newAnswerPoint, setNewAnswerPoint] = useState<number>(0);
  const [addingAnswerToQuestionId, setAddingAnswerToQuestionId] = useState<string | null>(null);
  const [editingAnswerQuestionId, setEditingAnswerQuestionId] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect triggered with surveyId:", surveyId);
    if (!surveyId) {
      console.error("surveyId not found in params");
      toast.error("Không tìm thấy surveyId!", toastConfig);
      navigate("/survey-type-management");
      return;
    }

    fetchQuestions();
  }, [surveyId, navigate]);

  const fetchQuestions = async () => {
    console.log("Fetching questions for surveyId:", surveyId);
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5199/Survey/${surveyId}`);
      console.log("API response received:", response.data);
  
      if (!response.data.questionList) {
        console.error("API không trả về questionList!", response.data);
        toast.error("Dữ liệu khảo sát không hợp lệ", toastConfig);
        return;
      }
  
      // Lọc câu hỏi với isDelete = false
      const activeQuestions = response.data.questionList.filter((q: any) => q.isDelete === false);
      
      // Lọc câu trả lời với isDelete = false cho mỗi câu hỏi
      const formattedQuestions = activeQuestions.map((q: any) => ({
        ...q,
        answerList: (q.answerList || []).filter((a: any) => a.isDelete === false)
      }));
      
      console.log("Formatted questions (active only):", formattedQuestions);
  
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Lỗi khi lấy danh sách câu hỏi", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  // CRUD for Questions
  const handleAddQuestion = async () => {
    console.log("Adding new question:", newQuestion);
    if (!newQuestion.trim()) {
      console.warn("Empty question content");
      toast.error("Vui lòng nhập nội dung câu hỏi", toastConfig);
      return;
    }

    try {
      const requestData = [
        {
          contentQ: newQuestion,
          answersList: [] // Include empty answersList array
        }
      ];
      console.log("POST request data:", requestData);

      const response = await axios.post(`http://localhost:5199/api/SurveyQuestion/${surveyId}`, requestData);
      console.log("Add question response:", response.data);

      if (response.data) {
        toast.success("Thêm câu hỏi thành công", toastConfig);
        setNewQuestion("");
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Lỗi khi thêm câu hỏi", toastConfig);
    }
  };

  const startEditQuestion = (question: Question) => {
    console.log("Starting to edit question:", question);
    setEditingQuestionId(question.id);
    setEditQuestionText(question.contentQ);
  };

  const cancelEditQuestion = () => {
    console.log("Cancelling question edit");
    setEditingQuestionId(null);
    setEditQuestionText("");
  };

  const handleUpdateQuestion = async (SurveyQuestionId: string) => {
    console.log("Updating question with ID:", SurveyQuestionId);
    if (!editQuestionText.trim()) {
      console.warn("Empty edited question content");
      toast.error("Nội dung câu hỏi không được để trống", toastConfig);
      return;
    }

    try {
      const requestData = {
        contentQ: editQuestionText,
        isDelete: false
      };
      console.log("PUT request data:", requestData);

      const response = await axios.put(`http://localhost:5199/api/SurveyQuestion/${SurveyQuestionId}`, requestData);
      console.log("Update question response:", response.data);

      if (response.data) {
        toast.success("Cập nhật câu hỏi thành công", toastConfig);
        setEditingQuestionId(null);
        fetchQuestions();
      }
    } catch (error: any) {
      console.error("Error updating question:", error);
      if (error.response && error.response.data) {
        console.error("API error response:", error.response.data);
        toast.error(`Lỗi: ${error.response.data.message || JSON.stringify(error.response.data)}`, toastConfig);
      } else {
        toast.error("Lỗi khi cập nhật câu hỏi", toastConfig);
      }
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    console.log("Attempting to delete question with ID:", questionId);
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
      try {
        const response = await axios.delete(`http://localhost:5199/api/SurveyQuestion/${questionId}`);
        console.log("Delete question response:", response.data);
        toast.success("Xóa câu hỏi thành công", toastConfig);
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
        toast.error("Lỗi khi xóa câu hỏi", toastConfig);
      }
    }
  };

  // CRUD for Answers
  const startAddAnswer = (questionId: string) => {
    console.log("Starting to add answer to question ID:", questionId);
    setAddingAnswerToQuestionId(questionId);
    setNewAnswerContent("");
    setNewAnswerPoint(0);
  };

  const cancelAddAnswer = () => {
    console.log("Cancelling add answer");
    setAddingAnswerToQuestionId(null);
    setNewAnswerContent("");
    setNewAnswerPoint(0);
  };

  const handleAddAnswer = async (questionId: string) => {
    console.log("Adding answer to question ID:", questionId);
    if (!newAnswerContent.trim()) {
      console.warn("Empty answer content");
      toast.error("Vui lòng nhập nội dung câu trả lời", toastConfig);
      return;
    }

    try {
      const requestData = [
        {
          content: newAnswerContent,
          point: newAnswerPoint
        }
      ];
      console.log("POST answer request data:", requestData);

      const response = await axios.post(`http://localhost:5199/api/SurveyAnswer/${questionId}`, requestData);
      console.log("Add answer response:", response.data);

      if (response.data) {
        toast.success("Thêm câu trả lời thành công", toastConfig);
        setAddingAnswerToQuestionId(null);
        setNewAnswerContent("");
        setNewAnswerPoint(0);
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error adding answer:", error);
      toast.error("Lỗi khi thêm câu trả lời", toastConfig);
    }
  };

  const startEditAnswer = (answer: Answer, questionId: string) => {
    console.log("Starting to edit answer:", answer, "for question ID:", questionId);
    setEditingAnswerQuestionId(questionId);  // Sử dụng state mới
    setEditingAnswerId(answer.id);
    setEditAnswerText(answer.content);
    setEditAnswerPoint(answer.point);
  };


  const cancelEditAnswer = () => {
    console.log("Cancelling answer edit");
    setEditingAnswerQuestionId(null);
    setEditingAnswerId(null);
    setEditAnswerText("");
    setEditAnswerPoint(0);
  };

  const handleUpdateAnswer = async (questionId: string, answerId: string) => {
    console.log("Updating answer ID:", answerId, "for question ID:", questionId);
    if (!editAnswerText.trim()) {
      console.warn("Empty edited answer content");
      toast.error("Nội dung câu trả lời không được để trống", toastConfig);
      return;
    }

    try {
      const requestData = {
        content: editAnswerText,
        point: editAnswerPoint
      };
      console.log("PUT answer request data:", requestData);

      const response = await axios.put(`http://localhost:5199/api/SurveyAnswer/${answerId}`, requestData);
      console.log("Update answer response:", response.data);

      if (response.data) {
        toast.success("Cập nhật câu trả lời thành công", toastConfig);
        setEditingAnswerQuestionId(null);  // Sử dụng state mới
        setEditingAnswerId(null);
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error updating answer:", error);
      toast.error("Lỗi khi cập nhật câu trả lời", toastConfig);
    }
  };

  const handleDeleteAnswer = async (questionId: string, answerId: string) => {
    console.log("Attempting to delete answer ID:", answerId, "from question ID:", questionId);
    if (window.confirm("Bạn có chắc chắn muốn xóa câu trả lời này?")) {
      try {
        const response = await axios.delete(`http://localhost:5199/api/SurveyAnswer/${answerId}`);
        console.log("Delete answer response:", response.data);
        toast.success("Xóa câu trả lời thành công", toastConfig);
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting answer:", error);
        toast.error("Lỗi khi xóa câu trả lời", toastConfig);
      }
    }
  };

  if (loading) {
    console.log("Rendering loading state");
    return <div className="loading">Đang tải...</div>;
  }

  console.log("Rendering SurveyEdit with questions:", questions);
  return (
    <div className="survey-questions-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1>Quản Lý Câu Hỏi Khảo Sát</h1>

      {/* Add new question section */}
      <div className="add-question-section">
        <h2>Thêm Câu Hỏi Mới</h2>
        <div className="input-group">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Nhập nội dung câu hỏi mới..."
            className="form-control"
          />
          <button onClick={handleAddQuestion} className="add-btn">
            Thêm Câu Hỏi
          </button>
        </div>
      </div>

      {/* Questions list */}
      <div className="questions-list">
        <h2>Danh Sách Câu Hỏi</h2>
        {questions.length === 0 ? (
          <p>Chưa có câu hỏi nào.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="question-item">
              {/* Question section */}
              <div className="question-header">
                {editingQuestionId === question.id ? (
                  <div className="edit-question-form">
                    <input
                      type="text"
                      value={editQuestionText}
                      onChange={(e) => setEditQuestionText(e.target.value)}
                      className="form-control"
                    />
                    <div className="button-group">
                      <button
                        onClick={() => handleUpdateQuestion(question.id)}
                        className="save-btn"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={cancelEditQuestion}
                        className="cancel-btn"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="question-content">
                    <h3>{question.contentQ}</h3>
                    <div className="question-actions">
                      <button
                        onClick={() => startEditQuestion(question)}
                        className="edit-btn"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="delete-btn"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => startAddAnswer(question.id)}
                        className="add-answer-btn"
                      >
                        Thêm Câu Trả Lời
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Add new answer form */}
              {addingAnswerToQuestionId === question.id && (
                <div className="add-answer-form">
                  <h4>Thêm câu trả lời mới</h4>
                  <div className="input-group">
                    <input
                      type="text"
                      value={newAnswerContent}
                      onChange={(e) => setNewAnswerContent(e.target.value)}
                      placeholder="Nội dung câu trả lời"
                      className="form-control"
                    />
                    <input
                      type="number"
                      value={newAnswerPoint}
                      onChange={(e) => setNewAnswerPoint(Number(e.target.value))}
                      placeholder="Điểm"
                      className="form-control small"
                    />
                    <div className="button-group">
                      <button
                        onClick={() => handleAddAnswer(question.id)}
                        className="save-btn"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={cancelAddAnswer}
                        className="cancel-btn"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Answer list */}
              <div className="answers-list">
                <h4>Danh sách câu trả lời:</h4>
                {question.answerList && question.answerList.length > 0 ? (
                  <ul>
                    {question.answerList.map((answer) => (
                      <li key={answer.id} className="answer-item">
                        {editingAnswerQuestionId === question.id && editingAnswerId === answer.id ? (
                          <div className="edit-answer-form">
                            <input
                              type="text"
                              value={editAnswerText}
                              onChange={(e) => setEditAnswerText(e.target.value)}
                              className="form-control"
                            />
                            <input
                              type="number"
                              value={editAnswerPoint}
                              onChange={(e) => setEditAnswerPoint(Number(e.target.value))}
                              className="form-control small"
                            />
                            <div className="button-group">
                              <button
                                onClick={() => handleUpdateAnswer(question.id, answer.id)}
                                className="save-btn"
                              >
                                Lưu
                              </button>
                              <button
                                onClick={cancelEditAnswer}
                                className="cancel-btn"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="answer-content">
                            <span>{answer.content} - <strong>Điểm:</strong> {answer.point}</span>
                            <div className="answer-actions">
                              <button
                                onClick={() => startEditAnswer(answer, question.id)}
                                className="edit-btn small"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteAnswer(question.id, answer.id)}
                                className="delete-btn small"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-answers">Chưa có câu trả lời nào</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate("/manage")} className="back-button">
        Quay lại
      </button>
    </div>
  );
};

export default SurveyEdit;