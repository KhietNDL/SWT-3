import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserInformation from "../../components/UserInformation";
import { ToastContainer } from "react-toastify";
function Info() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <UserInformation />
      <Footer />
    </div>
  );
}

export default Info;
