import { Button,  Modal,  Tooltip } from "antd";
import { useEffect, useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { getContact } from "../../../services/admin/contact.service";
function Detail(Props) {
  const { record } = Props;
  const [data, setdata] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getContact(record._id);
      if (res) {
        setdata(res.contact);
      }
    };
    fetchAPI();
  }, [record._id])

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Tooltip color="blue" title="Xem chi tiết">
        <Button
          className="bacsi__action"
          icon={<BiMessageAltDetail />}
          variant="outLined"
          color="primary" onClick={showLoading}
        ></Button>
        <Modal
          className="detail"
          title={<h3 className="detail__title">Chi tiết liên hệ</h3>}
          loading={loading}
          footer={null}
          open={open}
          width={600}
          onCancel={() => setOpen(false)}
        >
          {data ?
            <>
              <div className="detail__name">
                <b>Họ Tên: </b> {data.fullName}
              </div>
              <div className="detail__name">
                <b>Email: </b> {data.email}
              </div>
              <div className="detail__name">
                <b>Số điện thoại: </b> {data.phone}
              </div>
              <div className="detail__name">
                <b>Lời nhắn: </b> {data.note}
              </div>
            </>
            : <></>}
        </Modal>
      </Tooltip>
    </>
  )
}
export default Detail;