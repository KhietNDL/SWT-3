import { useEffect, useState } from "react";
import { OrderDetailProps } from "../types/OrderDetail";

export function useOrderDetail(orderId?: string) {
  const [order, setOrder] = useState<OrderDetailProps | null>(null);

  useEffect(() => {
    if (!orderId) return;

    // 🔥 TẠM THỜI GIẢ DỮ LIỆU, SAU NÀY SẼ GỌI API
    const fakeOrder: OrderDetailProps = {
      id: orderId as string,
      packageName: "Khóa học React",
      fullname: "Nguyễn Văn A",
      orderDate: "2024-03-08",
      startDate: "2024-04-01",
      endDate: "2024-06-01",
      price: 2990000,
      duration: "2 tháng",
    };

    setOrder(fakeOrder);
  }, [orderId]);

  return { order };
}
