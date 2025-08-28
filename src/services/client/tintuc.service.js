import { get } from "../../utils/client/request"

export const getListTinTuc = async () => {
    const result = await get("tin-tuc-su-kien");
    return result;
}

export const getTinTuc = async (slug) => {
    const result = await get(`tin-tuc-su-kien/detail/${slug}`);
    return result;
}