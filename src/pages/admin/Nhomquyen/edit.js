import { Button, Card,  Form, Input, message, Switch, } from "antd";
import { getNhomQuyen, patchNhomQuyen } from "../../../services/admin/NhomQuyen.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

function ChinhSuaNhomQuyen() {
  const [data, setData] = useState();
  const params = useParams()
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=> {
    const fetchApi = async () =>{
      const res = await getNhomQuyen(params.id);
      if(res){
        setData(res.role);
      }
    };
    fetchApi();
  },[params.id]);
  useEffect(()=>{
    if(data){
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        status: data.status
      })
    }
  },[data, form])
  

  const handleSubmit = async (value) => {
    const res = await patchNhomQuyen(params.id, value);
    if(res.code === 200){
      setData(res.role)
      messageApi.success("Chỉnh sửa nhóm quyền thành công");
    }
    else{
      messageApi.error("Chỉnh sửa thất bại!!!");
    }
  } 

  return (
    <> 
      {contextHolder}
      <Card>
        <h2 className="bacsi__title-create">Chỉnh Sửa nhóm quyền</h2>
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
export default ChinhSuaNhomQuyen;