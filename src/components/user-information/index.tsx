import { useState } from "react";
import "./index.scss";
import UserLogo from "../../images/User.png";
import { Button } from "antd";

function UserInformation() {
  const [isChangePassword, setIsChangePassword] = useState(false);

  const renderUserInfoForm = () => (
    <>
      <div className="user-information__content">
        <div className="user-information__form">
          <div className="form-group">
            <label>Tên Đăng Nhập</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Gmail</label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="tel" />
          </div>

          <div className="form-group">
            <label>Vai trò</label>
            <input type="text" />
          </div>
        </div>

        <div className="user-information__avatar">
          <div className="avatar-section">
            <label>Hình đại diện</label>
            <div className="avatar-container">
              <img src={UserLogo} alt="User avatar" />
            </div>
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <textarea rows={3}></textarea>
          </div>
          <div className="button-container">
            <Button type="primary" className="update-btn">
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  const renderChangePasswordForm = () => (
    <div className="user-information__change-password">
      <div className="change-password-form">
        <div className="form-group">
          <label>Mật khẩu cũ</label>
          <input type="password" />
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input type="password" />
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <input type="password" />
        </div>
        <div className="button-container">
          <Button type="primary" className="update-btn">
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="user-information">
      <div className="user-information__header">
        <h2>Thông tin tài khoản chung</h2>
        <button
          className="change-password-btn"
          onClick={() => setIsChangePassword(!isChangePassword)}
        >
          <h2>{isChangePassword ? " Quay lại" : " Đổi mật khẩu"}</h2>
        </button>
      </div>

      {isChangePassword ? renderChangePasswordForm() : renderUserInfoForm()}
    </div>
  );
}

export default UserInformation;
