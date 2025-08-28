import { Button, Form, Input, message, Modal, Switch, Tooltip, } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { getDichVu, patchDichVu } from "../../../services/admin/dichvu.service";



function ChinhSuaDichVuKhamBenh(Props) {
  const { dichvu_id, onReload } = Props;
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getDichVu(dichvu_id);
      if (res) {
        setData(res.dichvu);
      }
    };
    fetchAPI();
  }, [dichvu_id]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        image: data.image,
        title: data.title,
        content: data.content,
        status: data.status,

      })
    }
  }, [data, form])

  const handleSubmit = async (value) => {
    const res = await patchDichVu(dichvu_id, value);
    if (res) {
      setData(res.dichvu)
      messageApi.success("Chỉnh sửa dichvu thành công");
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
      {permission.includes("permission_service_edit") ?
        <Tooltip color="purple" title="Chỉnh sửa">
          <Button
            className="dichvu__button-create"
            variant="outLined"
            color="purple"
            onClick={showLoading}
            icon={<CiEdit />}
          >
          </Button>
          <Modal
            className="dichvu"
            title={<h3 className="dichvu__title-create">Chỉnh sửa dịch vu khám bệnh</h3>}
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
              <Form.Item label="Icon" name="image" rules={[{ required: true }]}>
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
        <Tooltip color="purple" title="Bạn không có quyền thêm sửa">

          <Button
            className="dichvu__button-create"
            variant="outLined"
            color="purple"
            onClick={showLoading}
            icon={<CiEdit />}
          >
          </Button>
        </Tooltip>
      }

    </>
  )
}
export default ChinhSuaDichVuKhamBenh;