import { Button, Card, Form, Input, message, Switch, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import TinyMCE from "../../../component/tinyMCE";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTinTuc, patchTinTuc } from "../../../services/admin/tintuc.service";
function ChinhSuaTinTuc() {
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getTinTuc(params.id);
      if (res) {
        setData(res.tintuc);
      }
    };
    fetchAPI();
  }, [params.id]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        image: data.image,
        title: data.title,
        content: data.content,
        status: data.status
      })
    }
  }, [data, form])

  const handleSubmit = async (value) => {
    const res = await patchTinTuc(params.id, value);
    if (res) {
      setData(res.tintuc);
      messageApi.success("Chỉnh sửa thành công.")
    }
    else {
      messageApi.error("Chỉnh sửa thất bại!!!");
    }

  };
  return (
    <>
      {contextHolder}
      <Card>
        <h2 className="tintuc__title-create">Chỉnh sửa tin tức & sự kiện</h2>
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

export default ChinhSuaTinTuc;