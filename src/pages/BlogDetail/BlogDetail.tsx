import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FiClock, FiUser, FiTag } from 'react-icons/fi';
import './BlogDetail.scss';
import blog1 from '../../images/blog1.jpg';
import tamlyhocduong1 from '../../images/tamlyhocduong1.jpg';
import quanlystressvaloau from '../../images/quanlystressvaloau.jpg';
import tichcuc from '../../images/tichcuc.jpg';

const imageMap: { [key: string]: string } = {
  "1": blog1,
  "2": tamlyhocduong1,
  "3": quanlystressvaloau,
  "4": tichcuc
};

function BlogDetail() {
  const { id } = useParams();

  // Mock data - sau này sẽ lấy từ API dựa vào id
  const post = {
    id: parseInt(id || "1"),
    title: "Hiểu về Tâm lý học Trường học trong Thời đại Số",
    content: `
      <h2>1. Giới thiệu</h2>
      <p>Trong thời đại số hóa, tâm lý học trường học đang phải đối mặt với những thách thức và cơ hội mới...</p>

      <h2>2. Tác động của công nghệ số</h2>
      <p>Sự phát triển của công nghệ đã tạo ra những thay đổi đáng kể trong cách học sinh tương tác và học tập...</p>

      <h2>3. Phương pháp tiếp cận mới</h2>
      <p>Các nhà tâm lý học đường đang phát triển những phương pháp mới để hỗ trợ học sinh trong môi trường số...</p>

      <h2>4. Kết luận</h2>
      <p>Việc kết hợp công nghệ với tâm lý học trường học mở ra nhiều cơ hội mới trong việc hỗ trợ học sinh...</p>
    `,
    author: "Dr. Nguyễn Công Phượng",
    date: "15/03/2024",
    imageUrl: imageMap[id || "1"],
    category: "Tâm lý học Giáo dục",
    readTime: "5 phút đọc"
  };

  return (
    <div className="blog-detail-page">
      <Header />
      
      <main className="blog-detail-content">
        <div className="blog-detail-header">
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

        <div className="blog-detail-image">
          <img src={post.imageUrl} alt={post.title} />
        </div>

        <article className="blog-detail-body">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="blog-detail-footer">
          <div className="author-info">
            <img src="./src/images/author-avatar.jpg" alt={post.author} />
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

export default BlogDetail; 