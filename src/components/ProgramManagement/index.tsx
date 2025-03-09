import React, { useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import "./index.scss";

// ====== INTERFACE CHO SUBSCRIPTION ======
interface Subscription {
  id: number;
  subscriptionName: string;
  description: string;
  price: number;
  duration: number;         // Kiểu number
  categoryName: string;
  psychologistName: string;
}

// ====== DỮ LIỆU BAN ĐẦU (MẪU) ======
const initialSubscriptions: Subscription[] = [
  {
    id: 1,
    subscriptionName: "Basic Plan",
    description: "Basic subscription with minimal features",
    price: 0.01,
    duration: 2147483647,
    categoryName: "General",
    psychologistName: "Dr. John",
  },
  {
    id: 2,
    subscriptionName: "Premium Plan",
    description: "Full-feature subscription with premium support",
    price: 9.99,
    duration: 365,
    categoryName: "Advanced",
    psychologistName: "Dr. Jane",
  },
];

const SubscriptionManagement: React.FC = () => {
  // State quản lý danh sách Subscription
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);

  // State quản lý tìm kiếm (theo subscriptionName)
  const [searchTerm, setSearchTerm] = useState("");

  // State điều khiển hiển thị Modal (Add/Edit)
  const [showModal, setShowModal] = useState(false);

  // Xác định đang edit subscription nào (nếu có). null = đang thêm mới
  const [editingId, setEditingId] = useState<number | null>(null);

  // State lưu tạm Subscription khi thêm/sửa
  const [currentSub, setCurrentSub] = useState<Subscription>({
    id: 0,
    subscriptionName: "",
    description: "",
    price: 0,
    duration: 0,
    categoryName: "",
    psychologistName: "",
  });

  // ====== Lọc subscriptions theo searchTerm ======
  const filteredSubs = subscriptions.filter((sub) =>
    sub.subscriptionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ====== Mở modal để Thêm mới ======
  const handleOpenAddModal = () => {
    setEditingId(null); // Không sửa, mà là thêm mới
    setCurrentSub({
      id: 0,
      subscriptionName: "",
      description: "",
      price: 0,
      duration: 0,
      categoryName: "",
      psychologistName: "",
    });
    setShowModal(true);
  };

  // ====== Mở modal để Sửa (Edit) ======
  const handleOpenEditModal = (sub: Subscription) => {
    setEditingId(sub.id);
    setCurrentSub(sub); // Điền sẵn thông tin
    setShowModal(true);
  };

  // ====== Đóng modal ======
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setCurrentSub({
      id: 0,
      subscriptionName: "",
      description: "",
      price: 0,
      duration: 0,
      categoryName: "",
      psychologistName: "",
    });
  };

  // ====== Submit form (Thêm hoặc Sửa) ======
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId !== null) {
      // Chế độ sửa => cập nhật
      setSubscriptions((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...currentSub, id: editingId } : item
        )
      );
    } else {
      // Thêm mới => sinh ID
      const newId =
        subscriptions.length > 0
          ? Math.max(...subscriptions.map((item) => item.id)) + 1
          : 1;
      setSubscriptions([...subscriptions, { ...currentSub, id: newId }]);
    }
    handleCloseModal();
  };

  // ====== Xoá subscription ======
  const handleDelete = (id: number) => {
    setSubscriptions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="subscription-container">
      {/* HEADER */}
      <div className="subscription-header">
        <h2>Subscription Management</h2>
        <button className="add-button" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add New Subscription
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="subscription-controls">
        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by subscription name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="subscription-table">
        <thead>
          <tr>
            <th>Subscription Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Category</th>
            <th>Psychologist</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubs.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.subscriptionName}</td>
              <td>{sub.description}</td>
              <td>{sub.price}</td>
              <td>{sub.duration}</td>
              <td>{sub.categoryName}</td>
              <td>{sub.psychologistName}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleOpenEditModal(sub)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(sub.id)}
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
            <h3>
              {editingId !== null ? "Edit Subscription" : "Create New Subscription"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subscription Name</label>
                <input
                  type="text"
                  value={currentSub.subscriptionName}
                  onChange={(e) =>
                    setCurrentSub({
                      ...currentSub,
                      subscriptionName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={currentSub.description}
                  onChange={(e) =>
                    setCurrentSub({
                      ...currentSub,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentSub.price}
                  onChange={(e) =>
                    setCurrentSub({
                      ...currentSub,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="number"
                  min="0"
                  value={currentSub.duration}
                  onChange={(e) =>
                    setCurrentSub({
                      ...currentSub,
                      duration: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={currentSub.categoryName}
                  onChange={(e) =>
                    setCurrentSub({
                      ...currentSub,
                      categoryName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Psychologist</label>
                <input
                  type="text"
                  value={currentSub.psychologistName}
                  onChange={(e) =>
                    setCurrentSub({
                      ...currentSub,
                      psychologistName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit">
                  {editingId !== null ? "Update Subscription" : "Create Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
