import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderDetail from "../../components/OrderDetail/OrderDetail";  // ✅ Import đúng
import { RootState } from "../../redux/Store"; 
import '../../components/OrderDetail/OrderDetail.scss';  // Import SCSS

function OrderDetailPage() {
  const { id } = useParams();

  // ✅ Lấy user từ Redux
  const user = useSelector((state: RootState) => state.user);
  console.log("User Redux:", user); // Kiểm tra Redux có dữ liệu không

  return (
    <div>
      <Header />
      <OrderDetail /> 
      <Footer />
    </div>
  );
}

export default OrderDetailPage;
