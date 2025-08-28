import { get, pacth } from "../../utils/admin/request"

export const getListRole = async () => {
    const result= await get("nhom-quyen");
    return result;
}

export const patchPermission = async (permission) => {
    const result = await pacth("phan-quyen/permission", permission);
    return result;
}

export const getRoleId = async (role_id) => {
    const result = await get(`phan-quyen/role/${role_id}`);
    return result;
}

