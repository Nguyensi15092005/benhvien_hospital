import { deleted, get, pacth, post } from "../../utils/admin/request"

export const postKhoa = async (option) => {
    const result = await post("khoa/create", option);
    return result;
};

export const getListKhoa = async () => {
    const result = await get("khoa");
    return result;
};

export const patchKhoa = async (id, option) => {
    const result = await pacth(`khoa/edit/${id}`, option);
    return result;
};

export const getKhoa = async (id) => {
    const result = await get(`khoa/detail/${id}`);
    return result;
};

export const delKhoa = async (id) => {
    const result = await deleted(`khoa/delete/${id}`);
    return result; 
}