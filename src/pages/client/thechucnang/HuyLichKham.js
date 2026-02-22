import { message, Popconfirm, Tag, Tooltip } from "antd";
import { delLichKham } from "../../../services/client/lichkham.service";
import { SyncOutlined } from '@ant-design/icons';
function HuyLichKham(Props) {
  const { record, onReload } = Props;

  const handleDel = async () => {
    const res = await delLichKham(record._id);
    if (res) {
      onReload();
      message.success("Xóa lịch khám thành công.");
    }
  };

  return (
    <>
      <Tooltip color="red" title="Hủy lịch khám">
        <Popconfirm
          okText="Xóa"
          cancelText="Hủy"
          title="Bạn có chắc muốn hủy không???"
          onConfirm={handleDel}
        >
          <Tag key="processing" color="processing" icon={<SyncOutlined spin />}>
            Đang xác nhận
          </Tag>
        </Popconfirm>
      </Tooltip>
    </>
  );
}
export default HuyLichKham;
