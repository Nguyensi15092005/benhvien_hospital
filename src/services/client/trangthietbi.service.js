import { get } from "../../utils/client/request"

export const getListThietBi = async () => {
    const result = await get("trang-thiet-bi");
    return result;
}