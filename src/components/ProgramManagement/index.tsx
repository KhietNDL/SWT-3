import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import "./index.scss";
// ====== INTERFACE & DATA MẪU ======
interface Program {
  id: number;
  name: string;
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: "Open" | "Full" | "Closed";
}

const initialPrograms: Program[] = [
  {
    id: 2,
    name: "Happy to School",
    description:
      "Support program to ease children's transition to school environment.",
    duration: "12 weeks",
    startDate: "2023-09-15",
    endDate: "2023-12-08",
    status: "Full",
  },
  {
    id: 1,
    name: "Sleep Support",
    description:
      "A program designed to help participants improve their sleep quality and habits.",
    duration: "30 days",
    startDate: "2023-10-01",
    endDate: "2023-10-30",
    status: "Open",
  },
  {
    id: 3,
    name: "Stress Management",
    description: "Techniques and practices to reduce and manage daily stress.",
    duration: "8 weeks",
    startDate: "2023-11-01",
    endDate: "2023-12-27",
    status: "Closed",
  },
];

// ====== COMPONENT CHÍNH ======
const ProgramManagement: React.FC = () => {
  // State quản lý danh sách Program
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  // State quản lý tìm kiếm và filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // State điều khiển hiển thị Modal Add New
  const [showModal, setShowModal] = useState<boolean>(false);

  // State lưu tạm thông tin Program mới
  const [newProgram, setNewProgram] = useState<Program>({
    id: 0,
    name: "",
    description: "",
    duration: "",
    startDate: "",
    endDate: "",
    status: "Open",
  });

  // ====== Xử lý xoá Program ======
  const handleDelete = (id: number) => {
    setPrograms(programs.filter((program) => program.id !== id));
  };

  // ====== Lọc Program theo SearchTerm & Status ======
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || program.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // ====== Mở form Add New ======
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // ====== Đóng form Add New & reset dữ liệu ======
  const handleCloseModal = () => {
    setShowModal(false);
    setNewProgram({
      id: 0,
      name: "",
      description: "",
      duration: "",
      startDate: "",
      endDate: "",
      status: "Open",
    });
  };

  // ====== Submit form Add New ======
  const handleAddProgram = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sinh ID mới (cách đơn giản)
    const newId =
      programs.length > 0 ? Math.max(...programs.map((p) => p.id)) + 1 : 1;

    // Tạo object Program mới
    const programToAdd = {
      ...newProgram,
      id: newId,
    };

    // Cập nhật state
    setPrograms([...programs, programToAdd]);

    // Đóng Modal
    handleCloseModal();
  };

  return (
    <div className="program-container">
      <div className="program-header">
        <h2>Support Program Management</h2>
        <button className="add-button" onClick={handleOpenModal}>
          <Plus size={16} /> Add New Program
        </button>
      </div>

      <div className="program-controls">
        {/* Search bar */}
        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dropdown filter */}
        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Filter size={16} />
            Status: {selectedStatus}
            <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <ul className="dropdown-menu">
              {["All", "Open", "Full", "Closed"].map((status) => (
                <li
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setShowDropdown(false);
                  }}
                >
                  {status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Bảng hiển thị danh sách Program */}
      <table className="program-table">
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrograms.map((program) => (
            <tr key={program.id}>
              <td>
                <strong>{program.name}</strong>
                <br />
                <span className="program-id">ID: {program.id}</span>
              </td>
              <td>{program.description}</td>
              <td>{program.duration}</td>
              <td>
                Start: {program.startDate} <br />
                End: {program.endDate}
              </td>
              <td>
                <span className={`status ${program.status.toLowerCase()}`}>
                  {program.status}
                </span>
              </td>
              <td>
                <button className="edit-button">
                  <Pencil size={16} />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(program.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Add New Program */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Program</h3>
            <form onSubmit={handleAddProgram}>
              <div className="form-group">
                <label>Program Name</label>
                <input
                  type="text"
                  value={newProgram.name}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProgram.description}
                  onChange={(e) =>
                    setNewProgram({
                      ...newProgram,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 30 days, 12 weeks"
                  value={newProgram.duration}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, duration: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={newProgram.startDate}
                  onChange={(e) =>
                    setNewProgram({
                      ...newProgram,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={newProgram.endDate}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, endDate: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={newProgram.status}
                  onChange={(e) =>
                    setNewProgram({
                      ...newProgram,
                      status: e.target.value as "Open" | "Full" | "Closed",
                    })
                  }
                >
                  <option value="Open">Open</option>
                  <option value="Full">Full</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit">Create Program</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramManagement;