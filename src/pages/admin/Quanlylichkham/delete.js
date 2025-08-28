import { Button, message, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delLichKham } from "../../../services/admin/lichkham.service";

function HuyLichKham(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");

  const handleDel = async () => {
    const res = await delLichKham(record._id);
    if (res) {
      onReload();
      message.success("Hủy lịch khám thành công.")
    }
  }

  return (
    <>
      {permission.includes("permission_lichkham_delete") ?
        <Tooltip color="red" title="Hủy lịch khám">
          <Popconfirm okText="Có"
            cancelText="Không"
            title="bạn có chắc muốn hủy không???"
            onConfirm={handleDel}
          >
            <Button className="lichkham__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền hủy lịch khám">

          <Button className="lichkham__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default HuyLichKham;