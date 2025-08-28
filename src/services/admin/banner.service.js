import { deleted, get, pacth, post } from "../../utils/admin/request";

export const getListBanner = async () => {
    const result = await get("banner");
    return result;
};
export const postBanner = async (option) => {
    const result = await post("banner/create", option);
    return result;
};

export const getBanner = async (id) => {
    const result = await get(`banner/detail/${id}`);
    return result;
};

export const pacthBanner = async (id, option) => {
    const result = await pacth(`banner/edit/${id}`, option);
    return result;
};

export const delBanner = async (id) => {
    const result = await deleted(`banner/delete/${id}`);
    return result;
}



