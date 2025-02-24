import Footer from '../../components/footer'
import Header from '../../components/header'
import './Blog.scss'
import { FiClock, FiUser, FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  readTime: string;
}

function Blog() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Hiểu về Tâm lý học Trường học trong Thời đại Số",
      excerpt: "Khám phá cách công nghệ và phương pháp hiện đại đang thay đổi cách tiếp cận tâm lý học đường...",
      author: "Dr. Nguyễn Văn A",
      date: "15/03/2024",
      imageUrl: "./src/images/blog1.jpg",
      category: "Tâm lý học Giáo dục",
      readTime: "5 phút đọc"
    },
    {
      id: 2,
      title: "10 Kỹ năng Tư vấn Học đường Hiệu quả",
      excerpt: "Tổng hợp những kỹ năng quan trọng giúp nhà tư vấn tâm lý kết nối hiệu quả với học sinh...",
      author: "ThS. Trần Thị B",
      date: "12/03/2024",
      imageUrl: "./src/images/tamlyhocduong1.jpg",
      category: "Tư vấn Tâm lý",
      readTime: "8 phút đọc"
    },
    {
      id: 3,
      title: "Quản lý Stress và Lo âu ở Học sinh THPT",
      excerpt: "Hướng dẫn cách nhận biết và hỗ trợ học sinh đối phó với áp lực học tập và thi cử...",
      author: "ThS. Lê Văn C",
      date: "10/03/2024",
      imageUrl: "./src/images/quanlystressvaloau.jpg",
      category: "Sức khỏe Tinh thần",
      readTime: "6 phút đọc"
    },
    {
      id: 4,
      title: "Xây dựng Môi trường Học đường Tích cực",
      excerpt: "Các giải pháp và hoạt động thực tiễn để tạo nên không gian học tập lành mạnh, an toàn...",
      author: "PGS.TS. Phạm Thị D",
      date: "08/03/2024",
      imageUrl: "./src/images/tichcuc.jpg",
      category: "Tâm lý học Giáo dục",
      readTime: "7 phút đọc"
    }
  ];

  return (
    <div className="blog-page">
      <Header/>
      
      <main className="blog-content">
        <div className="blog-hero">
          <h1>Blog Tâm lý học Đường</h1>
          <p>Nơi chia sẻ kiến thức và kinh nghiệm về tâm lý học trường học</p>
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm bài viết..." />
            <button>Tìm kiếm</button>
          </div>
        </div>

        <div className="blog-layout">
          <div className="blog-main">
            <div className="blog-categories">
              <button className="category-btn active">Tất cả</button>
              <button className="category-btn">Tâm lý học Giáo dục</button>
              <button className="category-btn">Tư vấn Tâm lý</button>
              <button className="category-btn">Sức khỏe Tinh thần</button>
            </div>

            <div className="blog-grid">
              {blogPosts.map(post => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-image">
                    <img src={post.imageUrl} alt={post.title} />
                    <span className="category-tag">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <h2>{post.title}</h2>
                    <p className="excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
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
                    <Link to={`/blog/${post.id}`} className="read-more">
                      Đọc tiếp
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="sidebar-section popular-posts">
              <h3>Bài viết nổi bật</h3>
              <ul>
                {blogPosts.slice(0, 3).map(post => (
                  <li key={post.id}>
                    <img src={post.imageUrl} alt={post.title} />
                    <div>
                      <h4>{post.title}</h4>
                      <span>{post.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section categories">
              <h3>Danh mục</h3>
              <ul>
                <li>
                  <span>Tâm lý học Giáo dục</span>
                  <span className="count">12</span>
                </li>
                <li>
                  <span>Tư vấn Tâm lý</span>
                  <span className="count">8</span>
                </li>
                <li>
                  <span>Sức khỏe Tinh thần</span>
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

export default Blog
