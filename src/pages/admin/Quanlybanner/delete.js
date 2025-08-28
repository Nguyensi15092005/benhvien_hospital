import { Button, message, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delBanner } from "../../../services/admin/banner.service";

function XoaBanner(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  const handleDel = async () => {
    const res = await delBanner(record._id);
    if (res) {
      onReload();
      message.success("Xóa thành công.")
    }
  }

  return (
    <>
      {permission.includes("permission_bacsi_delete") ?
        <Tooltip color="red" title="Xóa banner">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="banner__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa">

          <Button className="banner__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }
    </>
  )
}
export default XoaBanner;