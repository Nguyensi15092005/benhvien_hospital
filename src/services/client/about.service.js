import {get} from "../../utils/client/request";

export const getAbout = async () => {
    const result = await get("gioi-thieu");
    return result;
}