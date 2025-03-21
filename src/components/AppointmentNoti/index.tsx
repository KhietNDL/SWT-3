import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { User } from "../../types/user";
interface Appointment {
  id: string;
  createAt: string;
  modifiedAt: string;
  appointmentDate: string;
  accountId: string;
  account: User;
  psychologistId: string;
  status: string;
}

const Notification: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
    const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.id) { 
        console.log(user.id);
      axios.get(`http://localhost:5199/Appointment/316d922e-5cdd-4df0-bc2e-744b2aa6b42e/Psychologist`)
        .then(response => {
          setAppointments(response.data.filter((appt: Appointment) => appt.status === "pending"));
        })
        .catch(error => console.error("Error fetching appointments:", error));
    }
  }, [user.id]); 
  

  const confirmAppointment = (id: string) => {
    axios.put(`http://localhost:5199/Appointment/${id}/confirm`)
      .then(() => {
        setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status: "confirmed" } : appt));
      })
      .catch(error => console.error("Error confirming appointment:", error));
  };

  return (
    <div className="notification-container">
      <h2>Appointment Notifications</h2>
      {appointments.length === 0 ? (
        <p>No pending appointments.</p>
      ) : (
        appointments.map(appt => (
          <div key={appt.id} className="notification-card">
            <h3>{appt.account.fullname}</h3>
            <p>Email: {appt.account.email}</p>
            <p>Phone: {appt.account.phone}</p>
            <p>Address: {appt.account.address}</p>
            <p>Appointment Date: {new Date(appt.appointmentDate).toLocaleString()}</p>
            <button onClick={() => confirmAppointment(appt.id)}>Confirm</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
