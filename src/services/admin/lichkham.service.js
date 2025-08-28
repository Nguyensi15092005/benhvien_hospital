import { deleted, get, pacth, post } from "../../utils/admin/request"


export const postLichKham = async (option) => {
    const result = await post("lich-kham/create", option);
    return result;
};

export const getLishLichKham = async () => {
    const result = await get("lich-kham");
    return result;
};

export const getLichKham = async (id) => {
    const result = await get(`lich-kham/detail/${id}`);
    return result;
};

export const patchLichKham = async (id, option) => {
    const result =await pacth(`lich-kham/edit/${id}`, option);
    return result;
};

export const pacthStatus = async (id, status) => {
    const result = await pacth(`lich-kham/change-status/${id}/${status}`);
    return result;
}

export const delLichKham = async (id) => {
    const result =await deleted(`lich-kham/delete/${id}`);
    return result;
};

export const patchSendMail = async (value) => {
    const result =await pacth(`lich-kham/sendmail`, value);
    return result;
};

