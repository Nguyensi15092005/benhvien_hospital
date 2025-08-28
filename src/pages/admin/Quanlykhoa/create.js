import { Button, Card, DatePicker, Form, Input, message, Switch, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import TinyMCE from "../../../component/tinyMCE";
import { useState } from "react";
import { postKhoa } from "../../../services/admin/khoa.Service";
function ThemMoiKhoa () {
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value) =>{
    value.dateEstablishment = value.dateEstablishment.format("YYYY-MM-DD");
    const res = await postKhoa(value);
    console.log(res)
    if(res){
      form.resetFields();
      messageApi.open({
        type: "success",
        content:"Thêm mới khoa thành công",
        duration: 3
      })
    }
    else{
      messageApi.open({
        type: "error",
        content: "Thêm mới khoa thất bại",
        duration: 3
      })
    }
  };
  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Thêm mới Khoa</h2>
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
            <TinyMCE value={content} onChange={setContent}/>
          </Form.Item>
          <Form.Item label="trạng thái" initialValue={true} name="status" valuePropName="checked" rules={[{ required: true }]}>
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
export default ThemMoiKhoa;