import { Row, Col, Image } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListThietBi } from "../../services/client/trangthietbi.service";
function Device() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListThietBi();
      if (res) {
        setData(res);
      }
    };
    fetchApi();
  }, []);

  const cutText = (text, maxLength = 200) => {
    if (!text) {
      return "";
    }
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  };

  return (
    <div className="main__device">
      <div className="main__device--title">
        trang thiết bị hiện đại
      </div>
      <div className="main__device--not">
        <span></span>
      </div>
      <p className="main__device--content">
        Sở hữu hệ thống trang thiết bị cao cấp, hàng đầu thế giới trong chẩn đoán và điều trị.
      </p>
      <Row gutter={[10, 10]} className="main__device--box">
        {data?.map(item => (
          <Col span={6} className="main__device--item" key={item._id}>
            <div className="image">
              <Image
                src={item.image}
                alt="device"
                width="100%"
                height="100%"
                preview={true} // để hiện preview khi click
              />
            </div>
            <div className="content">
              <Link to="">
                <h6>{item.title}</h6>
                <p>{cutText(item.description)}</p>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Device;