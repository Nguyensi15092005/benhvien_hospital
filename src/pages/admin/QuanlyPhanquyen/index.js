import React from "react";
import { Alert, Button, Card, message } from "antd";
import { useEffect, useState } from "react";
import { getListRole, patchPermission } from "../../../services/admin/role.service";
import "./phanquyen.scss";


function PhanQuyen() {
  const [roles, setRoles] = useState([]);
  const [permissionsState, setPermissionsState] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  // { roleId: ["permission_bacsi_view", "permission_lichkham_add", ...] }

  const modules = [
    {
      name: "Bác Sĩ",
      permissions: [
        { label: "Xem", key: "permission_bacsi_view" },
        { label: "Thêm", key: "permission_bacsi_add" },
        { label: "Sửa", key: "permission_bacsi_edit" },
        { label: "Xóa", key: "permission_bacsi_delete" },
      ],
    },
    {
      name: "Lịch Khám",
      permissions: [
        { label: "Xem", key: "permission_lichkham_view" },
        { label: "Trả lời", key: "permission_lichkham_reply" },
        { label: "Sửa", key: "permission_lichkham_edit" },
        { label: "Xóa", key: "permission_lichkham_delete" },
      ],
    },
    {
      name: "Khoa",
      permissions: [
        { label: "Xem", key: "permission_khoa_view" },
        { label: "Thêm", key: "permission_khoa_add" },
        { label: "Sửa", key: "permission_khoa_edit" },
        { label: "Xóa", key: "permission_khoa_delete" },
      ],
    },
    {
      name: "Trang thiết bị",
      permissions: [
        { label: "Xem", key: "permission_thietbi_view" },
        { label: "Thêm", key: "permission_thietbi_add" },
        { label: "Sửa", key: "permission_thietbi_edit" },
        { label: "Xóa", key: "permission_thietbi_delete" },
      ],
    },
    {
      name: "Dịch vụ khám bệnh",
      permissions: [
        { label: "Xem", key: "permission_service_view" },
        { label: "Thêm", key: "permission_service_add" },
        { label: "Sửa", key: "permission_service_edit" },
        { label: "Xóa", key: "permission_service_delete" },
      ],
    },
    {
      name: "Tin tức và sự kiện",
      permissions: [
        { label: "Xem", key: "permission_tintuc_view" },
        { label: "Thêm", key: "permission_tintuc_add" },
        { label: "Sửa", key: "permission_tintuc_edit" },
        { label: "Xóa", key: "permission_tintuc_delete" },
      ],
    },
    {
      name: "Giới thiệu",
      permissions: [
        { label: "Xem", key: "permission_about_view" },
        { label: "Sửa", key: "permission_about_edit" },
      ],
    },
    {
      name: "Liên hệ",
      permissions: [
        { label: "Xem", key: "permission_contact_view" },
        { label: "Trả lời", key: "permission_contact_reply" },
        { label: "Sửa", key: "permission_contact_edit" },
        { label: "Xóa", key: "permission_contact_delete" },
      ],
    },
    {
      name: "Banner",
      permissions: [
        { label: "Xem", key: "permission_banner_view" },
        { label: "Thêm", key: "permission_banner_add" },
        { label: "Sửa", key: "permission_banner_edit" },
        { label: "Xóa", key: "permission_banner_delete" },
      ],
    },
    {
      name: "Phân quyền",
      permissions: [
        { label: "Xem", key: "permission_permission_view" },
        { label: "Sửa", key: "permission_permission_edit" },
      ],
    },
    {
      name: "Nhóm quyền",
      permissions: [
        { label: "Xem", key: "permission_role_view" },
        { label: "Thêm", key: "permission_role_add" },
        { label: "Sửa", key: "permission_role_edit" },
        { label: "Xóa", key: "permission_role_delete" },
      ],
    },
    {
      name: "Thẻ chức năng",
      permissions: [
        { label: "Xem", key: "permission_thechucnang_view" },
        { label: "Sửa", key: "permission_thechucnang_edit" },
      ],
    },
    {
      name: "Tài khoản admin",
      permissions: [
        { label: "Xem", key: "permission_accountAdmin_view" },
        { label: "Thêm", key: "permission_accountAdmin_add" },
        { label: "Sửa", key: "permission_accountAdmin_edit" },
        { label: "Xóa", key: "permission_accountAdmin_delete" },
      ],
    },
    {
      name: "cài đặt chung",
      permissions: [
        { label: "Xem", key: "permission_setting_view" },
        { label: "Sửa", key: "permission_setting_edit" },
      ],
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListRole();
      if (res) {
        setRoles(res.role);

        // Khởi tạo state permission
        const initial = {};
        res.role.forEach(role => {
          initial[role._id] = role.permissions || [];
        });
        setPermissionsState(initial);
      }
    };
    fetchApi();
  }, []);

  const handleChange = (roleId, permission) => {
    setPermissionsState(prev => {
      const current = prev[roleId] || [];
      const updated = current.includes(permission)
        ? current.filter(p => p !== permission)
        : [...current, permission];
      return { ...prev, [roleId]: updated };
    });
  };

  const handleSubmit = async () => {
    const res = await patchPermission(permissionsState);
    if (res) {
      messageApi.success("Chỉnh sửa phân quyền thành công");
    }
  };

  return (
    <>
      {contextHolder}
      <Alert message="PHÂN QUYỀN" type="info" className="phanquyen__alert" />
      <Card
        title="Danh sách quyền"
        extra={
          <>
            {permission.includes("permission_permission_edit") ?
              < Button
                variant="outlined"
                color="cyan"
                onClick={handleSubmit}
                className="phanquyen__button-create"
              >
                Cập nhật
              </Button>
              :
              < Button
                variant="outlined"
                color="cyan"
                className="phanquyen__button-create"
              >
                Cập nhật
              </Button>
            }
          </>
        }
      >
        <table className="phanquyen__table">
          <thead>
            <tr>
              <th>Tính năng</th>
              {roles.map((role, index) => (
                <th key={index} className="text-center">{role.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((module, moduleIndex) => (
              <React.Fragment key={moduleIndex}>
                <tr>
                  <td colSpan={roles.length + 1} style={{ fontWeight: "bold" }}>
                    {module.name}
                  </td>
                </tr>
                {module.permissions.map((perm, permIndex) => (
                  <tr key={permIndex}>
                    <td>{perm.label}</td>
                    {roles.map((role, roleIndex) => (
                      <td className="center" key={roleIndex}>
                        <input
                          type="checkbox"
                          checked={permissionsState[role._id]?.includes(perm.key) || false}
                          onChange={() => handleChange(role._id, perm.key)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card >
    </>
  );
}

export default PhanQuyen;
