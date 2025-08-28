import { Button, message, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delDichVu } from "../../../services/admin/dichvu.service";

function XoaDichVu(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delDichVu(record._id);
    if (res) {
      onReload();
      message.success("Xóa thành công.")
    }
  }

  return (
    <>
      {permission.includes("permission_service_delete") ?
        <Tooltip color="red" title="Xóa dịch vụ">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="dichvu__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa dịch vụ">

          <Button className="dichvu__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default XoaDichVu;