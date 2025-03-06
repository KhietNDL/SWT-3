import { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "antd";
import axios from "axios";

function UserInformation() {
  const [user, setUser] = useState(null);
  const [isChangePassword, setIsChangePassword] = useState(false);

  // Các state cho thông tin người dùng
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [passwordSalt, setPasswordSalt] = useState("");

  // Các state cho đổi mật khẩu
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Lấy dữ liệu user từ API khi component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          "https://localhost:7006/Account/dad2a80f-70e4-49f6-b3c5-3c1eedf525e4"
        );
        const data = response.data;
        setUser(data);
        // Cập nhật các state với giá trị từ API
        setUsername(data.userName || "");
        setFullname(data.fullname || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setPasswordHash(data.passwordHash || "");
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateUserInfo = async () => {
    const updatedData = {
      accountId: user.id,
      username: username || user.userName,
      fullname: fullname || user.fullname,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      passwordHash: passwordHash || user.passwordHash,
      passwordSalt,
    };

    try {
      const response = await axios.put(
        `https://localhost:7006/Account/${user.id}`,
        updatedData
      );
      console.log("User information updated:", response.data);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleUpdatePassword = async () => {
    // Kiểm tra mật khẩu mới có trùng khớp không
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const payload = {
        accountId: user.id,
        oldPassword, // mật khẩu người dùng nhập (plain text)
        newPassword, // mật khẩu mới
      };
      const response = await axios.post(
        "https://localhost:7006/Account/UpdatePassword",
        payload
      );
      console.log("Password updated successfully:", response.data);
      alert("Cập nhật mật khẩu thành công!");
      // Reset lại các state liên quan mật khẩu
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Có thể chuyển về form thông tin user nếu cần
      setIsChangePassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Cập nhật mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ.");
    }
  };

  const renderUserInfoForm = () => (
    <div className="user-information__content">
      <div className="user-information__form">
        <div className="form-group">
          <label>Tên Đăng Nhập</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Gmail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Vai trò</label>
          <input type="text" value={user.roleName} readOnly />
        </div>
      </div>

      <div className="user-information__avatar">
        <div className="avatar-section">
          <label>Hình đại diện</label>
          <div className="avatar-container">
            <img src={user.avatar} alt={user.userName} />
          </div>
        </div>

        <div className="form-group">
          <label>Họ và Tên</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div className="button-container">
          <Button
            type="primary"
            className="update-btn"
            onClick={handleUpdateUserInfo}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );

  const renderChangePasswordForm = () => (
    <div className="user-information__change-password">
      <div className="change-password-form">
        <div className="form-group">
          <label>Mật khẩu cũ</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Button
            type="primary"
            className="update-btn"
            onClick={handleUpdatePassword}
          >
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
