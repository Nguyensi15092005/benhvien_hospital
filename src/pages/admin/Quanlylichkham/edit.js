import { Button, Card, DatePicker, Form, Input, message, Radio, Switch } from "antd";
import { SelectBacSiId, SelectKhoaId } from "../../../helpers/select";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getLichKham, patchLichKham } from "../../../services/admin/lichkham.service";
import { FaRegIdCard } from "react-icons/fa";
import { RiVipFill } from "react-icons/ri";
const { TextArea } = Input;


function ChinhSuaLichKham() {
  const params = useParams();
  const [khoaId, setKhoaId] = useState();
  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getLichKham(params.id);
      if (res) {
        setData(res.lichkham);
      }
    };
    fetchAPI();
  }, [params.id]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        khoa_id: data.khoa_id,
        bacsi_id: data.bacsi_id,
        service: data.service,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        dateBirth: dayjs(data.dateBirth),
        examination_date: dayjs(data.examination_date),
        note: data.note,
        status: data.status
      });
    }
  }, [data, form])
  const handleKhoaId = (e) => {
    setKhoaId(e);
  }
  useEffect(() => {

    if (data && !khoaId) {
      setKhoaId(data.khoa_id)
    }
  }, [data, khoaId])

  const handleSubmit = async (value) => {
    value.dateBirth = value.dateBirth.format("YYYY-MM-DD");
    value.examination_date = value.examination_date.toISOString();

    const res = await patchLichKham(params.id, value);
    if (res) {
      console.log(res);
      messageApi.open({
        type: 'success',
        content: `Chỉnh sửa thông tin Lịch khám ${value.fullName} thành công`,
        duration: 3,
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Chỉnh sửa thông tin thất bại!!!',
        duration: 3,
      });
    }

  }
  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Chỉnh sửa thông tin lịch khám</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout=""
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
          <Form.Item label="trạng thái" name="status" rules={[{ required: true }]}>
            <Switch
              checkedChildren="Đã duyệt"
              unCheckedChildren="Chưa duyệt"
            />
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
          <Form.Item label={null}>
            <Button size="large" type="primary" htmlType="submit" className="modalkb__button">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Card >

    </>
  )
}
export default ChinhSuaLichKham;