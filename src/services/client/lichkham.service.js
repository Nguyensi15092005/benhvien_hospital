import { post } from "../../utils/client/request";

export const postLichKham = async (option) => {
    const result = await post("lich-kham/create", option);
    return result;
};