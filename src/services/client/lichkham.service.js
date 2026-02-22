import { deleted, get, post } from "../../utils/client/request";

export const postLichKham = async (option) => {
    const result = await post("lich-kham/create", option);
    return result;
};

export const getLichKhamUse = async (token) => {
    const result = await get(`lich-kham/user/${token}`);
    return result;
}

export const delLichKham = async (lichKhamId) => {
    const result = await deleted(`lich-kham/huy-lich-kham/${lichKhamId}`);
    return result;
}