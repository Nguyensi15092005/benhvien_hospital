import { Button, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delAccount } from "../../../services/admin/account.service";

function XoaTaiKhoanAdmin(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delAccount(record._id);
    if (res) {
      onReload();
    }
  }
  return (
    <>
      {permission.includes("permission_accountAdmin_delete") ?
        <Tooltip color="red" title="Xóa tài khoản?">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="taikhoanadmin__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa">

          <Button className="taikhoanadmin__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default XoaTaiKhoanAdmin;