import { deleted, get, pacth, post } from "../../utils/admin/request";
export const getListTinTuc = async () => {
  const result = await get("tin-tuc-su-kien");
  return result;
}

export const postTinTuc = async (option) => {
  const result = await post("tin-tuc-su-kien/create", option);
  return result;
}

export const getTinTuc = async (id) => {
  const result = await get(`tin-tuc-su-kien/detail/${id}`);
  return result;
}

export const patchTinTuc = async (id, option) => {
  const result = await pacth(`tin-tuc-su-kien/edit/${id}`, option);
  return result;
}

export const delTinTuc = async (id) => {
  const result = await deleted(`tin-tuc-su-kien/delete/${id}`);
  return result;
}