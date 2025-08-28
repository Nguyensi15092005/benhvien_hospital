import { NavLink } from "react-router-dom";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { getSetting } from "../../../services/client/setting.service";
import ButtonModal from "./buttonmodal";
function Header() {
  const [setting, setSeting] = useState();

  useEffect(()=>{
    const fetchApi = async () =>{
      const res = await getSetting();
      if(res){
        setSeting(res.setting);
      }
    };
    fetchApi();
  },[])
  return (
    <>
      <div className="layout__header">
        <Row gutter={[0, 10]} align="center" className="layout__header--container container">
          <Col span={10}>
            <div className="layout__header--logo">
              <NavLink to="/">
                {setting? <img src={setting.logo} />:<></>}
              </NavLink>
              <span>{setting? setting.name: ""}</span>
            </div>
          </Col>
          <Col span={8}>
            <ul className="layout__header--menu">
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
              </li>
              <li>
                <NavLink to="/lien-he">Liên hệ</NavLink>
              </li>
            </ul>
          </Col>
          <Col span={6} className="nav-button-datlich">
            <ButtonModal/>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Header;