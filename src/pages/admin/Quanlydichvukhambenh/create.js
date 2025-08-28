import { Button, Form, Input, message, Modal, Switch, Tooltip, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useState } from "react";
import "./dichvu.scss";
import { postDichVu } from "../../../services/admin/dichvu.service";

function ThemMoiDichVuKhamBenh(Props) {
  const { onReload } = Props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  const handleSubmit = async (value) => {
    const res = await postDichVu(value);
    if (res.code === 200) {
      form.resetFields();
      messageApi.success("Thêm mới dịch vụ khám bệnh thành công");
      onReload();
    }
    else {
      messageApi.error("Thât bại!!!");
    }
  };
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      {contextHolder}
      {permission.includes("permission_service_add") ?
        <Tooltip color="green" title="Thêm dịch vụ">
          <Button
            className="dichvu__button-create"
            variant="outlined"
            color="green" onClick={showLoading}
          >
            Thêm mới dịch vụ
          </Button>
          <Modal
            className="dichvu"
            title={<h3 className="dichvu__title-create">thêm mới dịch vu khám bệnh</h3>}
            loading={loading}
            footer={null}
            open={open}
            width={600}
            onCancel={() => setOpen(false)}
          >
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item label="Icon" name="image" >
                <UploadImage onUploaded={(url) => form.setFieldsValue({ image: url })} />
              </Form.Item>
              <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Chưa nhập tiêu đề!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Nội dung" name="content" rules={[{ required: true, message: "Chưa nhập nội dung!" }]}>
                <Input.TextArea rows={5} />
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
          </Modal>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền thêm dịch vụ">

          <Button
            className="dichvu__button-create"
            variant="outlined"
            color="green" onClick={showLoading}
          >
            Thêm mới dịch vụ
          </Button>
        </Tooltip>
      }

    </>
  )
}
export default ThemMoiDichVuKhamBenh;