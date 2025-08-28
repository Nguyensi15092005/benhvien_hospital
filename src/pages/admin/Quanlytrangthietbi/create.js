import { Button, Card, Form, Input, Switch, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { postThietBi } from "../../../services/admin/TrangThietBi";
const { TextArea } = Input;


function ThemMoitTrangThietBi() {
  const [form]= Form.useForm();

  const handleSubmit = async (value) => {
    const res = await postThietBi(value);
    if(res.code === 200){
      form.resetFields();
    }
  }
  return (
    <>
      <Card>
        <h2 className="thietbi__title-create">Thêm mới thiết bị</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // style={{ maxWidth: 1000 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên thiết bị: " name="title" rules={[{ required: true, message: "Chưa nhập tên thiết bị!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả: " name="description" rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}>
            <TextArea />
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
export default ThemMoitTrangThietBi;