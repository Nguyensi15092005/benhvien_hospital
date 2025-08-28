import { useEffect, useState } from "react";
import { Layout, Tag } from "antd";
import { RiMenuUnfold4Fill, RiMenuFold4Fill } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import "./layoutAdmin.scss";
import { FaUser } from "react-icons/fa6";
import { getCookieString } from "../../../helpers/cookie";
import LogOut from "../../../pages/admin/Account/LogOut";
import { getSetting } from "../../../services/client/setting.service";
const { Sider, Content } = Layout;

function LayoutAdmin() {
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
  const [collap, setcollap] = useState(false);
  const logoPath = collap?(setting? setting.logo: ""): (setting? setting.logoAdmin: "");

  const handleCollap = () => {
    setcollap(!collap);
  };
  const accountName = getCookieString("accountName");
  return (
    <>
      <Layout className="layoutAdmin">
        <header className="header">
          <div className={"header__logo " + (collap && "header__logo-collapsed")}>
            {logoPath && <img src={logoPath} alt="logoAdmin" />}
          </div>
          <div className="header__nav">
            <div className="header__nav--left">
              <div className="header__nav--collapsed" onClick={handleCollap}>
                {collap ? <RiMenuFold4Fill /> : <RiMenuUnfold4Fill />}
              </div>
            </div>
            <div className="header__nav--right">
              <div className="header__nav--user">
                <Tag color="green" icon={<FaUser />} className="account">{accountName}</Tag>
                <LogOut />
              </div>
            </div>
          </div>
        </header>

        <Layout>
          <Sider width={260} className="sider" collapsed={collap} theme="light">
            <Sidebar />
          </Sider>
          <Content className="layoutAdmin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default LayoutAdmin;
