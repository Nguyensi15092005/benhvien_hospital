import { Button, Card, DatePicker, Form, Input, message, Radio } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getBenhNhan, patchBenhNhan } from "../../../services/admin/BenhNhan.Service";
import { SelectStatusBenhNhan } from "../../../helpers/select";

function ChinhSuaBenhNhan() {
  const [data, setData] = useState();
  const params = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getBenhNhan(params.id);
      if (res) {
        setData(res.benhnhan);
      }
    };
    fetchAPI();
  }, [params.id]);
  useEffect(()=>{
    if(data){
      form.setFieldsValue({
        fullName: data.fullName,
        dateBirth: data.dateBirth ? dayjs(data.dateBirth) : null,
        phone: data.phone,
        cccd: data.cccd,
        bhyt: data.bhyt,
        address: data.address,
        email: data.email,
        node: data.node,
        sex: data.sex,
        status: data.status
      })
    }
  },[data, form]);

  const handleSubmit = async (value) => {
    value.dateBirth = value.dateBirth.format("YYYY-MM-DD");
    const res = await patchBenhNhan(params.id, value);
    if(res.code === 200){
      setData(res.benhnhan);
      messageApi.success("Chỉnh sửa thông tin bệnh nhân.");
    }
    else{
      messageApi.error("Chỉnh sửa thông tin thấy bại vui lòng thử lại sau.");
    }
  }

  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="benhnhan__title-create">Chỉnh sửa thông tin bệnh nhân</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
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
          <Form.Item label="Mã Cccd: " name="cccd" rules={[{ required: true, message: "Chưa nhập mã Cccd!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mã bảo hiểm y tê: " name="bhyt" >
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ: " name="address" >
            <Input />
          </Form.Item>
          <Form.Item label="Email: " name="email" >
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú: " name="node" >
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính: " name="sex" >
            <Radio.Group >
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nu"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="trạng thái" name="status">
            <SelectStatusBenhNhan/>
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
export default ChinhSuaBenhNhan