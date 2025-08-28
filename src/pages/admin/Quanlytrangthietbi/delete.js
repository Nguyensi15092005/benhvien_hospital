import { Button, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delThietBi } from "../../../services/admin/TrangThietBi";

function XoaThietBi(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delThietBi(record._id);
    if (res) {
      onReload();
    }
  }
  return (
    <>

      {permission.includes("permission_thietbi_delete") ?
        <Tooltip color="red" title="Xóa thiết bị?">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="thietbi__action" icon={<MdDeleteForever />} variant="outLined" color="danger"></Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa">
          <Button className="thietbi__action" icon={<MdDeleteForever />} variant="outLined" color="danger"></Button>
        </Tooltip>
      }
    </>
  )
}
export default XoaThietBi;