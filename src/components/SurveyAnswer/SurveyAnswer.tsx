import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../types/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import { SurveyType } from "../../types/SurveyType";


const SurveyTypeManagement: React.FC = () => {
  const [surveyTypes, setSurveyTypes] = useState<SurveyType[]>([]);
  const [currentSurveyType, setCurrentSurveyType] = useState<SurveyType | null>(null);
  const [newSurveyTypeName, setNewSurveyTypeName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSurveyTypes();
  }, []);

  const fetchSurveyTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5199/SurveyType");
      setSurveyTypes(response.data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách loại khảo sát", toastConfig);
    }
  };


  const filteredSurveyTypes = surveyTypes.filter((type) =>
    type.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!newSurveyTypeName.trim()) {
      toast.error("Tên loại khảo sát không được để trống", toastConfig);
      return;
    }

    const isDuplicate = surveyTypes.some(
      (type) => type.surveyName.toLowerCase() === newSurveyTypeName.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Tên loại khảo sát đã tồn tại", toastConfig);
      return;
    }

    try {
      if (modalType === "add") {
        await axios.post("http://localhost:5199/SurveyType", { surveyName: newSurveyTypeName });
        toast.success("Thêm loại khảo sát thành công", toastConfig);
      } else if (modalType === "edit" && currentSurveyType) {
        await axios.put(`http://localhost:5199/SurveyType/${currentSurveyType.id}`, {
          surveyName: newSurveyTypeName,
        });
        toast.success("Cập nhật loại khảo sát thành công", toastConfig);
      }
      fetchSurveyTypes();
      setIsModalOpen(false);
      setNewSurveyTypeName("");
    } catch (error) {
      toast.error("Lỗi khi lưu loại khảo sát", toastConfig);
    }
  };

  const handleDelete = async () => {
    if (!currentSurveyType) return;
    try {
      await axios.delete(`http://localhost:5199/SurveyType/${currentSurveyType.id}`);
      toast.success("Xóa loại khảo sát thành công", toastConfig);
      fetchSurveyTypes();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi xóa loại khảo sát", toastConfig);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1>Quản Lý Loại Khảo Sát</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm kiếm loại khảo sát..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="search-icon" />
      </div>

      <button onClick={() => { setModalType("add"); setIsModalOpen(true); }}>Thêm Loại Khảo Sát</button>

      <table>
        <thead>
          <tr>
            <th>Mã loại khảo sát</th>
            <th>Tên Loại Khảo Sát</th>
            <th>Trạng Thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredSurveyTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.surveyName}</td>
              <td className={type.isDeleted ? "inactive" : "active"}>
                {type.isDeleted ? "Inactive" : "Active"}
              </td>
              <td className="actions">
                {!type.isDeleted ? (
                  <>
                    <button
                      onClick={() => {
                        setCurrentSurveyType(type);
                        setNewSurveyTypeName(type.surveyName);
                        setModalType("edit");
                        setIsModalOpen(true);
                      }}
                    >
                      <FiEdit2 /> Chỉnh Sửa
                    </button>
                    <button
                      className="delete"
                      onClick={() => {
                        setCurrentSurveyType(type);
                        setModalType("delete");
                        setIsModalOpen(true);
                      }}
                    >
                      <FiTrash2 /> Xóa
                    </button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {isModalOpen && (
        <div className="modal">
          <h2>{modalType === "add" ? "Thêm" : modalType === "edit" ? "Chỉnh sửa" : "Xóa"} Loại Khảo Sát</h2>
          {modalType !== "delete" ? (
            <input
              type="text"
              value={newSurveyTypeName}
              onChange={(e) => setNewSurveyTypeName(e.target.value)}
              placeholder="Nhập tên loại khảo sát"
            />
          ) : (
            <p>Bạn có chắc chắn muốn xóa loại khảo sát này?</p>
          )}
          <button onClick={modalType === "delete" ? handleDelete : handleSave}>Xác Nhận</button>
          <button onClick={() => setIsModalOpen(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default SurveyTypeManagement;
