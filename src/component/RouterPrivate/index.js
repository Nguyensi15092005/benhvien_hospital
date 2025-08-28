import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { setLoginAdmin } from "../../action/login";
function PrivateAdmin () {
    const dispatch = useDispatch();
    const login = getCookie("tokenAdmin");
    if(login){
        dispatch(setLoginAdmin(true));
    }
    const islogin = useSelector(state => state.loginAdminReducer);
    
    return (
        <>
            {islogin ? (<Outlet />) : (<Navigate to="/admin/login"/>)}
        </>
    )
}

export default PrivateAdmin;