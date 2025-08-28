import { Button, Card,  Form, Input, message, Switch, } from "antd";
import { postNhomQuyen } from "../../../services/admin/NhomQuyen.service";
const { TextArea } = Input;

function ThemMoiNhomQuyen() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (value) => {
    const res = await postNhomQuyen(value);
    if(res.code === 200){
      form.resetFields();
      messageApi.success("Thêmm mới nhóm quyền thành công");
    }
    else{
      messageApi.error("Thêm mới thất bại!!!");
    }
  } 
  return (
    <> 
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Thêm mới nhóm quyền</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên Quyền: " name="name" rules={[{ required: true, message: "Chưa nhập tên quyền!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả: " name="description" rules={[{ required: true, message: "Chưa nhập mô tả!" }]}>
            <TextArea />
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
};
export default ThemMoiNhomQuyen;