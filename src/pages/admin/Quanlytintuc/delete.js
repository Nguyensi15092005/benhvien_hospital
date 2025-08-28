import { Button, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delTinTuc } from "../../../services/admin/tintuc.service";

function XoaTinTuc(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delTinTuc(record._id);
    if (res) {
      onReload();
    }
  }
  return (
    <>
      {permission.includes("permission_tintuc_delete") ?
        <Tooltip color="red" title="Xóa tin tức sự kiên?">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="tintuc__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa">

          <Button className="tintuc__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default XoaTinTuc;