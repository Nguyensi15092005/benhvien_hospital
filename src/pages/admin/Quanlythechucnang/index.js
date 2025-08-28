import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { getTheChucNang, patchTheChucNang, postTheChucNang } from "../../../services/admin/thechucnang.service";


function QuanLyTheChucNang() {
  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  useEffect(() => {
    const fetchApi = async () => {
      const res = await getTheChucNang();
      if (res.countThechucnang > 0) {
        setData(res.thechucnang);
      }
    };
    fetchApi();
  }, [])
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        datlich: {
          icon: data.datlich.icon,
          title: data.datlich.title,
          content: data.datlich.content,
        },
        tracuu: {
          icon: data.tracuu.icon,
          title: data.tracuu.title,
          content: data.tracuu.content,
        },
        dichvu: {
          icon: data.dichvu.icon,
          title: data.dichvu.title,
          content: data.dichvu.content,
        },
        sukien: {
          icon: data.sukien.icon,
          title: data.sukien.title,
          content: data.sukien.content,
        }
      })
    }
  }, [data, form])


  const handleSubmit = async (value) => {
    const res = data ? await patchTheChucNang(value) : await postTheChucNang(value);
    if (res) {
      setData(res.thechucnang);
      messageApi.open({
        type: 'success',
        content: 'Thành công',
        duration: 5,
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Thất bại!!!',
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
            <h2 className="about__title-create">Thẻ chức năng</h2>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              // style={{ maxWidth: 1000 }}
              onFinish={handleSubmit}
            >
              <Form.Item label="Icon đặt lịch khám " name={["datlich", "icon"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Tiêu đề đặt lịch khám " name={["datlich", "title"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Nội dung đặt lịch khám " name={["datlich", "content"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Icon tra cứu kết quả " name={["tracuu", "icon"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Tiêu tra cứu kết quả " name={["tracuu", "title"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Nội dung tra cứu kết quả " name={["tracuu", "content"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Icon dịch vụ khám " name={["dichvu", "icon"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Tiêu đề dịch vụ khám " name={["dichvu", "title"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Nội dung dịch vụ khám " name={["dichvu", "content"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Icon tin tức và sự kiện " name={["sukien", "icon"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Tiêu đề tin tức và sự kiện " name={["sukien", "title"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Nội dung tin tức và sự kiện " name={["sukien", "content"]} rules={[{ required: true, message: "Chưa nhập ở đây!" }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
              {permission.includes("permission_thechucnang_edit") ?
                <Form.Item label={null} className="about__button">
                  <Button type="primary" htmlType="submit" >
                    Submit
                  </Button>
                </Form.Item>
                :
                <></>
              }

            </Form>
          </Col>
        </Row>

      </Card>

    </>
  )
}
export default QuanLyTheChucNang;