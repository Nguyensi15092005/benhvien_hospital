import { deleted, get, pacth } from "../../utils/admin/request"

export const getListBenhNhan = async () => {
    const result = await get("benh-nhan");
    return result;
};

export const getBenhNhan = async (id) => {
    const result = await get(`benh-nhan/detailt/${id}`);
    return result;
};

export const patchBenhNhan = async (id, option) => {
    const result = await pacth(`benh-nhan/edit/${id}`, option);
    return result;
}

export const delBenhNhan = async (id) =>{
    const result = await deleted(`benh-nhan/delete/${id}`);
    return result;
}