import React, { useState } from "react";
import { Plus, Search, Filter, ChevronDown, Pencil, Trash2 } from "lucide-react";
import "./index.scss"; // File SCSS (hoặc CSS) của bạn
import { User } from "../../types/user";

// ====== INTERFACE CHO USER ======


// ====== DỮ LIỆU MẪU BAN ĐẦU ======
const initialUsers: User[] = [
  {
    id: "1",
    username: "john_doe",
    fullname: "John Doe",
    email: "john@example.com",
    phone: 123456789,
    address: "123 Main St",
    roleName: "Admin",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "2",
    username: "jane_smith",
    fullname: "Jane Smith",
    email: "jane@example.com",
    phone: 987654321,
    address: "456 Park Ave",
    roleName: "User",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "3",
    username: "alex_nguyen",
    fullname: "Alex Nguyen",
    email: "alex@example.com",
    phone: 555666777,
    address: "789 Broadway",
    roleName: "User",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

const UserManagement: React.FC = () => {
  // State quản lý danh sách Users
  const [users, setUsers] = useState<User[]>(initialUsers);

  // State cho tìm kiếm (search) và filter
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // State điều khiển hiển thị Modal (Add/Edit)
  const [showModal, setShowModal] = useState<boolean>(false);
  // Xác định đang edit user nào (nếu có). null = đang thêm mới
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // State lưu tạm thông tin user đang tạo/sửa
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    username: "",
    fullname: "",
    email: "",
    phone: 0,
    address: "",
    roleName: "User",
    avatar: "",
  });

  // ====== Lọc users theo searchTerm & selectedRole ======
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.roleName === selectedRole;

    return matchesSearch && matchesRole;
  });

  // ====== Mở modal để Thêm mới ======
  const handleOpenAddModal = () => {
    setEditingUserId(null); // không sửa, mà là thêm mới
    setCurrentUser({
      id: "",
      username: "",
      fullname: "",
      email: "",
      phone: 0,
      address: "",
      roleName: "User",
      avatar: "",
    });
    setShowModal(true);
  };

  // ====== Mở modal để Sửa (Edit) ======
  const handleOpenEditModal = (user: User) => {
    setEditingUserId(user.id);
    setCurrentUser(user); // điền sẵn thông tin
    setShowModal(true);
  };

  // ====== Đóng modal ======
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUserId(null);
    // Reset
    setCurrentUser({
      id: "",
      username: "",
      fullname: "",
      email: "",
      phone: 0,
      address: "",
      roleName: "User",
      avatar: "",
    });
  };

  // ====== Submit form (Thêm hoặc Sửa) ======
  const handleSubmitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingUserId) {
      // Đang sửa => cập nhật
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUserId ? { ...currentUser, id: editingUserId } : u
        )
      );
    } else {
      // Đang thêm mới => tạo ID mới (hoặc lấy input)
      const newId = (users.length + 1).toString();
      setUsers([...users, { ...currentUser, id: newId }]);
    }
    handleCloseModal();
  };

  // ====== Xoá user ======
  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="user-container">
      {/* HEADER */}
      <div className="user-header">
        <h2>User Management</h2>
        <button className="add-button" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add New User
        </button>
      </div>

      {/* CONTROLS: Search + Filter */}
      <div className="user-controls">
        {/* Search bar */}
        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by username or full name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter dropdown */}
        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Filter size={16} />
            Role: {selectedRole}
            <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <ul className="dropdown-menu">
              {["All", "Admin", "User"].map((role) => (
                <li
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setShowDropdown(false);
                  }}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* TABLE */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                ) : (
                  <div style={{ width: 40, height: 40, background: "#ccc" }} />
                )}
              </td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <span className={`role-badge ${user.roleName.toLowerCase()}`}>
                  {user.roleName}
                </span>
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleOpenEditModal(user)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL (Add/Edit) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingUserId ? "Edit User" : "Create New User"}</h3>
            <form onSubmit={handleSubmitUser}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={currentUser.username}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Fullname</label>
                <input
                  type="text"
                  value={currentUser.fullname}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, fullname: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="number"
                  value={currentUser.phone}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      phone: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={currentUser.address}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, address: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={currentUser.roleName}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      roleName: e.target.value,
                    })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="form-group">
                <label>Avatar URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={currentUser.avatar}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, avatar: e.target.value })
                  }
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit">
                  {editingUserId ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
