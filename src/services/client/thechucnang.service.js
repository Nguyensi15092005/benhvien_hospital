import {get} from "../../utils/client/request";

export const getTheChucNang = async () => {
    const result = await get("the-chuc-nang");
    return result;
}