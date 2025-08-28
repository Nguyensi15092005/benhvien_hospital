import { Button, Form, message, Modal, Switch, Tooltip, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useEffect, useState } from "react";
import "./banner.scss";
import { CiEdit } from "react-icons/ci";
import { getBanner, pacthBanner } from "../../../services/admin/banner.service";



function ChinhSuaBanner(Props) {
  const { banner_id, onReload } = Props;
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getBanner(banner_id);
      if (res) {
        setData(res.banner);
      }
    };
    fetchAPI();
  }, [banner_id]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        image: data.image,
        status: data.status
      })
    }
  }, [data, form])

  const handleSubmit = async (value) => {
    const res = await pacthBanner(banner_id, value);
    if (res) {
      setData(res.banner)
      messageApi.success("Chỉnh sửa banner thành công");
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
      {permission.includes("permission_banner_edit") ?
        <Tooltip color="purple" title="Chỉnh sửa banner">
          <Button
            className="banner__button"
            variant="outLined"
            color="purple" onClick={showLoading}
            icon={<CiEdit />}
          >
          </Button>
          <Modal
            className="banner"
            title={<h3 className="banner__title-create">Chỉnh sửa Banner</h3>}
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
        <Tooltip color="purple" title="Bạn không có quyền sửa">

          <Button
            className="banner__button"
            variant="outLined"
            color="purple"
            icon={<CiEdit />}
          >
          </Button>

        </Tooltip>
      }

    </>
  )
}
export default ChinhSuaBanner;