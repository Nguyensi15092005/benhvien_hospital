import { get } from "../../utils/client/request"

export const getListService = async () => {
    const result = await get("dich-vu-kham-benh");
    return result;
}