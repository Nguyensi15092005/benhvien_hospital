import { Button, DatePicker, Form, Input, Modal, notification, Radio } from "antd";
import { useState } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { SelectBacSiId, SelectKhoaId } from "../../../helpers/select";
import { RiVipFill } from "react-icons/ri";
import { postLichKham } from "../../../services/admin/lichkham.service";


const { TextArea } = Input;
function ButtonModal() {
  const [khoaId, setKhoaId] = useState();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageNotifi, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    messageNotifi.success({
      message: "Thành công",
      description: "Chúc mừng bạn đã đặt lịch thành công. Nhân viên sẽ liên hệ với bạn trong vòng 24h.",
      placement,
    });
  };
  const handleSubmit = async (value) => {
    value.examination_date = value.examination_date.toISOString();// "2025-08-05T07:30:00.000Z"
    value.dateBirth = value.dateBirth.toISOString();
    const res = await postLichKham(value);
    if (res) {
      form.resetFields();
      openNotification('top');
    }
  }
  const handleKhoaId = (e) => {
    setKhoaId(e);
  }

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {contextHolder}
      <button className="modalkb__button-modal" onClick={showLoading}>Đặt lịch khám bênh</button>
      <Modal
        className="modalkb"
        title={<h3 className="modalkb__title">ĐĂNG KÝ KHÁM BỆNH</h3>}
        loading={loading}
        footer={null}
        open={open}
        width={600}
        onCancel={() => setOpen(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Chọn chuyên khoa: " name="khoa_id" rules={[{ required: true, message: "Chưa chọn khoa!" }]}>
            <SelectKhoaId onChange={handleKhoaId} />
          </Form.Item>
          <Form.Item label="Chọn bác sĩ (Không bắt buộc): " name="bacsi_id" >
            <SelectBacSiId khoaId={khoaId} />
          </Form.Item>
          <Form.Item label="Chọn dịch vụ khám: " name="service" rules={[{ required: true, message: "Chưa chọn dịch vụ khám!" }]}>
            <Radio.Group >
              <Radio className="modalkb__radio" value="thuong"> <FaRegIdCard /> Khám tiêu chuẩn </Radio>
              <Radio className="modalkb__radio" value="vip"> <RiVipFill /> Khám VIP</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Chọn ngày-giờ muốn khám: " name="examination_date" rules={[{ required: true, message: "Chưa chọn ngày khám!" }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item label="Nhập vấn đề sức khỏe cần khám: " name="note" rules={[{ required: true, message: "Chưa nhập vấn đề sức khỏe!" }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Họ và tên: " name="fullName" rules={[{ required: true, message: "Chưa nhập họ tên!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày Sinh: " name="dateBirth" rules={[{ required: true, message: "Chưa chọn ngày sinh!" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Số điện thoại: " name="phone" rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email: " name="email" rules={[{ required: true, message: "Chưa nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label={null} className="modalkb__button">
            <Button size="large" type="primary" htmlType="submit" className="modalkb__button">
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}
export default ButtonModal;