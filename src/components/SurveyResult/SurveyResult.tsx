import React from 'react';
import './SurveyResult.scss';
import { SurveyResultData } from '../../types/QuizResult';


const SurveyResult: React.FC = () => {
    const gad7Score = localStorage.getItem('gad7Score');

    const result: SurveyResultData = {
        name: "Nguyễn Văn A",
        gender: "Nam",
        dob: "01-01-2004",
        age: "20",
        evaluationDate: "17-01-2025",
        explanation: "Xem liệu trình gợi ý"
    };

    return (
        <div className="survey-result-container">
            <h1>BÁO CÁO KẾT QUẢ SÀNG LỌC</h1>
            <section className="general-info">
                <h2>1. Thông tin chung</h2>
                <p>Tên bạn <strong>{result.name}</strong></p>
                <p>Giới tính <strong>{result.gender}</strong></p>
                <p>Ngày sinh <strong>{result.dob}</strong></p>
                <p>Tuổi thực <strong>{result.age}</strong></p>
                <p>Thời gian đánh giá <strong>{result.evaluationDate}</strong></p>
            </section>

            <section className="score-explanation">
                <h2>2. Giải thích về bảng điểm</h2>
                <p>0-4: Không có triệu chứng lo âu</p>
                <p>5-9: Lo âu nhẹ, nhưng cần tìm hiểu nguyên nhân gây lo âu và xử lý trước khi có chuyển biến nặng hơn.</p>
                <p>10-14: Lo âu vừa phải, nên tìm sự hỗ trợ của các chuyên gia.</p>
                <p>15-21: Lo âu nghiêm trọng, cần điều trị gấp</p>
            </section>

            <section className="screening-results">
                <h2>3. Điểm của bạn sau khi làm bài sàng lọc</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Lĩnh vực</th>
                            <th>Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Trầm cảm</td>
                            <td>{gad7Score}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="result-explanation">
                <button>Đặt lịch hẹn với chuyên gia</button>
            </section>
        </div>
    );
};

export default SurveyResult;