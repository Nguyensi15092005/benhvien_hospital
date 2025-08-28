import { Button, Card, Col, Form, Input, message, Row } from "antd";
import UploadImage from "../../../helpers/uploadImage";
import { useEffect, useState } from "react";
import TinyMCE from "../../../component/tinyMCE";
import "./GioiThieu.scss";
import { getAbout, patchAbout, postAbout } from "../../../services/admin/gioithieu.service";
const { TextArea } = Input;


function QuanLyGioiThieu() {

  const [data, setData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAbout();
      if (res.countAbout > 0) {
        setData(res.about);
      }
    };
    fetchApi();
  }, [])
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        image: data.image,
        about_us: data?.about_us || "",
        mission: data?.mission || "",
        value: data.value,
        why_choose_us: data.why_choose_us,
        team: {
          imageTeam: data.team.imageTeam,
          description: data.team.description
        },
        device: {
          imageDevice: data.device.imageDevice,
          description: data.device.description
        }
      })
    }
  }, [data, form])


  const handleSubmit = async (value) => {
    const res = data ? await patchAbout(value) : await postAbout(value);
    if (res) {
      setData(res.about);
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
            <h2 className="about__title-create">giới thiệu</h2>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              // style={{ maxWidth: 1000 }}
              onFinish={handleSubmit}
            >
              <Form.Item label="Ảnh Giới thiệu" name="image" rules={[{ required: true, message: "Chưa thêm ảnh giới thiệu!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ image: url })} />
              </Form.Item>
              <Form.Item label="Về chúng tôi " name="about_us" rules={[{ required: true, message: "Chưa nhập về chúng tôi!" }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Sứ mệnh & tầm nhìn " name="mission" rules={[{ required: true, message: "Chưa nhập sứ mệnh và tầm nhìn!" }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Giá trị cốt lõi" name="value" rules={[{ required: true, message: "Chưa nhập giá trị cốt lõi!" }]}>
                <TinyMCE
                  value={form.getFieldValue("value")}
                  onChange={(val) => form.setFieldsValue({ value: val })}
                />
              </Form.Item>
              <Form.Item label="Lý do chọn chúng tôi" name="why_choose_us" rules={[{ required: true, message: "Chưa nhập lý do chọn chúng tôi!" }]}>
                <TinyMCE
                  value={form.getFieldValue("why_choose_us")}
                  onChange={(val) => form.setFieldsValue({ why_choose_us: val })}
                />
              </Form.Item>
              <Form.Item label="Ảnh cơ sở vật chất và trang thiết bị" name={["device", "imageDevice"]} rules={[{ required: true, message: "Chưa thêm ảnh cơ sở vật chất và trang thiết bị!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({ device: { imageDevice: url } })} />
              </Form.Item>
              <Form.Item label="Mô tả cơ sở vật chất và trang thiết bị " name={["device", "description"]} rules={[{ required: true, message: "Chưa nhập mô tả cơ sở vật chất và trang thiết bị!" }]}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Ảnh đội ngũ bác sĩ" name={["team", "imageTeam"]} rules={[{ required: true, message: "Chưa thêm ảnh đội ngủ bác sĩ!" }]}>
                <UploadImage onUploaded={(url) => form.setFieldsValue({
                  team: {
                    ...form.getFieldValue("team"),
                    imageTeam: url
                  }
                })} />
              </Form.Item>
              <Form.Item label="Mô tả đội ngủ bác sĩ " name={["team", "description"]} rules={[{ required: true, message: "Chưa nhập mô tả đội ngủ bác sĩ!" }]}>
                <TextArea rows={4} />
              </Form.Item>
              {permission.includes("permission_about_edit") ?
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
export default QuanLyGioiThieu;