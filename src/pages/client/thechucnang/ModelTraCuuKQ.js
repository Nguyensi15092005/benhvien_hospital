import { Button, Form, Input, Modal, notification } from "antd";
import { BsClipboard2DataFill } from "react-icons/bs";
import { useState } from "react";

function ModelTraCuuKQ(Props) {
  const {title, content} = Props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageNotifi, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    messageNotifi.error({
      message: "Thất bại",
      description: "Chúng tôi đang gặp sự cố xin vui lòng thử lại sau 10 giây!!!",
      placement,
    });
  };
  const handleSubmit = async () => {
    form.resetFields();
    openNotification('top');
  }
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {contextHolder}
      <div className="main__box--item" onClick={showLoading}>
        <div className="item-icon">
          <BsClipboard2DataFill />
        </div>
        <div className="item-content">
          <h4> {title} </h4>
          <p> {content}</p>
        </div>
      </div>
      
      <Modal
        className="modalkb"
        title={<h3 className="modalkb__title">TRA CỨU KẾT QUẢ</h3>}
        loading={loading}
        footer={null}
        open={open}
        width={400}
        onCancel={() => setOpen(false)}
      >
        <p className="modalkb__title-content">Vui lòng nhập mã tra cứu để xem kết quả</p>
        <Form
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="" rules={[{ required: true, message: "Chưa nhập mã tra cứu!" }]}>
            <Input placeholder="Nhập mã tra cứu"/>
          </Form.Item>
          <Form.Item label={null} className="modalkb__button">
            <Button size="large" type="primary" htmlType="submit">
              Tra cứu
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}
export default ModelTraCuuKQ;