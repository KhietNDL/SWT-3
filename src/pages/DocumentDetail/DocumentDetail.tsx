import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FiClock, FiUser, FiTag } from 'react-icons/fi';
import './DocumentDetail.scss';
import doc1 from '../../images/adhd.jpg';
import doc2 from '../../images/dauhieutamly.jpg';
import doc3 from '../../images/vaitro.jpg';
import doc4 from '../../images/taphuankns.jpg';

const imageMap: { [key: string]: string } = {
  "1": doc1,
  "2": doc2,
  "3": doc3,
  "4": doc4
};

function DocumentDetail() {
  const { id } = useParams();

  // Mock data - sau này sẽ lấy từ API dựa vào id
  const documentContent: { [key: string]: string } = {
    "1": `
      <h2>Rối loạn tăng động giảm chú ý (ADHD) là gì?</h2>
      <p>ADHD là một trong những rối loạn phát triển tâm thần kinh phổ biến nhất ở trẻ em. Đây là tình trạng ảnh hưởng đến khả năng tập trung, kiểm soát hành vi và ngồi yên của trẻ.</p>

      <h2>Các dấu hiệu nhận biết</h2>
      <p>Trẻ mắc ADHD thường có ba nhóm triệu chứng chính:</p>
      <ul>
        <li>Khó tập trung</li>
        <li>Hiếu động thái quá</li>
        <li>Hành động thiếu suy nghĩ</li>
      </ul>

      <h2>Tác động đến việc học tập</h2>
      <p>ADHD có thể ảnh hưởng đáng kể đến kết quả học tập và các mối quan hệ xã hội của trẻ. Trẻ thường gặp khó khăn trong:</p>
      <ul>
        <li>Hoàn thành bài tập</li>
        <li>Tuân theo hướng dẫn</li>
        <li>Tổ chức công việc</li>
        <li>Duy trì các mối quan hệ bạn bè</li>
      </ul>

      <h2>Phương pháp hỗ trợ</h2>
      <p>Có nhiều cách để hỗ trợ trẻ mắc ADHD:</p>
      <ul>
        <li>Điều trị bằng thuốc (khi cần thiết và có chỉ định của bác sĩ)</li>
        <li>Liệu pháp hành vi</li>
        <li>Điều chỉnh phương pháp giảng dạy</li>
        <li>Hỗ trợ từ gia đình và nhà trường</li>
      </ul>
    `,
    "2": `
      <h2>Dấu hiệu cảnh báo về sức khỏe tâm lý ở học sinh</h2>
      <p>Nhận biết sớm các dấu hiệu về vấn đề tâm lý ở học sinh là rất quan trọng để có thể hỗ trợ kịp thời. Dưới đây là một số dấu hiệu cần lưu ý:</p>

      <h2>1. Thay đổi trong học tập</h2>
      <ul>
        <li>Sụt giảm đột ngột về điểm số</li>
        <li>Mất tập trung trong lớp</li>
        <li>Không hoàn thành bài tập</li>
        <li>Thờ ơ với các hoạt động học tập</li>
      </ul>

      <h2>2. Thay đổi hành vi</h2>
      <ul>
        <li>Cô lập, tránh giao tiếp</li>
        <li>Dễ cáu gắt, hung hăng</li>
        <li>Thay đổi thói quen ăn uống, ngủ nghỉ</li>
        <li>Biểu hiện lo âu, trầm cảm</li>
      </ul>

      <h2>3. Biện pháp hỗ trợ</h2>
      <p>Khi phát hiện các dấu hiệu trên, cần:</p>
      <ul>
        <li>Trao đổi với học sinh</li>
        <li>Thông báo cho phụ huynh</li>
        <li>Tham khảo ý kiến chuyên gia tâm lý</li>
        <li>Xây dựng kế hoạch hỗ trợ phù hợp</li>
      </ul>
    `,
    "3": `
      <h2>Vai trò của tâm lý học đường</h2>
      <p>Tâm lý học đường đóng vai trò quan trọng trong việc hỗ trợ sự phát triển toàn diện của học sinh. Dưới đây là các khía cạnh chính:</p>

      <h2>1. Hỗ trợ phát triển cá nhân</h2>
      <ul>
        <li>Tư vấn định hướng nghề nghiệp</li>
        <li>Phát triển kỹ năng xã hội</li>
        <li>Tăng cường sức khỏe tinh thần</li>
        <li>Xây dựng lòng tự tin</li>
      </ul>

      <h2>2. Giải quyết vấn đề học tập</h2>
      <p>Tâm lý học đường giúp:</p>
      <ul>
        <li>Cải thiện động lực học tập</li>
        <li>Phát triển phương pháp học hiệu quả</li>
        <li>Vượt qua khó khăn trong học tập</li>
        <li>Xây dựng mục tiêu học tập</li>
      </ul>

      <h2>3. Phòng ngừa và can thiệp</h2>
      <p>Các hoạt động bao gồm:</p>
      <ul>
        <li>Phát hiện sớm vấn đề tâm lý</li>
        <li>Can thiệp khủng hoảng</li>
        <li>Phòng chống bạo lực học đường</li>
        <li>Tư vấn cho phụ huynh và giáo viên</li>
      </ul>
    `,
    "4": `
      <h2>Tập huấn Kỹ năng Sống cho Học sinh</h2>
      <p>Chương trình tập huấn kỹ năng sống giúp học sinh phát triển các năng lực cần thiết cho cuộc sống.</p>

      <h2>1. Kỹ năng giao tiếp</h2>
      <ul>
        <li>Lắng nghe tích cực</li>
        <li>Thể hiện quan điểm</li>
        <li>Giải quyết xung đột</li>
        <li>Làm việc nhóm</li>
      </ul>

      <h2>2. Kỹ năng tư duy</h2>
      <ul>
        <li>Tư duy phản biện</li>
        <li>Giải quyết vấn đề</li>
        <li>Ra quyết định</li>
        <li>Sáng tạo</li>
      </ul>

      <h2>3. Kỹ năng cảm xúc</h2>
      <p>Phát triển:</p>
      <ul>
        <li>Nhận biết cảm xúc</li>
        <li>Kiểm soát cảm xúc</li>
        <li>Đồng cảm</li>
        <li>Ứng phó với stress</li>
      </ul>
    `
  };

  const post = {
    id: parseInt(id || "1"),
    title: [
      "Rối loạn tăng động - giảm chú ý",
      "Những dấu hiệu cảnh báo về sức khỏe tâm lý ở học sinh",
      "Vai trò của tâm lý học học đường trong sự phát triển của học sinh",
      "Tài liệu Tập huấn Kỹ năng Sống cho Học sinh"
    ][parseInt(id || "1") - 1],
    content: documentContent[id || "1"],
    author: ["TS. Nguyễn Văn A", "PGS.TS. Trần Thị B", "ThS. Lê Văn C", "TS. Phạm Thị D"][parseInt(id || "1") - 1],
    date: "15/03/2024",
    imageUrl: imageMap[id || "1"],
    category: ["Sách Tham khảo", "Công cụ Đánh giá", "Hướng dẫn Thực hành", "Tài liệu Đào tạo"][parseInt(id || "1") - 1],
    readTime: ["45 phút đọc", "30 phút đọc", "25 phút đọc", "35 phút đọc"][parseInt(id || "1") - 1]
  };

  return (
    <div className="document-detail-page">
      <Header />
      
      <main className="document-detail-content">
        <div className="document-detail-header">
          <h1>{post.title}</h1>
          <div className="meta-info">
            <div className="meta-item">
              <FiUser className="meta-icon" />
              <span>{post.author}</span>
            </div>
            <div className="meta-item">
              <FiClock className="meta-icon" />
              <span>{post.readTime}</span>
            </div>
            <div className="meta-item">
              <FiTag className="meta-icon" />
              <span>{post.category}</span>
            </div>
          </div>
        </div>

        <div className="document-detail-image">
          <img src={post.imageUrl} alt={post.title} />
        </div>

        <article className="document-detail-body">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="document-detail-footer">
          <div className="author-info">
            <img src={doc1} alt={post.author} />
            <div className="author-bio">
              <h3>{post.author}</h3>
              <p>Chuyên gia tâm lý học đường với hơn 10 năm kinh nghiệm trong lĩnh vực tư vấn học đường.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DocumentDetail;
