import { Button, message, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delNhomQuyen } from "../../../services/admin/NhomQuyen.service";

function XoaNhomQuyen(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delNhomQuyen(record._id);
    if (res) {
      onReload();
      message.success("Xóa nhóm quyền thành công.")
    }
  }

  return (
    <>
      {permission.includes("permission_role_delete") ?
        <Tooltip color="red" title="Xóa nhóm quyền">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="nhomquyen__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa">

          <Button className="nhomquyen__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default XoaNhomQuyen;