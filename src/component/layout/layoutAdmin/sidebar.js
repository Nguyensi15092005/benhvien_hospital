import { Menu } from "antd";
import { MdDashboard, MdOutlinePeopleAlt, MdDeviceHub, MdOutlineMedicalServices } from "react-icons/md";
import { FaUserDoctor, FaRegRectangleList } from "react-icons/fa6";
import { LuCalendarPlus2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { RiAdminLine, RiFunctionAddLine } from "react-icons/ri";
import { FaLayerGroup } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdConnectWithoutContact } from "react-icons/md";
import { PiPictureInPictureFill } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsNewspaper } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";



function Sidebar() {
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const items = [
    {
      key: "tongquat",
      icon: <MdDashboard style={{ fontSize: 20 }} />,
      label: <Link to="/admin">Tổng quát</Link>
    },
    permission.includes("permission_bacsi_view") ? {
      key: "quanlybacsi",
      icon: <FaUserDoctor style={{ fontSize: 20 }} />,
      label: <Link to="/admin/quan-ly-bac-si">Bác sĩ</Link>
    } : "",
    permission.includes("permission_lichkham_view") ? {
      key: "quanlylichkham",
      icon: <LuCalendarPlus2 style={{ fontSize: 20 }} />,
      label: <Link to="/admin/lich-kham">Lịch khám</Link>
    } : "",
    {
      key: "quanlybenhnhan",
      icon: <MdOutlinePeopleAlt style={{ fontSize: 20 }} />,
      label: <Link to="/admin/quan-ly-benh-nhan">Bệnh nhân</Link>
    },
    permission.includes("permission_khoa_view") ? {
      key: "quanlykhoa",
      icon: <FaRegRectangleList style={{ fontSize: 20 }} />,
      label: <Link to="/admin/quan-ly-khoa">Khoa</Link>
    } : "",
    permission.includes("permission_thietbi_view") ? {
      key: "quanlytrangthietbi",
      icon: <MdDeviceHub style={{ fontSize: 20 }} />,
      label: <Link to="/admin/quan-ly-trang-thiet-bi">Trang thiết bị</Link>
    } : "",
    permission.includes("permission_service_view") ? {
      key: "dichvukhambenh",
      icon: <MdOutlineMedicalServices style={{ fontSize: 20 }} />,
      label: <Link to="/admin/dich-vu-kham-benh">Dịch vụ khám bệnh</Link>
    } : "",
    permission.includes("permission_tintuc_view") ? {
      key: "tintucsukien",
      icon: <BsNewspaper style={{ fontSize: 20 }} />,
      label: <Link to="/admin/tin-tuc-su-kien">Tin tức & sự kiện</Link>
    } : "",
    permission.includes("permission_about_view") ? {
      key: "gioithieu",
      icon: <FcAbout style={{ fontSize: 20 }} />,
      label: <Link to="/admin/gioi-thieu">Giới thiệu</Link>
    } : "",
    permission.includes("permission_contact_view") ? {
      key: "lienhe",
      icon: <MdConnectWithoutContact style={{ fontSize: 20 }} />,
      label: <Link to="/admin/lien-he">Liên hệ</Link>
    } : "",
    permission.includes("permission_banner_view") ? {
      key: "banner",
      icon: <PiPictureInPictureFill style={{ fontSize: 20 }} />,
      label: <Link to="/admin/banner">Banner</Link>
    } : "",
    permission.includes("permission_permission_view") ? {
      key: "phanquyen",
      icon: <RiSecurePaymentFill style={{ fontSize: 20 }} />,
      label: <Link to="/admin/phan-quyen">Phân quyền</Link>
    } : "",
    permission.includes("permission_role_view") ? {
      key: "nhomquyen",
      icon: <FaLayerGroup style={{ fontSize: 20 }} />,
      label: <Link to="/admin/nhom-quyen">Nhóm quyền</Link>
    } : "",
    permission.includes("permission_thechucnang_view") ? {
      key: "thechucnang",
      icon: <RiFunctionAddLine style={{ fontSize: 20 }} />,
      label: <Link to="/admin/the-chuc-nang">Thẻ chức năng</Link>
    } : "",
    permission.includes("permission_accountAdmin_view") ? {
      key: "quanlyaccount",
      icon: <RiAdminLine style={{ fontSize: 20 }} />,
      label: <Link to="/admin/quan-ly-tai-khoan-admin">Tài khoản admin</Link>
    } : "",
    permission.includes("permission_setting_view") ? {
      key: "settings",
      icon: <IoSettingsOutline style={{ fontSize: 20 }} />,
      label: <Link to="/admin/cai-dat-chung">Cài đặt chung</Link>
    } : "",

  ]
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={["tongquat"]}
        defaultOpenKeys={["tongquat"]}
        className="sidebar"
      />
    </>
  )
}
export default Sidebar;