import { Button, Card, DatePicker, Form, Input, message, Radio, Switch, } from "antd";
import "./quanlybacsi.scss";
import UploadImage from "../../../helpers/uploadImage";
import { getBacSi, patchBacSi } from "../../../services/admin/BacSi.Service";
import { SelectKhoaId } from "../../../helpers/select";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function ChinhSuaBacSi() {
  const params = useParams();
  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getBacSi(params.id);
      if (res.bacsi) {
        setData(res.bacsi);
      }
    };
    fetchAPI();
  }, [params.id]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName,
        dateBirth: data.dateBirth ? dayjs(data.dateBirth) : null,
        phone: data.phone,
        email: data.email,
        address: data.address,
        khoa_id: data.khoa_id,
        degree: data.degree,
        sex: data.sex,
        status: data.status,
        image: data.image
      });
    }
  }, [data, form])
  const handleSubmit = async (value) => {
    value.dateBirth = value.dateBirth.format("YYYY-MM-DD");
    console.log(value);
    const res = await patchBacSi(params.id, value);
    if (res) {
      console.log(res);
      messageApi.open({
        type: 'success',
        content: `Chỉnh sửa thông tin Bác sĩ ${value.fullName} thành công`,
        duration: 3,
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Chỉnh sửa thông tin bác sĩ thất bại!!!',
        duration: 3,
      });
    }

  }
  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Chỉnh sửa thông tin bác sĩ</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // style={{ maxWidth: 1000 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Họ và tên: " name="fullName" rules={[{ required: true, message: "Chưa nhập họ tên!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày sinh: " name="dateBirth" rules={[{ required: true, message: "Chưa nhập ngày sinh!" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Số điện thoại: " name="phone" rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email: " name="email" rules={[{ required: true, message: "Chưa nhập email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ: " name="address" rules={[{ required: true, message: "Chưa nhập địa chỉ!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Khoa: " name="khoa_id" rules={[{ required: true, message: "Chưa chọn khoa!" }]}>
            <SelectKhoaId />
          </Form.Item>
          <Form.Item label="Học vị: " name="degree" rules={[{ required: true, message: "Chưa nhập học vị!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính: " name="sex" >
            <Radio.Group >
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nu"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="trạng thái" name="status" rules={[{ required: true }]}>
            <Switch
              checkedChildren="Bật"
              unCheckedChildren="Tắt"
            />
          </Form.Item>
          <Form.Item label="Ảnh" name="image">
            <UploadImage value={form.getFieldValue("image")} onUploaded={(url) => form.setFieldsValue({ image: url })} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Card >

    </>
  )
}
export default ChinhSuaBacSi;