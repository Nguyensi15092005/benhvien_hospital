import { Button, Card,  Form, Input, message, Switch, } from "antd";
import { SelectRoleId } from "../../../helpers/select";
import { generateToken } from "../../../helpers/generateToken";
import { postAccount } from "../../../services/admin/account.service";

function ThemTaiKhoanAdmin() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (value) => {
    const tokenAdmin = generateToken(30);
    const option = {
      name : value.name,
      email: value.email,
      phone: value.phone,
      password: value.password,
      role_id: value.role_id,
      status: value.status,
      tokenAdmin: tokenAdmin
    };
    const res = await postAccount(option);
    if(res.code === 200){
      form.resetFields();
      messageApi.success(res.message);
    }
    else{
      messageApi.error(res.message);
    }
  } 
  return (
    <> 
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Thêm mới tài khoản admin</h2>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên: " name="name" rules={[{ required: true, message: "Chưa nhập tên!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email: " name="email" rules={[{ required: true, message: "Chưa nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại: " name="phone" rules={[{ required: true, message: "Chưa nhập Số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu: " name="password" rules={[{ required: true, message: "Chưa nhập mật khẩu!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Quyền: " name="role_id" rules={[{ required: true, message: "Chưa chọn nhóm quyền!" }]}>
            <SelectRoleId />
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
export default ThemTaiKhoanAdmin;