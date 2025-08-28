import LayoutDefalut from "../component/layout/layoutDefault/index";
import Home from "../pages/client/home";
import LayoutAdmin from "../component/layout/layoutAdmin";
import HomeAdmin from "../pages/admin/dashboard";
import QuanLyBacSi from "../pages/admin/Quanlybacsi";
import QuanLyKhoa from "../pages/admin/Quanlykhoa";
import ThemMoiBacSi from "../pages/admin/Quanlybacsi/create";
import ThemMoiKhoa from "../pages/admin/Quanlykhoa/create";
import QuanLyBenhNhan from "../pages/admin/Quanlybenhnhan";
import ChinhSuaBacSi from "../pages/admin/Quanlybacsi/edit";
import ChinhSuaBenhNhan from "../pages/admin/Quanlybenhnhan/edit";
import ChinhSuaKhoa from "../pages/admin/Quanlykhoa/edit";
import QuanLyTrangThietBi from "../pages/admin/Quanlytrangthietbi";
import ThemMoitTrangThietBi from "../pages/admin/Quanlytrangthietbi/create";
import ChinhSuaThietBi from "../pages/admin/Quanlytrangthietbi/edit";
import PrivateAdmin from "../component/RouterPrivate";
import LoginAdmin from "../pages/admin/Account/Login";
import TaiKhoanAdmin from "../pages/admin/QuanlytaikhoanAdmin";
import NhomQuyen from "../pages/admin/Nhomquyen";
import ThemMoiNhomQuyen from "../pages/admin/Nhomquyen/create";
import ChinhSuaNhomQuyen from "../pages/admin/Nhomquyen/edit";
import ThemTaiKhoanAdmin from "../pages/admin/QuanlytaikhoanAdmin/create";
import ChinhSuaTaiKhoanAdmin from "../pages/admin/QuanlytaikhoanAdmin/edit";
import LichKham from "../pages/admin/Quanlylichkham";
import ChinhSuaLichKham from "../pages/admin/Quanlylichkham/edit";
import GioiThieu from "../pages/client/GioiThieu";
import QuanLyGioiThieu from "../pages/admin/Quanlygioithieu";
import LienHe from "../pages/client/LienHe";
import QuanLyLienHe from "../pages/admin/Quanlylienhe";
import QuanLyBanner from "../pages/admin/Quanlybanner";
import QuanLyCaiDat from "../pages/admin/Quanlycaidat";
import QuanLyTheChucNang from "../pages/admin/Quanlythechucnang";
import QuanLyDichVuKhamBenh from "../pages/admin/Quanlydichvukhambenh";
import DichVuKhamBenh from "../pages/client/Dichvukhambenh";
import QuanLyTinTuc from "../pages/admin/Quanlytintuc";
import ThemTinTuc from "../pages/admin/Quanlytintuc/create";
import ChinhSuaTinTuc from "../pages/admin/Quanlytintuc/edit";
import TinTucSuKien from "../pages/client/TintucSukien";
import ChiTietTinTuc from "../pages/client/TintucSukien/detail";
import ChuyenGia from "../pages/client/chuyengia";
import PhanQuyen from "../pages/admin/QuanlyPhanquyen";

const permission = JSON.parse(localStorage.getItem("permission") || "[]");

export const routes = [
    {
        path: "/",
        element: <LayoutDefalut />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/gioi-thieu",
                element: <GioiThieu />
            },
            {
                path: "/lien-he",
                element: <LienHe />
            },

            {
                path: "/dich-vu-kham-benh",
                element: <DichVuKhamBenh />
            },

            {
                path: "/tin-tuc-su-kien",
                element: <TinTucSuKien />
            },
            {
                path: "/tin-tuc-su-kien/:slug",
                element: <ChiTietTinTuc />
            },

            {
                path: "/chuyen-gia",
                element: <ChuyenGia />
            },
        ]
    },

    {
        path: "/admin/login",
        element: <LoginAdmin />
    },
    {
        element: <PrivateAdmin />,
        children: [
            {
                path: "/admin",
                element: <LayoutAdmin />,
                children: [
                    {
                        path: "/admin",
                        element: <HomeAdmin />
                    },
                    permission.includes("permission_bacsi_view") ? {
                        path: "/admin/quan-ly-bac-si",
                        element: <QuanLyBacSi />
                    } : "",
                    permission.includes("permission_bacsi_add") ? {
                        path: "/admin/them-moi-bac-si",
                        element: <ThemMoiBacSi />
                    } : "",
                    permission.includes("permission_bacsi_edit") ? {
                         path: "/admin/chinh-sua-bac-si/:id",
                        element: <ChinhSuaBacSi />
                    } : "",
                    permission.includes("permission_khoa_view") ? {
                        path: "/admin/quan-ly-khoa",
                        element: <QuanLyKhoa />
                    } : "",
                    permission.includes("permission_khoa_add") ? {
                        path: "/admin/them-moi-khoa",
                        element: <ThemMoiKhoa />
                    } : "",
                    permission.includes("permission_khoa_edit") ? {
                        path: "/admin/chinh-sua-khoa/:id",
                        element: <ChinhSuaKhoa />
                    } : "", 
                    {
                        path: "/admin/quan-ly-benh-nhan",
                        element: <QuanLyBenhNhan />
                    },
                    {
                        path: "/admin/chinh-sua-benh-nhan/:id",
                        element: <ChinhSuaBenhNhan />
                    },
                    permission.includes("permission_thietbi_view") ? {
                        path: "/admin/quan-ly-trang-thiet-bi",
                        element: <QuanLyTrangThietBi />
                    } : "",
                    permission.includes("permission_thietbi_add") ? {
                        path: "/admin/them-moi-thiet-bi",
                        element: <ThemMoitTrangThietBi />
                    } : "",
                    permission.includes("permission_thietbi_edit") ? {
                        path: "/admin/chinh-sua-thiet-bi/:id",
                        element: <ChinhSuaThietBi />
                    } : "",
                    permission.includes("permission_accountAdmin_view") ? {
                        path: "/admin/quan-ly-tai-khoan-admin",
                        element: <TaiKhoanAdmin />
                    } : "",
                    permission.includes("permission_accountAdmin_add") ? {
                        path: "/admin/them-moi-tai-khoan-admin",
                        element: <ThemTaiKhoanAdmin />
                    } : "",
                    permission.includes("permission_accountAdmin_edit") ? {
                        path: "/admin/chinh-sua-tai-khoan-admin/:id",
                        element: <ChinhSuaTaiKhoanAdmin />
                    } : "",
                    permission.includes("permission_role_view") ? {
                        path: "/admin/nhom-quyen",
                        element: <NhomQuyen />
                    } : "",
                    permission.includes("permission_role_add") ? {
                        path: "/admin/them-nhom-quyen",
                        element: <ThemMoiNhomQuyen />
                    } : "",
                    permission.includes("permission_role_edit") ? {
                        path: "/admin/chinh-sua-nhom-quyen/:id",
                        element: <ChinhSuaNhomQuyen />
                    } : "",
                    permission.includes("permission_lichkham_view") ? {
                        path: "/admin/lich-kham",
                        element: <LichKham />
                    } : "",
                    permission.includes("permission_lichkham_edit") ? {
                        path: "/admin/chinh-sua-lich-kham/:id",
                        element: <ChinhSuaLichKham />
                    } : "",
                    permission.includes("permission_about_view") ? {
                        path: "/admin/gioi-thieu",
                        element: <QuanLyGioiThieu />
                    } : "",
                    permission.includes("permission_contact_view") ? {
                        path: "/admin/lien-he",
                        element: <QuanLyLienHe />
                    } : "",
                    permission.includes("permission_banner_view") ? {
                        path: "/admin/banner",
                        element: <QuanLyBanner />
                    } : "",
                    permission.includes("permission_thechucnang_view") ? {
                        path: "/admin/the-chuc-nang",
                        element: <QuanLyTheChucNang />
                    } : "",
                    permission.includes("permission_setting_view") ? {
                        path: "/admin/cai-dat-chung",
                        element: <QuanLyCaiDat />
                    } : "",
                    permission.includes("permission_service_view") ? {
                        path: "/admin/dich-vu-kham-benh",
                        element: <QuanLyDichVuKhamBenh />
                    } : "",
                    permission.includes("permission_tintuc_view") ? {
                        path: "/admin/tin-tuc-su-kien",
                        element: <QuanLyTinTuc />
                    } : "",
                    permission.includes("permission_tintuc_add") ? {
                        path: "/admin/them-moi-tin-tuc-su-kien",
                        element: <ThemTinTuc />
                    } : "",
                    permission.includes("permission_tintuc_edit") ? {
                        path: "/admin/chinh-sua-tin-tuc-su-kien/:id",
                        element: <ChinhSuaTinTuc />
                    } : "",
                    permission.includes("permission_permission_view") ? {
                        path: "/admin/phan-quyen",
                        element: <PhanQuyen />
                    } : "",

                ]
            }
        ]
    }

]