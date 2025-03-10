import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { setOrder } from "../../redux/features/orderSlice";
import "../../components/OrderDetail/OrderDetail.scss";
import { OrderDetailProps } from "../../types/OrderDetail";

const OrderDetail: React.FC = () => {
  console.log("🔥 OrderDetail.tsx đã render");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux Store
  const order = useSelector((state: RootState) => state.order?.currentOrder) as OrderDetailProps | null;
  const user = useSelector((state: RootState) => state.user) || { fullname: "Đang cập nhật" };

  console.log("Redux Order:", order);
  console.log("Redux User:", user);

  // Hàm cập nhật đơn hàng nếu chưa có dữ liệu
  const updateOrder = useCallback(() => {
    if (!order?.id) {
      const fakeOrder: OrderDetailProps = {
        id: "123456",
        programId: "PROG-001",
        packageName: "Khóa học React",
        fullname: user.fullname || "Đang cập nhật",
        orderDate: "2025-03-08",
        startDate: "2024-04-01",
        endDate: "2024-06-01",
        price: 2990000,
        duration: "2 tháng",
      };
      console.log("🔥 Đang cập nhật Redux Order:", fakeOrder);
      dispatch(setOrder(fakeOrder));
    }
  }, [order?.id, user.fullname, dispatch]);

  useEffect(() => {
    updateOrder();
  }, [updateOrder]);

  // Xử lý nếu không tìm thấy đơn hàng
  if (!order?.id) {
    return <div className="order-detail-container">Không tìm thấy đơn hàng!</div>;
  }

  // Xử lý điều hướng khi xác nhận đơn hàng
  const handleConfirm = () => {
    navigate(`/order-detail/${order.id}`);
  };

  return (
    <div className="order-detail-container">
      <div className="order-bill">
        <div className="bill-header">
          <h2>🧾 HÓA ĐƠN THANH TOÁN</h2>
          <span className="order-id">Mã đơn: #{order.id}</span>
        </div>

        <div className="bill-content">
          <div className="info-row"><span>ID Chương Trình:</span> <span>{order.programId || "Đang cập nhật"}</span></div>
          <div className="info-row"><span>Tên Gói:</span> <span>{order.packageName || "Đang cập nhật"}</span></div>
          <div className="info-row"><span>Người Đặt:</span> <span>{order.fullname || "Đang cập nhật"}</span></div>
          <div className="info-row"><span>Ngày Đặt:</span> <span>{order.orderDate || "Đang cập nhật"}</span></div>
          <div className="info-row"><span>Ngày Bắt Đầu:</span> <span>{order.startDate || "Đang cập nhật"}</span></div>
          <div className="info-row"><span>Ngày Kết Thúc:</span> <span>{order.endDate || "Đang cập nhật"}</span></div>
          <div className="info-row"><span>Thời Lượng:</span> <span>{order.duration || "Đang cập nhật"}</span></div>
          <div className="total-price">Tổng tiền: {order.price ? `${order.price.toLocaleString()} VND` : "Đang cập nhật"}</div>
        </div>

        <div className="bill-footer">
          <button className="confirm-button" onClick={handleConfirm}>✔ Đồng ý</button>
          <button className="cancel-button">❌ Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
