import { get } from "../../utils/client/request"

export const getListBanner = async () => {
    const result = await get("banner");
    return result;
};