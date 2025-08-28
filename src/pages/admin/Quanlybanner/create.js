import { Button, Form, message, Modal, Switch, Tooltip, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useState } from "react";
import "./banner.scss";
import { postBanner } from "../../../services/admin/banner.service";

function ThemMoiBanner(Props) {
  const { onReload } = Props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  const handleSubmit = async (value) => {
    const res = await postBanner(value);
    if (res.code === 200) {
      form.resetFields();
      messageApi.success("Thêm mới banner thành công");
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
      {permission.includes("permission_banner_add") ?
        <Tooltip color="green" title="Thêm banner">
          <Button
            className="banner__button-create"
            variant="outlined"
            color="green" onClick={showLoading}
          >
            Thêm banner
          </Button>
          <Modal
            className="banner"
            title={<h3 className="banner__title-create">thêm mới banner</h3>}
            loading={loading}
            footer={null}
            open={open}
            width={450}
            onCancel={() => setOpen(false)}
          >
            <Form
              form={form}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 10 }}
              layout="horizontal"
              // style={{ maxWidth: 1000 }}
              onFinish={handleSubmit}
            >
              <Form.Item label="Ảnh" name="image" rules={[{ required: true }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ image: url })} />
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
        <Tooltip color="red" title="Bạn không có quyền thêm">

          <Button
            className="banner__button-create"
            variant="outlined"
            color="green"
          >
            Thêm banner
          </Button>

        </Tooltip>
      }

    </>
  )
}
export default ThemMoiBanner;