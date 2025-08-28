import { Button, Form, Input, message, Modal, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { patchSendMail } from "../../../services/admin/contact.service";
import TinyMCE from "../../../component/tinyMCE";

function TraLoiLienHe(Props) {
  const { record, color, handleChanStatus } = Props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleSubmit = async (value) => {
    const res = await patchSendMail(value);
    if (res) {
      messageApi.success("Gửi thành công");
    } else {
      messageApi.error("Thât bại!!!");
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      user_email: record.email,
      message: record.message_Reply,
    });
  }, [form, record.email, record.message_Reply]);

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
      {permission.includes("permission_lichkham_reply") ? (
        <Tooltip color="blue" title="Trả lời">
          <Tag
            className="contact__status"
            color={color}
            key={record.status}
            onClick={() => {
              handleChanStatus(record._id, record.status);
              showLoading();
            }}
          >
            {record.status === true ? "Đã phản hồi" : "Chưa phản hồi"}
          </Tag>
          <Modal
            className="lichkham"
            title={<h3 className="lichkham__title-create">Trả lời</h3>}
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
              <Form.Item label="Email" name="user_email">
                <Input readOnly />
              </Form.Item>
              <Form.Item
                label="Nội dung"
                name="message"
                rules={[{ required: true }, { message: "Chưa nhập nội dung" }]}
                getValueFromEvent={(content) => content}
              >
                <TinyMCE />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Tooltip>
      ) : (
        <Tooltip color="blue" title="Bạn không có quyền trả lời">
          <Tag
            className="contact__status"
            color={color}
            key={record.status}
            onClick={() => {
              handleChanStatus(record._id, record.status);
              showLoading();
            }}
          >
            {record.status === true ? "Đã phản hồi" : "Chưa phản hồi"}
          </Tag>
        </Tooltip>
      )}
    </>
  );
}
export default TraLoiLienHe;
