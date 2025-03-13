import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, XCircle } from "lucide-react";
import "./index.scss";

// ✅ Định nghĩa `id` là `string`
interface Subscription {
  id?: string;
  subscriptionName: string;
  description: string;
  price: number;
  duration: number;
  categoryName: string;
  psychologistName: string;
}

// ✅ Props để cập nhật `Program.tsx`
interface ProgramManagementProps {
  onProgramUpdated?: () => void;
}

const API_URL = "http://localhost:5199/Subscription";

const SubscriptionManagement: React.FC<ProgramManagementProps> = ({ onProgramUpdated }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentSub, setCurrentSub] = useState<Subscription>({
    subscriptionName: "",
    description: "",
    price: 0.01,
    duration: 0,
    categoryName: "",
    psychologistName: "",
  });

  // ✅ Lấy danh sách từ API
  const fetchSubscriptions = async () => {
    try {
      console.log("⏳ Fetching subscriptions...");
      const response = await fetch(API_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("Không thể lấy dữ liệu từ API");

      const data: Subscription[] = await response.json();
      console.log("📢 Dữ liệu từ API:", data);
      setSubscriptions(data);

      // ✅ Cập nhật dữ liệu bên `Program.tsx`
      if (onProgramUpdated) onProgramUpdated();
    } catch (error) {
      console.error("⚠ Lỗi khi gọi API:", error);
    }
  };

  // ✅ Gọi API khi component mount
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // ✅ Mở Modal để thêm mới
  const handleOpenAddModal = () => {
    setEditingId(null);
    setCurrentSub({
      subscriptionName: "",
      description: "",
      price: 0.01,
      duration: 0,
      categoryName: "",
      psychologistName: "",
    });
    setShowModal(true);
  };

  // ✅ Mở Modal để chỉnh sửa
  const handleOpenEditModal = (sub: Subscription) => {
    setEditingId(sub.id || null);
    setCurrentSub(sub);
    setShowModal(true);
  };

  // ✅ Đóng Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  // ✅ Xử lý Submit Form (Thêm/Sửa)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📤 Đang gửi dữ liệu lên API:", currentSub);
    
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : `${API_URL}/Create`;
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSub),
      });
  
      console.log("📡 Response từ server:", response.status);
      if (!response.ok) throw new Error("❌ Lưu không thành công!");
  
      await response.json();
      console.log("✅ Lưu thành công, gọi `onProgramUpdated()`...");
  
      fetchSubscriptions();
      if (onProgramUpdated) onProgramUpdated(); // 🚀 Cập nhật Program.tsx
      setShowModal(false);
    } catch (error) {
      console.error("🚨 Lỗi khi gửi API:", error);
    }
  };
  

  // ✅ Xóa Subscription
  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
  
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete subscription");
  
      console.log("✅ Xóa thành công, gọi `onProgramUpdated()`...");
      fetchSubscriptions();
      if (onProgramUpdated) onProgramUpdated(); // 🚀 Cập nhật Program.tsx
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
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
          {subscriptions
            .filter((sub) => sub.subscriptionName?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((sub) => (
              <tr key={sub.id}>
                <td>{sub.subscriptionName}</td>
                <td>{sub.description}</td>
                <td>${sub.price.toLocaleString()}</td>
                <td>{sub.duration} days</td>
                <td>{sub.categoryName}</td>
                <td>{sub.psychologistName}</td>
                <td>
                  <button className="edit-button" onClick={() => handleOpenEditModal(sub)}>
                    <Pencil size={16} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(sub.id!)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* MODAL (Add/Edit Subscription) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId !== null ? "Edit Subscription" : "Create New Subscription"}</h3>
              <button className="close-button" onClick={handleCloseModal}>
                <XCircle size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <input type="text" placeholder="Subscription Name" value={currentSub.subscriptionName} onChange={(e) => setCurrentSub({ ...currentSub, subscriptionName: e.target.value })} required />
              <textarea placeholder="Description" value={currentSub.description} onChange={(e) => setCurrentSub({ ...currentSub, description: e.target.value })} />
              <input type="number" placeholder="Price" value={currentSub.price} onChange={(e) => setCurrentSub({ ...currentSub, price: Number(e.target.value) })} required />
              <input type="number" placeholder="Duration" value={currentSub.duration} onChange={(e) => setCurrentSub({ ...currentSub, duration: Number(e.target.value) })} required />
              <input type="text" placeholder="Category" value={currentSub.categoryName} onChange={(e) => setCurrentSub({ ...currentSub, categoryName: e.target.value })} />
              <input type="text" placeholder="Psychologist" value={currentSub.psychologistName} onChange={(e) => setCurrentSub({ ...currentSub, psychologistName: e.target.value })} />
              <button type="submit">{editingId !== null ? "Update" : "Create"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
