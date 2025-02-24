import Footer from '../../components/footer'
import Header from '../../components/header'
import './Document.scss'
import { FiClock, FiUser, FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import doc1 from '../../images/adhd.jpg'
import doc2 from '../../images/dauhieutamly.jpg'
import doc3 from '../../images/vaitro.jpg'
import doc4 from '../../images/taphuankns.jpg'

interface DocumentPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  readTime: string;
}

function Document() {
  const documentPosts: DocumentPost[] = [
    {
      id: 1,
      title: "Rối loạn tăng động - giảm chú ý",
      excerpt: "Rối loạn tăng động giảm chú ý(Attention-Deficit/Hyperactivity Disorder) là một trong những rối loạn phát triển tâm thần kinh ở trẻ em.",
      author: "TS. Nguyễn Văn A",
      date: "15/03/2024",
      imageUrl: doc1,
      category: "Sách Tham khảo",
      readTime: "45 phút đọc"
    },
    {
      id: 2,
      title: "Những dấu hiệu cảnh báo về sức khỏe tâm lý ở học sinh ",
      excerpt: "Sức khỏe tâm lý của học sinh có thể bị ảnh hưởng bởi nhiều yếu tố như áp lực học tập, môi trường gia đình và bạn bè. Nhận biết sớm những dấu hiệu này giúp giáo viên và phụ huynh có biện pháp hỗ trợ kịp thời...",
      author: "PGS.TS. Trần Thị B",
      date: "12/03/2024",
      imageUrl: doc2,
      category: "Công cụ Đánh giá",
      readTime: "30 phút đọc"
    },
    {
      id: 3,
      title: "Vai trò của tâm lý học học đường trong sự phát triển của học sinh.",
      excerpt: "Tâm lý học học đường đóng vai trò quan trọng trong việc hỗ trợ sự phát triển tâm lý, cảm xúc và xã hội của học sinh. Các chuyên gia tâm lý học đường giúp phát hiện sớm các vấn đề tâm lý, hỗ trợ học sinh vượt qua áp lực học tập và phát triển kĩ năng sống.",
      author: "ThS. Lê Văn C",
      date: "10/03/2024",
      imageUrl: doc3,
      category: "Hướng dẫn Thực hành",
      readTime: "25 phút đọc"
    },
    {
      id: 4,
      title: "Tài liệu Tập huấn Kỹ năng Sống cho Học sinh",
      excerpt: "Bộ tài liệu đầy đủ về các hoạt động và bài tập phát triển kỹ năng sống thiết yếu cho học sinh. Phương pháp giảng dạy và đánh giá...",
      author: "TS. Phạm Thị D",
      date: "08/03/2024",
      imageUrl: doc4,
      category: "Tài liệu Đào tạo",
      readTime: "35 phút đọc"
    }
  ];

  return (
    <div className="document-page">
      <Header/>
      
      <main className="document-content">
        <div className="document-hero">
          <h1>Tài liệu Tâm lý học Đường</h1>
          <p>Kho tài liệu chuyên môn và tài nguyên học tập</p>
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm tài liệu..." />
            <button>Tìm kiếm</button>
          </div>
        </div>

        <div className="document-layout">
          <div className="document-main">
            <div className="document-categories">
              <button className="category-btn active">Tất cả</button>
              <button className="category-btn">Sách Tham khảo</button>
              <button className="category-btn">Công cụ Đánh giá</button>
              <button className="category-btn">Hướng dẫn Thực hành</button>
            </div>

            <div className="document-list">
              {documentPosts.map(post => (
                <article key={post.id} className="document-card">
                  <div className="document-card-image">
                    <img src={post.imageUrl} alt={post.title} />
                    <span className="category-tag">{post.category}</span>
                  </div>
                  <div className="document-card-content">
                    <h2>{post.title}</h2>
                    <p className="excerpt">{post.excerpt}</p>
                    <div className="document-card-meta">
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
                    <Link to={`/tai-lieu/${post.id}`} className="read-more">
                      Đọc tiếp
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="document-sidebar">
            <div className="sidebar-section popular-docs">
              <h3>Tài liệu nổi bật</h3>
              <ul>
                {documentPosts.slice(0, 3).map(post => (
                  <li key={post.id}>
                    <Link to={`/tai-lieu/${post.id}`}>
                      <img src={post.imageUrl} alt={post.title} />
                      <div>
                        <h4>{post.title}</h4>
                        <span>{post.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section categories">
              <h3>Danh mục</h3>
              <ul>
                <li>
                  <span>Sách Tham khảo</span>
                  <span className="count">8</span>
                </li>
                <li>
                  <span>Công cụ Đánh giá</span>
                  <span className="count">12</span>
                </li>
                <li>
                  <span>Hướng dẫn Thực hành</span>
                  <span className="count">15</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Document
