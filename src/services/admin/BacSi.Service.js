import { deleted, get, pacth, post } from "../../utils/admin/request";
export const getDSbacsi = async () => {
  const result = await get("bac-si");
  return result;
}

export const postBacsi = async (option) => {
  const result = await post("bac-si/create", option);
  return result;
}

export const getBacSi = async (id) => {
  const result = await get(`bac-si/detail/${id}`);
  return result;
}

export const patchBacSi = async (id, option) => {
  const result = await pacth(`bac-si/edit/${id}`, option);
  return result;
}

export const delBacSi = async (id) => {
  const result = await deleted(`bac-si/delete/${id}`);
  return result;
}