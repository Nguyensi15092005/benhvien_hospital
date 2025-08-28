import { Button, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delKhoa } from "../../../services/admin/khoa.Service";

function XoaKhoa(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delKhoa(record._id);
    if (res) {
      onReload();
    }
  }
  return (
    <>
      {permission.includes("permission_khoa_delete") ?
        <Tooltip color="red" title="Xóa Khoa?">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="khoa__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa khoa">

          <Button className="khoa__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }
    </>
  )
}
export default XoaKhoa;