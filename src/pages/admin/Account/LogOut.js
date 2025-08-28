import { Button, Popconfirm, Tooltip } from "antd";
import { FaSignOutAlt } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { deleteAllCookie } from "../../../helpers/cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginAdmin } from "../../../action/login";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleConfirm = () =>{
    deleteAllCookie();
    localStorage.removeItem("permission");
    dispatch(setLoginAdmin(false));
    navigate("/admin/login");
  }
  return (
    <>
      <Tooltip title="Đăng xuất">
        <Popconfirm 
          okText="Đăng xuất"
          cancelText="Hủy"
          title="Đăng xuất?"
          icon={<BsFillQuestionCircleFill />}
          onConfirm={handleConfirm}
        >
          <Button color="danger" variant="solid" icon={<FaSignOutAlt />}>
            Đăng xuất
          </Button>

        </Popconfirm>
      </Tooltip>

    </>
  )
};
export default LogOut;