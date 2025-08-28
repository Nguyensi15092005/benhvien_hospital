import { Button, Card, Col, DatePicker, Form, Input, message, Radio, Row, Switch, } from "antd";
import "./quanlybacsi.scss";
import UploadImage from "../../../helpers/uploadImage";
import { postBacsi } from "../../../services/admin/BacSi.Service";
import { SelectKhoaId } from "../../../helpers/select";

function ThemMoiBacSi() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const handleSubmit = async (value) => {
    value.dateBirth = value.dateBirth.format("YYYY-MM-DD");
    const res = await postBacsi(value);
    if (res) {
      form.resetFields(); //Xóa các trường trong form
      messageApi.open({
        type: 'success',
        content: 'Thêm mới bác sĩ thành công',
        duration: 5,
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Thêm mới bác sĩ thất bại!!!',
        duration: 5,
      });
    }

  }
  return (
    <>
      {contextHolder}
      <Card>
        <Row justify="center">
          <Col span={16}>
            <h2 className="bacsi__title-create">Thêm mới bác sĩ</h2>
            <Form
              form={form}
              initialValues={{ sex: "Nam" }}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              // style={{ maxWidth: 1000 }}
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
              <Form.Item label="Email: " name="email" rules={[{ required: true, message: "Chưa nhập email!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ: " name="address" rules={[{ required: true, message: "Chưa nhập địa chỉ!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Khoa: " name="khoa_id" rules={[{ required: true, message: "Chưa chọn khoa!" }]}>
                <SelectKhoaId />
              </Form.Item>
              <Form.Item label="Học vị: " name="degree" rules={[{ required: true, message: "Chưa nhập học vị!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Giới tính: " name="sex" >
                <Radio.Group >
                  <Radio value="Nam"> Nam </Radio>
                  <Radio value="Nu"> Nữ </Radio>
                </Radio.Group>
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
              <Form.Item label={null} className="bacsi__button">
                <Button type="primary" htmlType="submit" >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

      </Card>

    </>
  )
}
export default ThemMoiBacSi;