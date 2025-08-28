import { deleted, get, pacth, post } from "../../utils/admin/request"

export const getListNhomQuyen = async () => {
    const result = await get("nhom-quyen");
    return result;
}

export const postNhomQuyen = async (option) => {
    const result = await post("nhom-quyen/create", option);
    return result;
}

export const getNhomQuyen = async (id) => {
    const result = await get(`nhom-quyen/detail/${id}`);
    return result;
}

export const patchNhomQuyen = async (id, option) => {
    const result = await pacth(`nhom-quyen/edit/${id}`, option);
    return result;
}

export const delNhomQuyen = async (id) => {
    const result = await deleted(`nhom-quyen/delete/${id}`);
    return result;
}