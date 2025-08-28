import {get} from "../../utils/client/request";

export const getListBS = async () =>{
    const result = await get("bac-si");
    return result;
};

export const getPagiBS = async (page) =>{
    const result = await get(`bac-si/pagi?page=${page}`);
    return result;
};


export const getListBSKhoaId = async (khoa_id) =>{
    const result = await get (`bac-si/${khoa_id}`);
    return result;
};