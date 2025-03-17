import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { DoctorType } from "../../types/doctor";
import { useParams } from "react-router-dom";
import { format, addDays, startOfWeek } from "date-fns";
import { vi } from "date-fns/locale"; // Import locale tiếng Việt
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DoctorInfo() {
  const [doctor, setDoctor] = useState<DoctorType | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { id } = useParams();
  const times = ["8:00 AM", "10:00 AM", "13:00 PM", "15:00 PM", "17:00 PM"];
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await axios.get(
        `http://localhost:5199/api/Psychologist/${id}`
      );
      setDoctor(response.data);
    };

    fetchDoctor();
  }, [id]);

  // Tạo mảng ngày mới thay cho mảng dates cứng
  const generateDates = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Bắt đầu từ thứ 2

    return Array.from({ length: 7 }).map((_, index) => {
      const date = addDays(startOfCurrentWeek, index);
      return {
        fullDate: date, // Lưu full date để xử lý
        displayDate: format(date, "dd/MM"), // Hiển thị ngày/tháng
        dayName: format(date, "EEEE", { locale: vi }), // Tên thứ tiếng Việt
      };
    });
  };

  const [dates, setDates] = useState(generateDates());

  // Cập nhật dates mỗi khi sang tuần mới (mỗi giờ)
  useEffect(() => {
    const timer = setInterval(() => {
      setDates(generateDates());
    }, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    // Lấy đối tượng ngày tương ứng từ mảng dates
    const selectedDateObj = dates.find((d) => d.displayDate === selectedDate);
    if (!selectedDateObj) {
      console.error("Không tìm thấy ngày phù hợp");
      return;
    }

    // Phân tích selectedTime (ví dụ: "8:00 AM")
    const [timePart, period] = selectedTime.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (period === "PM" && hours < 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Tạo đối tượng Date cho appointment và set giờ, phút
    const appointmentDate = new Date(selectedDateObj.fullDate);
    appointmentDate.setHours(hours, minutes, 0, 0);
    appointmentDate.setHours(appointmentDate.getHours() + 7); // UTC+7
    const appointmentDateISO = appointmentDate.toISOString();

    // Tạo object đặt lịch với thông tin cần thiết
    const appointmentObj = {
      accountId: user?.id,           // Chỉnh sửa nếu tên thuộc tính khác
      psychologistId: id,      // Hoặc dùng id từ params nếu phù hợp
      appointmentDate: appointmentDateISO
    };

    // Gửi request POST đến API
    try {
      const response = await axios.post("http://localhost:5199/Appointment", appointmentObj);
      toast.success("Đặt lịch thành công!", {
        position: "top-right",
        autoClose: 3000, // Đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Thêm thông báo thành công hoặc chuyển trang nếu cần
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      toast.error("Đặt lịch thất bại! Vui lòng thử lại.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setIsBookingOpen(false);
  };

  const handleBookingClick = () => {
    if (!user) {
      Modal.warning({
        title: "Yêu cầu đăng nhập",
        content: "Vui lòng đăng nhập để đặt lịch khám.",
        okText: "Đăng nhập ngay",
        onOk: () => navigate("/login"),
        onCancel: () => {},
        maskClosable: true,
      });
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <>
      <div className="doctor-information">
        <div className="doctor-profile">
          <div className="doctor-image">
            <img src={doctor?.poster_path} alt={doctor?.name} />
          </div>
          <h2 className="doctor-name">TS. BSCK II NGUYỄN VĂN DŨNG</h2>
          <p className="doctor-position">
            Phó viện trưởng Viện sức khỏe tâm thần Bệnh viện Bạch Mai Hà Nội
          </p>

          <div className="profile-section">
            <h3 className="section-title">LÝ LỊCH CÁ NHÂN</h3>
            <div className="info-item">
              <div className="label">Họ và tên:</div>
              <div className="value">Nguyễn Văn Dũng</div>
            </div>
            <div className="info-item">
              <div className="label">Nơi đào tạo:</div>
              <div className="value">Trường Đại học Y Hà Nội</div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">THÀNH TÍCH</h3>
            <div className="info-item">
              <div className="value">
                - Bằng khen của chủ tịch nước, của tổng bí thư và phó thủ tướng
                nước CNHXCN Việt Nam trao tặng
              </div>
            </div>
            <div className="info-item">
              <div className="value">
                - Bằng khen của bộ trưởng bộ y tế... và các cấp khác
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">THÔNG TIN LIÊN HỆ</h3>
            <div className="info-item">
              <div className="label">Địa chỉ:</div>
              <div className="value">
                Tầng 7 tòa nhà 59 Võ Chí Công, Phường Nghĩa Đô, Quận Cầu Giấy,
                Tp. Hà Nội, Việt Nam
              </div>
            </div>
            <div className="info-item">
              <div className="label">Tổng đài tư vấn:</div>
              <div className="value">19003307</div>
            </div>
            <div className="info-item">
              <div className="label">Email:</div>
              <div className="value">lienhe@braincare.vn</div>
            </div>
            <div className="info-item">
              <div className="label">Website:</div>
              <div className="value">www.braincare.vn</div>
            </div>
          </div>
        </div>

        <div className="doctor-details">
          <div className="section">
            <h3 className="section-title">KINH NGHIỆM LÀM VIỆC CÁ NHÂN</h3>
            <div className="content">
              <p>
                Tiến sĩ Bác sĩ Chuyên khoa 2 Nguyễn Văn Dũng là bác sĩ Cao cấp
                hàng đầu của Viện sức khỏe tâm thần – Bệnh viện Bạch Mai.
              </p>
              <p>
                Là người thầy luôn tận tâm với bệnh nhân, với nhiều năm kinh
                nghiệm công tác tại các Bệnh viện tuyến đầu Việt Nam về lĩnh vực
                "Sức khỏe tâm thần" đã giúp cho rất nhiều bệnh nhân có thể trở
                lại cuộc sống bình thường.
              </p>
              <p>
                TS. BSCK II Nguyễn Văn Dũng trong quá trình công tác của mình đã
                có rất nhiều "Bằng khen" mà trong đó có danh hiệu rất cao quý
                của người thầy thuốc: "Thầy thuốc Ưu tú" do Thủ tướng chính phủ
                nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam khen tặng.
              </p>
            </div>
          </div>

          <button
            className="book-button"
            onClick={handleBookingClick}
          >
            Đặt lịch
          </button>
        </div>
      </div>

      <Modal
        open={isBookingOpen}
        onCancel={() => setIsBookingOpen(false)}
        footer={null}
        width={650}
        className="booking-modal"
      >
        <div className="booking-form">
          <div className="doctor-info">
            <img src={doctor?.poster_path} alt={doctor?.name} />

            <div className="info">
              <h2>TS. BSCK II NGUYỄN VĂN DŨNG</h2>
              <p>
                Phó viện trưởng Viện sức khỏe tâm thần Bệnh viện Bạch Mai Hà Nội
              </p>
            </div>
          </div>

          <div className="booking-dates">
            <h3>Chọn ngày khám</h3>
            <div className="date-buttons">
              {dates.map((date) => (
                <button
                  key={date.displayDate}
                  className={`date-button ${
                    selectedDate === date.displayDate ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDate(date.displayDate)}
                >
                  <div className="date-day">{date.dayName}</div>
                  <div className="date-number">{date.displayDate}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="booking-times">
            <h3>Chọn giờ khám</h3>
            <div className="time-buttons">
              {times.map((time) => (
                <button
                  key={time}
                  className={`time-button ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="booking-note">
            <h3>Yêu cầu khám</h3>
            <textarea placeholder="Nhập yêu cầu khám của bạn..." rows={4} />
          </div>

          <Button
            type="primary"
            className="submit-button"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime}
          >
            Đặt lịch
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DoctorInfo;
