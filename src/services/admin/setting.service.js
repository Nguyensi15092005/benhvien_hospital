import { get, pacth, post } from "../../utils/admin/request"

export const getSetting = async () => {
    const result  = await get("cai-dat-chung");
    return result;
}

export const postSetting = async (option) => {
    const result  = await post("cai-dat-chung/create", option);
    return result;
}

export const patchSetting = async (option) => {
    const result  = await pacth("cai-dat-chung/update", option);
    return result;
}