import { Button, Card,  Form, Input, message, Switch, } from "antd";
import { SelectRoleId } from "../../../helpers/select";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccount, patchAccount } from "../../../services/admin/account.service";

function ChinhSuaTaiKhoanAdmin() {
  const [data, setData] = useState();
  const params = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=>{
    const fetchApi = async () => {
      const res = await getAccount(params.id);
      if(res){
        setData(res.taikhoan);
      }
    };
    fetchApi();
  },[params.id])
  
  useEffect(()=>{
    if(data){
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role_id: data.role_id,
        status: data.status
      })
    }
  },[data, form])


  const handleSubmit = async (value) => {
    console.log(value)
    const res = await patchAccount(params.id, value);
    if(res.code === 200){
      setData(res.taikhoan)
      messageApi.success("Chỉnh sửa thành công");
    }
    else{
      messageApi.error("Chỉnh sửa tất bại!!!");
    }
  } 
  return (
    <> 
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Chỉnh sửa tài khoản admin</h2>
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
          <Form.Item label="Mật khẩu: " name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Quyền: " name="role_id" rules={[{ required: true, message: "Chưa chọn nhóm quyền!" }]}>
            <SelectRoleId />
          </Form.Item>
          <Form.Item label="trạng thái" name="status" rules={[{ required: true }]}>
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
export default ChinhSuaTaiKhoanAdmin;