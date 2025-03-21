import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Button } from "antd";
import { BlogPost } from "../../types/blog";
import blog1 from "../../images/blog1.jpg";
import doc1 from "../../images/adhd.jpg";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handelOnClickBlog1 = () => {
    navigate("/blog/1");
  }
  const handelOnClickDoc1  = () => {
    navigate("/tai-lieu/1");
  }
  const handelOnClickBlog  = () => {
    navigate("/blog");
  }
  const handelOnClickDoc  = () => {
    navigate("/tai-lieu");
  }
  return (
    <div className="blog-document">
      <div className="blog-document__container">
        {/* Blog Section */}
        <div className="blog-document__section">
          <h2 className="blog-document__title">Blog tư vấn tâm lý</h2>
          <div className="blog-document__card">
            {poster[0] && (
              <img src={blog1} alt="Blog thumbnail" />
            )}
            <h3>Hiểu về Tâm lý học Trường học trong Thời đại Số</h3>
            <a href="#" className="blog-document__link" onClick={handelOnClickBlog1}>
              xem ngay
            </a>
          </div>
          <Button type="primary" className="login-button" onClick={handelOnClickBlog}>
            Xem thêm
          </Button>
        </div>

        {/* Document Section */}
        <div className="blog-document__section">
          <h2 className="blog-document__title">Tài liệu</h2>
          <div className="blog-document__card">
            {poster[1] && (
              <img src={doc1} alt="Document thumbnail" />
            )}
            <h3>Rối loạn tăng động - giảm chú ý</h3>
            <a href="#" className="blog-document__link" onClick={handelOnClickDoc1}>
              xem ngay
            </a>
          </div>
          <Button type="primary" className="login-button" onClick={handelOnClickDoc}>
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogAndDocument;
