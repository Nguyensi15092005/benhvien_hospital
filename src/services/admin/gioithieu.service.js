import { get, pacth, post } from "../../utils/admin/request"

export const getAbout = async () => {
    const result = await get("gioi-thieu");
    return result;
};

export const postAbout = async (option) => {
    const result = await post("gioi-thieu/create", option);
    return result;
};

export const patchAbout = async (option) => {
    const result = await pacth("gioi-thieu/update", option);
    return result;
};