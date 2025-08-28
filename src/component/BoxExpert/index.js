import { Button, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListBS } from "../../services/client/bacsi.sevice";
function BoxExpert() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListBS();
      if (res) {
        const datacount = res.reduce((acc, item) => {
          const degree = item.degree;
          if (degree === "GS" || degree === "PGS") {
            acc.GS_PGS++;
          } else if (degree === "TS" || degree === "BSCKII") {
            acc.TS_BSCKII++;
          } else if (degree === "ThS" || degree === "BSCKI") {
            acc.ThS_BSCKI++;
          } else if (degree === "BS") {
            acc.BS++;
          } else if (degree === "KTV") {
            acc.KTV++;
          } else if (degree === "ĐD") {
            acc.DD++;
          }

          return acc;
        }, {
          GS_PGS: 0,
          TS_BSCKII: 0,
          ThS_BSCKI: 0,
          BS: 0,
          KTV: 0,
          DD: 0,
        });
        setData(datacount);
      }
    }
    fetchApi();
  }, [])
  return (
    <>
      <div className="main__boxExpert">
        <div className="main__boxExpert--title">
          Chuyên gia đầu ngành - bác sĩ giỏi - giàu kinh nghiệm
        </div>
        <div className="main__boxExpert--not">
          <span></span>
        </div>
        <Row gutter={[10, 10]} className="main__boxExpert--box">
          <Col span={3} className="main__boxExpert--item">
            <div className="number">
              {data ? data.GS_PGS : 0}
            </div>
            <p>
              giáo sư - p. Giáo sư
            </p>
          </Col>
          <Col span={3} className="main__boxExpert--item">
            <div className="number">
              {data ? data.TS_BSCKII : 0}
            </div>
            <p>
              tiến sĩ - Bác sĩ ckii
            </p>
          </Col>
          <Col span={3} className="main__boxExpert--item">
            <div className="number">
              {data ? data.ThS_BSCKI : 0}
            </div>
            <p>
              thạc sĩ - bác sĩ cki
            </p>
          </Col>
          <Col span={3} className="main__boxExpert--item">
            <div className="number">
              {data ? data.BS : 0}
            </div>
            <p>
              bác sĩ
            </p>
          </Col>
          <Col span={3} className="main__boxExpert--item">
            <div className="number">
              {data ? data.KTV : 0}
            </div>
            <p>
              kỹ thuật viên
            </p>
          </Col>
          <Col span={3} className="main__boxExpert--item">
            <div className="number">
              {data ? data.DD : 0}
            </div>
            <p>
              điều dưỡng
            </p>
          </Col>
        </Row>
        <div className="main__boxExpert--button-view">

          <Link to="/chuyen-gia">
            <Button color="primary" variant="solid" >
              Xem các chuyên gia
            </Button>
          </Link>
        </div>
      </div >
    </ >
  )
}
export default BoxExpert;