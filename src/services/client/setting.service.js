import {get} from "../../utils/client/request";


export const getSetting = async () => {
    const result = await get("setting");
    return result;
}