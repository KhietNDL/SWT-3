import { useState, useReducer, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiGrid } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SurveyCreationForm.scss";

interface Survey {
  id: string; // GUID dưới dạng chuỗi
  surveyTypeId: string; // GUID dưới dạng chuỗi
  title: string;
  maxScore: number;
}
interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  text: string;
  score: number;
}

interface SurveyState {
  title: string;
  maxScore: number;
  questions: Question[];
}

const initialState: SurveyState = {
  title: "",
  maxScore: 100,
  questions: []
};

type SurveyAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_MAX_SCORE"; payload: number }
  | { type: "ADD_QUESTION" }
  | { type: "UPDATE_QUESTION"; payload: { id: number; text: string } }
  | { type: "DELETE_QUESTION"; payload: number }
  | { type: "ADD_ANSWER"; payload: number }
  | { type: "UPDATE_ANSWER"; payload: { questionId: number; answerId: number; text?: string; score?: number } }
  | { type: "DELETE_ANSWER"; payload: { questionId: number; answerId: number } }
  | { type: "REORDER_QUESTIONS"; payload: { sourceIndex: number; destinationIndex: number } };

const surveyReducer = (state: SurveyState, action: SurveyAction): SurveyState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_MAX_SCORE":
      return { ...state, maxScore: action.payload };
    case "ADD_QUESTION":
      return {
        ...state,
        questions: [...state.questions, { id: Date.now(), text: "", answers: [] }]
      };
    case "UPDATE_QUESTION":
      return {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.id ? { ...q, text: action.payload.text } : q
        )
      };
    case "DELETE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.payload)
      };
    case "ADD_ANSWER":
      return {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload
            ? { ...q, answers: [...q.answers, { id: Date.now(), text: "", score: 0 }] }
            : q
        )
      };
    case "UPDATE_ANSWER":
      return {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.questionId
            ? {
              ...q,
              answers: q.answers.map(a =>
                a.id === action.payload.answerId
                  ? { ...a, text: action.payload.text ?? a.text, score: action.payload.score ?? a.score }
                  : a
              )
            }
            : q
        )
      };
    case "DELETE_ANSWER":
      return {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.questionId
            ? { ...q, answers: q.answers.filter(a => a.id !== action.payload.answerId) }
            : q
        )
      };
    case "REORDER_QUESTIONS": {
      const questions = Array.from(state.questions);
      const [removed] = questions.splice(action.payload.sourceIndex, 1);
      questions.splice(action.payload.destinationIndex, 0, removed);
      return { ...state, questions };
    }
    default:
      return state;
  }
};

const SurveyDashboard = () => {
  const { surveyTypeId } = useParams(); // Sửa lỗi useParams
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>([]);
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        // Lấy danh sách surveys
        const surveyResponse = await axios.get("http://localhost:5199/Survey");
        setSurveys(surveyResponse.data);
    
        // Lấy danh sách survey types
        const surveyTypeResponse = await axios.get("http://localhost:5199/SurveyType");
    
        // Tìm survey type tương ứng
        const surveyType = surveyTypeResponse.data.find(
          (type: { id: string }) => type.id === surveyTypeId
        );

          // Đặt Title là surveyName lấy từ API
        if (surveyType) {
          dispatch({ type: "SET_TITLE", payload: surveyType.surveyName });
        }
    
        // Lọc survey có surveyTypeId khớp với surveyTypeId hiện tại
        const matchingSurveys = surveyResponse.data.filter(
          (survey: Survey) => survey.surveyTypeId === surveyTypeId
        );
    
        setFilteredSurveys(matchingSurveys);

        // Đặt Max Score là maxScore lấy từ API
        const takeMaxScore = surveyResponse.data.find(
          (survey: { surveyTypeId: string }) => survey.surveyTypeId === surveyTypeId
        );
        
        if (takeMaxScore) {
          dispatch({ type: "SET_MAX_SCORE", payload: takeMaxScore.maxScore });
        }

      } catch (error) {
        console.error("Lỗi khi lấy danh sách khảo sát hoặc loại khảo sát:", error);
      }
    };
    

    if (surveyTypeId) {
      fetchSurveys();
    }
  }, [surveyTypeId]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch({
      type: "REORDER_QUESTIONS",
      payload: {
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.title.trim()) {
      alert("Please enter a survey title");
      return;
    }
    if (state.questions.length === 0) {
      alert("Please add at least one question");
      return;
    }
    for (const question of state.questions) {
      if (!question.text.trim()) {
        alert("All questions must have text");
        return;
      }
      if (question.answers.length === 0) {
        alert(`Question "${question.text}" must have at least one answer`);
        return;
      }
      for (const answer of question.answers) {
        if (!answer.text.trim()) {
          alert(`All answers in question "${question.text}" must have text`);
          return;
        }
      }
    }
    console.log("Survey data:", state);
  };

  return (
    <div className="survey-container">
      <form onSubmit={handleSubmit} className="survey-form">
        <input
          type="text"
          value={state.title}
          onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
          placeholder="Survey Title"
          className="survey-title"
        />
        <input
          type="number"
          value={state.maxScore}
          onChange={(e) => dispatch({ type: "SET_MAX_SCORE", payload: parseInt(e.target.value) })}
          placeholder="Max Score"
          className="max-score"
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {state.questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} className="question-block">
                        <div {...provided.dragHandleProps} className="drag-icon">
                          <FiGrid />
                        </div>
                        <input
                          type="text"
                          title="Question"
                          value={question.text}
                          onChange={(e) =>
                            dispatch({
                              type: "UPDATE_QUESTION",
                              payload: { id: question.id, text: e.target.value }
                            })
                          }
                          placeholder={`Question ${index + 1}`}
                          className="question-input"
                        />
                        <button
                          type="button"
                          title="Delete Question"
                          onClick={() => dispatch({ type: "DELETE_QUESTION", payload: question.id })}
                          className="delete-btn"
                        >
                          <FiTrash2 />
                        </button>
                        {question.answers.map((answer, aIndex) => (
                          <div key={answer.id} className="answer-block">
                            <input
                              type="text"
                              title="Answer"
                              value={answer.text}
                              onChange={(e) =>
                                dispatch({
                                  type: "UPDATE_ANSWER",
                                  payload: {
                                    questionId: question.id,
                                    answerId: answer.id,
                                    text: e.target.value,
                                    score: answer.score
                                  }
                                })
                              }
                              placeholder={`Answer ${aIndex + 1}`}
                            />
                            <input
                              type="number"
                              title="Score"
                              value={answer.score}
                              onChange={(e) =>
                                dispatch({
                                  type: "UPDATE_ANSWER",
                                  payload: {
                                    questionId: question.id,
                                    answerId: answer.id,
                                    text: answer.text,
                                    score: parseInt(e.target.value)
                                  }
                                })
                              }
                              placeholder="Score"
                              min="0"
                              max={state.maxScore}
                            />
                            <button
                              type="button"
                              title="Delete Answer"
                              onClick={() =>
                                dispatch({
                                  type: "DELETE_ANSWER",
                                  payload: { questionId: question.id, answerId: answer.id }
                                })
                              }
                              className="delete-btn"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          title="Add Answer"
                          onClick={() => dispatch({ type: "ADD_ANSWER", payload: question.id })}
                          className="add-answer-btn"
                        >
                          <FiPlus /> Add Answer
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button type="button"
        title="Add Question"
        onClick={() => dispatch({ type: "ADD_QUESTION" })} className="add-question-btn">
          <FiPlus /> Add Question
        </button>
        <button type="submit" className="save-survey-btn">Save Survey</button>
      </form>
    </div>
  );
};

export default SurveyDashboard;
