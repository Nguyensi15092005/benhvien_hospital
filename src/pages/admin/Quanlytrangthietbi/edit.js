import { Button, Card, Form, Input, message, Switch, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThietBi, patchThietBi } from "../../../services/admin/TrangThietBi";
const { TextArea } = Input;



function ChinhSuaThietBi () {
  const [data, setData] = useState();
  const params = useParams();
  const [form]= Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=> {
    const fetchAPI =async () => {
      const res = await getThietBi(params.id);
      if(res){
        console.log(res)
        setData(res.thietbi);
      };
    }
    fetchAPI();
  }, [params.id])
  useEffect(()=> {
    if(data){
      form.setFieldsValue({
        title: data.title,
        description: data.description,
        status: data.status,
        image: data.image
      })
    }
  },[data, form])

  const handleSubmit = async (value) => {
    const res = await patchThietBi(params.id, value);
    if(res){
      setData(res.thietbi);
      messageApi.success("Cập nhật thông tin thiết bị thành công.");
    }
    else{
      messageApi.error("Cập nhật thất bị!!!");
    }
  }

  return( 
    <>
      {contextHolder}
      <Card>
        <h2 className="thietbi__title-create">Chỉnh sửa thiết bị</h2>
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
            <TextArea rows={5}/>
          </Form.Item>
          <Form.Item label="trạng thái" name="status" rules={[{ required: true }]}>
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

export default ChinhSuaThietBi;