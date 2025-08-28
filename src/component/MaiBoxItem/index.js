import { Row, Col } from "antd";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import ModalDatLichKham from "../../pages/client/thechucnang/ModelDatLichKham";
import { useEffect, useState } from "react";
import { getTheChucNang } from "../../services/client/thechucnang.service";
import ModelTraCuuKQ from "../../pages/client/thechucnang/ModelTraCuuKQ";
import { Link } from "react-router-dom";

function MainBoxItem() {
  const [thechucnang, setThechucnang] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getTheChucNang();
      if (res) {
        setThechucnang(res.thechucnang);
      }
    };
    fetchApi();
  }, [])
  return (
    <>
      <Row gutter={[10, 10]} className="main__box">
        <Col span={5} >
          <ModalDatLichKham
            title={thechucnang ? thechucnang.datlich.title : ""}
            content={thechucnang ? thechucnang.datlich.content : ""}
          />
        </Col>
        <Col span={5}>
          <ModelTraCuuKQ
            title={thechucnang ? thechucnang.tracuu.title : ""}
            content={thechucnang ? thechucnang.tracuu.content : ""}
          />
        </Col>
        <Col span={5} className="main__box--item">
          <Link to="/dich-vu-kham-benh">
            <div className="item-icon">
              <MdOutlineMedicalServices />
            </div>
            <div className="item-content">
              <h4> {thechucnang ? thechucnang.dichvu.title : ""} </h4>
              <p> {thechucnang ? thechucnang.dichvu.content : ""}</p>
            </div>
          </Link>
        </Col>
        <Col span={5} className="main__box--item">
          <Link to="tin-tuc-su-kien">
            <div className="item-icon">
              <BsCalendar2Event />
            </div>
            <div className="item-content">
              <h4> {thechucnang ? thechucnang.sukien.title : ""} </h4>
              <p> {thechucnang ? thechucnang.sukien.content : ""}</p>
            </div>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default MainBoxItem;
