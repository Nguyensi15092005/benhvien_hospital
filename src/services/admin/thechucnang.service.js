import { get, pacth, post } from "../../utils/admin/request"

export const getTheChucNang= async () => {
    const result  = await get("the-chuc-nang");
    return result;
}

export const postTheChucNang = async (option) => {
    const result  = await post("the-chuc-nang/create", option);
    return result;
}

export const patchTheChucNang = async (option) => {
    const result  = await pacth("the-chuc-nang/update", option);
    return result;
}