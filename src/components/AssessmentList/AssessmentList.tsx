import React from "react";
import styles from "./AssessmentList.module.scss";
import { Link } from "react-router-dom";
import { Assessment } from "../../types/AssessmentList";

const assessments: Assessment[] = [
  { id: 1, title: "GAD-7", description: "là một bảng câu hỏi gồm 7 mục được sử dụng để sàng lọc và đánh giá mức độ lo âu tổng quát. Đây là một công cụ phổ biến trong y khoa và tâm lý học để đo lường mức độ lo âu của một cá nhân trong 2 tuần qua.", duration: "5 min" },
  { id: 2, title: "Emotional Intelligence Test", description: "Assess your emotional intelligence level.", duration: "15 min" },
  { id: 3, title: "Stress Level Test", description: "Check how well you handle stress.", duration: "12 min" },
  { id: 4, title: "Cognitive Ability Test", description: "Measure your cognitive strengths.", duration: "20 min" }
];

const AssessmentList: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Psychological Assessments</h1>
      <div className={styles.list}>
        {assessments.map((assessment) => (
          <div key={assessment.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{assessment.title}</h2>
            <p className={styles.cardDescription}>{assessment.description}</p>
            <p className={styles.cardDuration}>Duration: {assessment.duration}</p>
            <Link to={`/quiz/${assessment.id}`}>
              <button className={styles.startButton}>Start Test</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentList;
