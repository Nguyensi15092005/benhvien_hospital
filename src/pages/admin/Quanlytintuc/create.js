import { Button, Card, Form, Input, message, Switch, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import TinyMCE from "../../../component/tinyMCE";
import { useState } from "react";
import { postTinTuc } from "../../../services/admin/tintuc.service";

function ThemTinTuc() {
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value) => {
    const res = await postTinTuc(value);
    if (res) {
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Thêm mới thành công",
        duration: 3
      })
    }
    else {
      messageApi.open({
        type: "error",
        content: "Thêm mới thất bại",
        duration: 3
      })
    }
  };
  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="tintuc__title-create">Thêm mới tin tức & sự kiện</h2>
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Ảnh" name="image">
            <UploadImage onUploaded={(url) => form.setFieldsValue({ image: url })} />
          </Form.Item>
          <Form.Item label="Tiêu đề: " name="title" rules={[{ required: true, message: "Chưa nhập tiêu đề!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả: " name="content" rules={[{ required: true, message: "Chưa nhập mô tả!" }]}>
            <TinyMCE value={content} onChange={setContent} />
          </Form.Item>
          <Form.Item label="trạng thái" initialValue={true} name="status" valuePropName="checked" rules={[{ required: true }]}>
            <Switch
              checkedChildren="Bật"
              unCheckedChildren="Tắt"
            />
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
export default ThemTinTuc;