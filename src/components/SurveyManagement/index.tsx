import React, { useState } from "react";
import { Pencil, Trash2, Plus, Search, Filter } from "lucide-react";
import "./index.scss";

interface Survey {
  id: number;
  title: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
}

const initialSurveys: Survey[] = [
  { id: 1, title: "Customer Feedback", status: "Active", createdAt: "2024-03-01" },
  { id: 2, title: "Employee Satisfaction", status: "Inactive", createdAt: "2024-02-15" },
  { id: 3, title: "Market Research", status: "Pending", createdAt: "2024-01-20" },
];

const SurveyManagement: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    setSurveys(surveys.filter((survey) => survey.id !== id));
  };

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h2>Survey Management</h2>
        <button className="add-button">
          <Plus size={16} /> Add New Survey
        </button>
      </div>

      <div className="survey-controls">
        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <Filter size={16} /> Filter
        </button>
      </div>

      <table className="survey-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys
            .filter((survey) =>
              survey.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((survey) => (
              <tr key={survey.id}>
                <td>{survey.title}</td>
                <td>
                  <span className={`status ${survey.status.toLowerCase()}`}>
                    {survey.status}
                  </span>
                </td>
                <td>{survey.createdAt}</td>
                <td>
                  <button className="edit-button">
                    <Pencil size={16} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(survey.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyManagement;
