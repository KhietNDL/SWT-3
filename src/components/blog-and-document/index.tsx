import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Button } from "antd";
import { BlogPost } from "../../types/blog";


function BlogAndDocument() {
  const [poster, setPoster] = useState<BlogPost[]>([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      "https://67825c7ac51d092c3dcf3248.mockapi.io/SS"
    );
    setPoster(response.data);
  };
  useEffect(() => {
    fetchMovies(); 
  }, []); 
  return (
    <div className="blog-document">
      <div className="blog-document__container">
        {/* Blog Section */}
        <div className="blog-document__section">
          <h2 className="blog-document__title">Blog tư vấn tâm lý</h2>
          <div className="blog-document__card">
            {poster[0] && (
              <img src={poster[0].poster_path} alt="Blog thumbnail" />
            )}
            <h3>Hãy quên tôi đi</h3>
            <a href="#" className="blog-document__link">
              xem ngay
            </a>
          </div>
          <Button type="primary" className="login-button">
            Xem thêm
          </Button>
        </div>

        {/* Document Section */}
        <div className="blog-document__section">
          <h2 className="blog-document__title">Tài liệu</h2>
          <div className="blog-document__card">
            {poster[1] && (
              <img src={poster[1].poster_path} alt="Document thumbnail" />
            )}
            <h3>Hiểu hơn về hướng nội</h3>
            <a href="#" className="blog-document__link">
              xem ngay
            </a>
          </div>
          <Button type="primary" className="login-button">
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogAndDocument;
