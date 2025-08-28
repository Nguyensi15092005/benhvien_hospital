import { deleted, get, pacth, post, postCookie } from "../../utils/admin/request"

export const postLogin = async (option) => {
    const result = await postCookie("auth/login", option);
    return result;
};

export const getListAccount = async () => {
    const result = await get("tai-khoan-admin");
    return result;
};

export const postAccount = async (option) => {
    const result = await post("tai-khoan-admin/create", option);
    return result;
};

export const getAccount = async (id) => {
    const result = await get(`tai-khoan-admin/detail/${id}`);
    return result;
};

export const patchAccount = async (id, option) => {
    const result = await pacth(`tai-khoan-admin/edit/${id}`, option);
    return result;
};

export const delAccount = async (id) => {
    const result = await deleted(`tai-khoan-admin/delete/${id}`);
    return result;
}