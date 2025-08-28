import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaFacebookMessenger, FaTelegram, FaInstagramSquare } from "react-icons/fa";
import { AiOutlineTikTok } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getSetting } from "../../../services/client/setting.service";

function Footer() {
  const [setting, setSeting] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getSetting();
      if (res) {
        setSeting(res.setting);
      }
    };
    fetchApi();
  }, [])
  return (
    <>
      <div className="footer">
        <div className="footer__container container">
          <Row gutter={[20]}>
            <Col span={8} className="footer__introduce">
              <div className="footer__introduce--title">
                Giới thiệu
              </div>
              <div className="footer__introduce--content">
                <p>
                  <b>Về chúng tôi: </b> {setting ? setting.about.about_us : ""}
                </p>
                <p>
                  <b>Sứ mệnh: </b>{setting ? setting.about.mission : ""}
                </p>
              </div>
            </Col>
            <Col span={5} className="footer__chinhsach">
              <div className="footer__chinhsach--title">
                Chính Sách
              </div>
              <ul>
                <li>
                  <Link to="">Bảo mật</Link>
                </li>
                <li>
                  <Link to="">Quy định</Link>
                </li>
                <li>
                  <Link to="">Điều khoản</Link>
                </li>
              </ul>
            </Col>
            <Col span={5} className="footer__lienket">
              <div className="footer__lienket--title">
                Liên kết
              </div>
              <ul>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/gioi-thieu">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="/lien-he">Liên hệ</Link>
                </li>
              </ul>
            </Col>
            <Col span={5} className="footer__lienhe">
              <div className="footer__lienhe--title">
                Liên hệ
              </div>
              <ul>
                <li>
                  <IoLocation /> {setting ? setting.address : ""}
                </li>
                <li>
                  <FaPhoneVolume /> {setting ? setting.hotline : ""}
                </li>
                <li>
                  <MdEmail /> {setting ? setting.mail_setting : ""}
                </li>
              </ul>
            </Col>
          </Row>
          <Row >
            <Col span={24} className="footer__mangxahoi">
              <ul>
                <li>
                  <Link to={setting ? setting.facebook : ""}><FaFacebook /></Link>
                </li>
                <li>
                  <Link to={setting ? setting.message : ""}><FaFacebookMessenger /></Link>
                </li>
                <li>
                  <Link to={setting ? setting.telegram : ""}><FaTelegram /></Link>
                </li>
                <li>
                  <Link to={setting ? setting.intagram : ""}><FaInstagramSquare /></Link>
                </li>
                <li>
                  <Link to={setting ? setting.tiktok : ""}><AiOutlineTikTok /></Link>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="footer__copyright">&copy; {setting ? setting.footer_right : ""}</Col>
          </Row>
        </div>
      </div>

    </>
  )
}

export default Footer;