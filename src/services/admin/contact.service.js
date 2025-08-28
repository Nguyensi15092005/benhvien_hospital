import { deleted, get, pacth } from "../../utils/admin/request"

export const getListContact = async () => {
    const result = await get("lien-he");
    return result;
}

export const getContact = async (id) => {
    const result = await get(`lien-he/detail/${id}`);
    return result;
};

export const delContact= async (id) => {
    const result = await deleted(`lien-he/delete/${id}`);
    return result;
};

export const patchStatus = async (id, status) => {
    const result = await  pacth(`lien-he/change-status/${id}/${status}`);
    return result;
}

export const patchSendMail = async (value) => {
    const result = await  pacth(`lien-he/reply`, value);
    return result;
}