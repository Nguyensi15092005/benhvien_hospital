import { Button, Card, DatePicker, Form, Input, message, Switch, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import TinyMCE from "../../../component/tinyMCE";
import { useEffect, useState } from "react";
import { getKhoa, patchKhoa } from "../../../services/admin/khoa.Service";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
function ChinhSuaKhoa() {
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getKhoa(params.id);
      if (res) {
        setData(res.khoa);
      }
    };
    fetchAPI();
  }, [params.id]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        headDepartment: data.headDepartment,
        dateEstablishment: dayjs(data.dateEstablishment),
        phone: data.phone,
        email: data.email,
        description: data.description,
        status: data.status,
        image: data.image,
      })
    }
  }, [data, form])

  const handleSubmit = async (value) => {
    value.dateEstablishment = value.dateEstablishment.format("YYYY-MM-DD");
    const res = await patchKhoa(params.id, value);
    if (res) {
      setData(res.khoa);
      messageApi.success("Chỉnh sửa thông tin khoa thành công.")
    }
    else {
      messageApi.error("Chỉnh sửa thất bại!!!");
    }

  };
  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Chỉnh sửa thông tin khoa</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên khoa: " name="name" rules={[{ required: true, message: "Chưa nhập tên khoa!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tên trưởng khoa: " name="headDepartment" rules={[{ required: true, message: "Chưa nhập tên trưởng khoa!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày thành lập: " name="dateEstablishment" rules={[{ required: true, message: "Chưa chọn ngày thành lập!" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Số điện thoại: " name="phone" rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email: " name="email" rules={[{ required: true, message: "Chưa nhập email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả: " name="description" rules={[{ required: true, message: "Chưa nhập mô tả!" }]}>
            <TinyMCE value={content} onChange={setContent} />
          </Form.Item>
          <Form.Item label="trạng thái" name="status" rules={[{ required: true }]}>
            <Switch
              checkedChildren="Bật"
              unCheckedChildren="Tắt"
            />
          </Form.Item>
          <Form.Item label="Ảnh" name="image">
            <UploadImage onUploaded={(url) => form.setFieldsValue({ image: url })} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Card>

    </>
  )
}

export default ChinhSuaKhoa;