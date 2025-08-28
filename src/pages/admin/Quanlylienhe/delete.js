import { Button, message, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delContact } from "../../../services/admin/contact.service";

function XoaContact(Props) {
  const { record, onReload } = Props;
  const permission = JSON.parse(localStorage.getItem("permission") || "[]");


  const handleDel = async () => {
    const res = await delContact(record._id);
    if (res) {
      onReload();
      message.success("Xóa liên hệ thành công.")
    }
  }

  return (
    <>
      {permission.includes("permission_contact_delete") ?
        <Tooltip color="red" title="Xóa liên hệ này">
          <Popconfirm okText="xóa"
            cancelText="hủy"
            title="bạn có chắc muốn xóa không???"
            onConfirm={handleDel}
          >
            <Button className="contact__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

            </Button>
          </Popconfirm>
        </Tooltip>
        :
        <Tooltip color="red" title="Bạn không có quyền xóa">

          <Button className="contact__action" icon={<MdDeleteForever />} variant="outLined" color="danger">

          </Button>

        </Tooltip>
      }

    </>
  )
}
export default XoaContact;