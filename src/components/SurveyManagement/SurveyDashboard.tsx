import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Survey } from "../../types/Survey";
import { Question } from "../../types/Question"; 
import { Answer } from "../../types/Answer"; 
import { SurveyType } from "../../types/SurveyType";
import "./SurveyDashboard.scss";

interface SurveyDashboardProps {
  surveyTypes: SurveyType[];
  selectedSurveyTypeId: string; // ID của SurveyType được chọn từ survey-type-management
}

const SurveyDashboard: React.FC<SurveyDashboardProps> = ({ surveyTypes, selectedSurveyTypeId }) => {
  const [surveyId, setSurveyId] = useState<string>("");
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Lấy danh sách tất cả surveys để tìm surveyId phù hợp
  const getAllSurvey = async (selectedSurveyTypeId: string) => {
    try {
      const surveyResponse = await axios.get("http://localhost:5199/Survey");
      const surveys: Survey[] = surveyResponse.data;
  
      // 🔍 Tìm survey có surveyTypeId khớp với selectedSurveyTypeId
      const selectedSurvey = surveys.find(s => s.surveyTypeId === selectedSurveyTypeId);
  
      if (selectedSurvey) {
        setSurveyId(selectedSurvey.id); // Cập nhật surveyId hợp lệ
      } else {
        console.warn("Không tìm thấy survey nào phù hợp với surveyTypeId:", selectedSurveyTypeId);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách survey", error);
    }
  };
  
  

  // Khi có surveyId, lấy chi tiết survey
  const fetchSurveyDetails = async () => {
    if (!surveyId) return;
    try {
      const response = await axios.get(`http://localhost:5199/Survey/${surveyId}`);
      setSurvey(response.data);
      setQuestions(response.data.questionList);
    } catch (error) {
      console.error("Error fetching survey details", error);
    }
  };

  useEffect(() => {
    if (surveyTypes.length > 0) {
      const selectedSurveyTypeId = surveyTypes.find(st => st.id === surveyId)?.id;
      if (selectedSurveyTypeId) {
        getAllSurvey(selectedSurveyTypeId);
      }
    }
  }, [surveyTypes]);
  // Chạy khi surveyTypeId thay đổi

  useEffect(() => {
    if (surveyId) {
      fetchSurveyDetails();
    }
  }, [surveyId]); // Chạy khi surveyId được cập nhật

  const handleCreateSurvey = async () => {
    if (!surveyId) {
      console.error("❌ Survey ID is undefined, cannot update survey.");
      return;
    }
  
    try {
      await axios.put(`http://localhost:5199/admin/surveys/${surveyId}`, surveyData);
      alert("✅ Survey updated successfully!");
    } catch (error) {
      console.error("❌ Error updating survey", error);
    }
  };
  

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleChangeQuestion = (index: number, field: keyof Question, value: string | boolean) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleChangeAnswer = (qIndex: number, aIndex: number, field: keyof Answer, value: string | number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answersList[aIndex] = {
      ...updatedQuestions[qIndex].answersList[aIndex],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  
  
  const handleAddQuestion = () => {
    setQuestions([...questions, { id: "", contentQ: "", options: "", validity: false, answersList: [] }]);
  };
  
  const surveyData = {
    surveyTypeId: survey?.surveyTypeId,
    maxScore: survey?.maxScore,
    questionList: questions.map(q => ({
      id: q.id,
      contentQ: q.contentQ,
      options: q.options,
      validity: q.validity,
      answersList: q.answersList.map(a => ({
        id: a.id,
        content: a.content,
        point: a.point,
      })),
    })),
  };

  return (
    <div className="survey-dashboard">
      <h1>Edit Survey: {survey?.surveyName || "Loading..."}</h1>

      <label>Max Score:</label>
      <input
        type="number"
        value={survey?.maxScore || 0}
        onChange={(e) => survey && setSurvey({ ...survey, maxScore: Number(e.target.value) })}
      />

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question">
          <label>Question:</label>
          <input
            type="text"
            value={question.contentQ}
            onChange={(e) => handleChangeQuestion(questionIndex, "contentQ", e.target.value)}
          />
          <label>Options (comma separated):</label>
          <input
            type="text"
            value={question.options}
            onChange={(e) => handleChangeQuestion(questionIndex, "options", e.target.value)}
          />
          {question.answersList.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>Answer:</label>
              <input
                type="text"
                value={answer.content}
                onChange={(e) => handleChangeAnswer(questionIndex, answerIndex, "content", e.target.value)}
              />
              <label>Score:</label>
              <input
                type="number"
                value={answer.point}
                onChange={(e) => handleChangeAnswer(questionIndex, answerIndex, "point", Number(e.target.value))}
              />
            </div>
          ))}
          <button onClick={() => handleRemoveQuestion(questionIndex)}>Remove Question</button>
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>

      <motion.button whileHover={{ scale: 1.02 }} onClick={handleCreateSurvey}>
        Save Survey
      </motion.button>
    </div>
  );
};

export default SurveyDashboard;
