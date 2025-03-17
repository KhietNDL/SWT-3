import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TakeSurvey.scss";

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

interface SurveyData {
  id: string;
  surveyTypeId: string;
  surveyName: string;
  maxScore: number;
  questionList: Question[];
}

const TakeSurvey = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // if (!surveyId) {
    //   toast.error("Không tìm thấy mã khảo sát!");
    //   navigate("/survey");
    //   return;
    // }

    fetchSurveyData();
  }, [surveyId, navigate]);

  const fetchSurveyData = async () => {
    try {
      setLoading(true);

      // Lấy thông tin khảo sát
      const surveyResponse = await axios.get(`http://localhost:5199/Survey/${surveyId}`);
      console.log("Danh sách surveyResponse:", surveyResponse);

      // Lấy thông tin loại khảo sát để có tên khảo sát
      const surveyTypeResponse = await axios.get(`http://localhost:5199/SurveyType/${surveyResponse.data.surveyTypeId}`);
      console.log("Danh sách surveyTypeResponse:", surveyTypeResponse);

      const surveyData = {
        ...surveyResponse.data,
        surveyName: surveyTypeResponse.data.surveyName
      };

      if (!surveyData.questionList || surveyData.questionList.length === 0) {
        toast.error("Khảo sát này chưa có câu hỏi!");
        navigate("/survey");
        return;
      }

      setSurvey(surveyData);
    } catch (error) {
      console.error("Error fetching survey:", error);
      toast.error("Có lỗi xảy ra khi tải dữ liệu khảo sát!");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };

  const handleNext = () => {
    const currentQuestionId = survey?.questionList[currentQuestion].id;

    if (!currentQuestionId || !selectedAnswers[currentQuestionId]) {
      toast.warning("Vui lòng chọn một câu trả lời trước khi tiếp tục!");
      return;
    }

    if (currentQuestion < (survey?.questionList.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    if (!survey) return;

    let totalScore = 0;

    // Tính điểm dựa trên câu trả lời đã chọn
    Object.keys(selectedAnswers).forEach(questionId => {
      const answerId = selectedAnswers[questionId];
      const question = survey.questionList.find(q => q.id === questionId);
      const answer = question?.answerList.find(a => a.id === answerId);

      if (answer) {
        totalScore += answer.point;
      }
    });

    setScore(totalScore);
    setIsCompleted(true);

    // Có thể gửi kết quả lên server ở đây
    saveResult(totalScore);
  };

  const saveResult = async (totalScore: number) => {
    try {
      // Giả định API lưu kết quả (có thể điều chỉnh theo API thực tế)
      await axios.post('http://localhost:5199/SurveyResult', {
        surveyId: surveyId,
        userId: "user-id", // Có thể lấy từ đăng nhập
        score: totalScore,
        completedDate: new Date().toISOString(),
        answers: Object.keys(selectedAnswers).map(questionId => ({
          questionId,
          answerId: selectedAnswers[questionId]
        }))
      });

    } catch (error) {
      console.error("Error saving result:", error);
      toast.error("Có lỗi xảy ra khi lưu kết quả!");
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setIsCompleted(false);
    setScore(0);
  };

  const handleBackToList = () => {
    navigate("/survey");
  };

  if (loading) {
    return <div className="loading-container">
      <div className="loader"></div>
      <p>Đang tải khảo sát...</p>
    </div>;
  }

  if (!survey) {
    return <div className="error-container">
      <h2>Không tìm thấy khảo sát</h2>
      <button onClick={handleBackToList} className="btn-primary">Quay lại danh sách</button>
    </div>;
  }

  if (isCompleted) {
    return (
      <div className="take-survey-container">
        <div className="result-container">
          <h1>Kết quả khảo sát</h1>
          <h2>{survey.surveyName}</h2>

          <div className="score-display">
            <div className="score-circle">
              <span className="score-value">{score}</span>
              <span className="score-max">/{survey.maxScore}</span>
            </div>
          </div>

          <div className="score-message">
            {score >= survey.maxScore * 0.8 && (
              <p>Xuất sắc! Bạn đã hoàn thành bài khảo sát với kết quả rất cao.</p>
            )}
            {score >= survey.maxScore * 0.6 && score < survey.maxScore * 0.8 && (
              <p>Tốt! Bạn đã hoàn thành bài khảo sát với kết quả khá.</p>
            )}
            {score < survey.maxScore * 0.6 && (
              <p>Cảm ơn bạn đã hoàn thành bài khảo sát.</p>
            )}
          </div>

          <div className="result-actions">
            <button onClick={handleRetake} className="btn-secondary">Làm lại</button>
            <button onClick={handleBackToList} className="btn-primary">Quay lại danh sách</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = survey.questionList[currentQuestion];

  return (
    <div className="take-survey-container">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="survey-header">
        <h1>{survey.surveyName}</h1>
        <div className="progress-container">
          <div className="progress-text">
            Câu hỏi {currentQuestion + 1}/{survey.questionList.length}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / survey.questionList.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestionData.contentQ}</h2>

        <div className="answers-container">
          {currentQuestionData.answerList.map((answer) => (
            <div
              key={answer.id}
              className={`answer-option ${selectedAnswers[currentQuestionData.id] === answer.id ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentQuestionData.id, answer.id)}
            >
              <div className="answer-radio">
                <div className="radio-inner"></div>
              </div>
              <div className="answer-text">{answer.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="survey-navigation">
        <button
          onClick={handlePrevious}
          className="btn-secondary"
          disabled={currentQuestion === 0}
        >
          Câu trước
        </button>

        <button
          onClick={handleNext}
          className="btn-primary"
        >
          {currentQuestion === survey.questionList.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
        </button>
      </div>
    </div>
  );
};

export default TakeSurvey;