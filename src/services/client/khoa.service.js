import { get } from "../../utils/client/request"

export const getListKhoa = async () => {
    const result = await get("khoa");
    return result;
}