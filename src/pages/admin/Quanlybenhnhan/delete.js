import { Button, Popconfirm, Tooltip } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { delBenhNhan } from "../../../services/admin/BenhNhan.Service";


function XoaBenhNhan (Props) {
  const {record, onReload} = Props
  const handleDel = async () =>{
    const res = await delBenhNhan(record._id);
    if(res.code === 200){
      onReload();
    }
  } 
  return (
    <>
      <Tooltip color="red" title="Xóa bệnh nhân">
        <Popconfirm
          okText="Xóa"
          cancelText="Hủy"
          title="Bạn có chắc muốn xóa không???"
          onConfirm={handleDel}
        >
          <Button className="benhnhan__action" icon={<MdDeleteForever />} variant="outLined" color="danger"></Button>
        </Popconfirm>
      </Tooltip>
    </>
  )
}

export default XoaBenhNhan;