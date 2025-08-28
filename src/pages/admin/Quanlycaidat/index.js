import { Button, Card, Col, Form, Input, message, Row } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useEffect, useState } from "react";
import "./setting.scss";
import { getSetting, patchSetting, postSetting } from "../../../services/admin/setting.service";


function QuanLyCaiDat() {

  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  useEffect(() => {
    const fetchApi = async () => {
      const res = await getSetting();
      if (res.countSetting > 0) {
        setData(res.setting);
      }
    };
    fetchApi();
  }, [])
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        logo: data.logo,
        logoAdmin: data.logoAdmin,
        serviceImagePage: data.serviceImagePage,
        tintucImagePage: data.tintucImagePage,
        chuyengiaImagePage: data.chuyengiaImagePage,
        hotline: data.hotline,
        mail_setting: data.mail_setting,
        address: data.address,
        address_map: data.address_map,
        facebook: data.facebook,
        tiktok: data.tiktok,
        zalo: data.zalo,
        telegram: data.telegram,
        message: data.message,
        intagram: data.intagram,
        footer_right: data.footer_right,
        about: {
          about_us: data.about.about_us,
          mission: data.about.mission
        },
      })
    }
  }, [data, form])


  const handleSubmit = async (value) => {
    const res = data ? await patchSetting(value) : await postSetting(value);
    if (res) {
      setData(res.setting);
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
            <h2 className="setting__title-create">Cài đặt chung</h2>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              // style={{ maxWidth: 1000 }}
              onFinish={handleSubmit}
            >
              <Form.Item label="Tên bệnh viện " name="name" rules={[{ required: true, message: "Chưa nhập tên bệnh viện!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Logo" name="logo" rules={[{ required: true, message: "Chưa thêm logo!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ logo: url })} />
              </Form.Item>
              <Form.Item label="logo Admin" name="logoAdmin" rules={[{ required: true, message: "Chưa thêm logoAdmin!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ logoAdmin: url })} />
              </Form.Item>
              <Form.Item label="Ảnh chính trang dịch vụ" name="serviceImagePage" rules={[{ required: true, message: "Chưa thêm ảnh chính trang dịch vụ!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ serviceImagePage: url })} />
              </Form.Item>
              <Form.Item label="Ảnh chính trang tin tức & sự kiện" name="tintucImagePage" rules={[{ required: true, message: "Chưa thêm ảnh chính trang tin tức và sự kiện!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ tintucImagePage: url })} />
              </Form.Item>
              <Form.Item label="Ảnh chính trang chuyên gia đầu nghành" name="chuyengiaImagePage" rules={[{ required: true, message: "Chưa thêm ảnh chính trang chuyên gia đầu nghành!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ chuyengiaImagePage: url })} />
              </Form.Item>
              <Form.Item label="Số hotline " name="hotline" rules={[{ required: true, message: "Chưa nhập số hotline!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email " name="mail_setting" rules={[{ required: true, message: "Chưa nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ " name="address" rules={[{ required: true, message: "Chưa nhập địa chỉ!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Link địa chỉ " name="address_map" rules={[{ required: true, message: "Chưa nhập link địa chỉ!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Footer " name="footer_right" rules={[{ required: true, message: "Chưa nhập footer" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Facebook " name="facebook">
                <Input />
              </Form.Item>
              <Form.Item label="Tiktok " name="tiktok">
                <Input />
              </Form.Item>
              <Form.Item label="Zalo " name="Zalo">
                <Input />
              </Form.Item>
              <Form.Item label="Telegram" name="telegram">
                <Input />
              </Form.Item>
              <Form.Item label="Message " name="message">
                <Input />
              </Form.Item>
              <Form.Item label="Intagram " name="intagram">
                <Input />
              </Form.Item>
              <Form.Item label="Về chúng tôi " name={["about", "about_us"]}>
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Sứ mệnh " name={["about", "mission"]}>
                <Input.TextArea rows={4} />
              </Form.Item>
              {permission.includes("permission_setting_edit") ?
                <Form.Item label={null} className="setting__button">
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
export default QuanLyCaiDat;