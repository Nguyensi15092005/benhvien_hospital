import { Button, message, Popconfirm, Tooltip } from "antd";
import { delBacSi } from "../../../services/admin/BacSi.Service";
import { MdDeleteForever } from "react-icons/md";

function XoaBacSi(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delBacSi(record._id);
    if (res) {
      onReload();
      message.success("Xóa Bác sĩ thành công.")
    }
  }

  return (
    <>
      {permission.includes("permission_bacsi_delete") ?
        <Tooltip color="red" title="Xóa Bác sĩ">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="bacsi__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa Bác sĩ">

          <Button className="bacsi__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default XoaBacSi;