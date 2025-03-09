import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { toastConfig } from "../../types/toastConfig";
import "./SurveyManagement.scss";

const SurveyManagement = () => {
  interface Survey {
    id: string | number;
    surveyName: string;
  }

  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch("http://localhost:5199/SurveyType");
        if (!response.ok) {
          throw new Error("Failed to fetch surveys");
        }
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleEdit = (survey: Survey) => {
    setCurrentSurvey(survey);
    setShowModal(true);
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        const response = await fetch(`http://localhost:5199/SurveyType/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete survey");
        }

        setSurveys(surveys.filter((survey) => survey.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete survey. Please try again.");
      }
    }
  };

  const filteredSurveys = surveys.filter((survey) =>
    survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="survey-management">
      <div className="header">
        <h1>Survey Management</h1>
        <button type="button" onClick={() => setShowModal(true)} className="AddSurvey">
          <FiPlus /> Add New Survey
        </button>
      </div>

      <div className="controls">
        <div className="search-box">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurveys.length > 0 ? (
              filteredSurveys.map((survey) => (
                <tr key={survey.id}>
                  <td>{survey.id}</td>
                  <td>{survey.surveyName}</td>
                  <td>
                    <button type="button" className="btn btn-edit" onClick={() => handleEdit(survey)}>
                      <FiEdit2 />
                    </button>
                    <button type="button" className="btn btn-delete" onClick={() => handleDelete(survey.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-results">
                  No surveys found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyManagement;
