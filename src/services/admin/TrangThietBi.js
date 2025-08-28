import { deleted, get, pacth, post } from "../../utils/admin/request"

export const getListTrangThietBi = async () =>{
    const result = await get("trang-thiet-bi");
    return result;
};

export const postThietBi = async (option) => {
    const result = await post("trang-thiet-bi/create", option);
    return result;
};

export const getThietBi = async (id) => {
    const result = await get(`trang-thiet-bi/detail/${id}`);
    return result;
};

export const patchThietBi = async (id, option) => {
    const result = await pacth(`trang-thiet-bi/edit/${id}`, option);
    return result;
}

export const delThietBi = async (id) => {
    const result = await deleted(`trang-thiet-bi/delete/${id}`);
    return result;
}