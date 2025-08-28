import { deleted, get, pacth, post } from "../../utils/admin/request";
export const getListDichVu = async () => {
  const result = await get("dich-vu-kham-benh");
  return result;
}

export const postDichVu = async (option) => {
  const result = await post("dich-vu-kham-benh/create", option);
  return result;
}

export const getDichVu = async (id) => {
  const result = await get(`dich-vu-kham-benh/detail/${id}`);
  return result;
}

export const patchDichVu = async (id, option) => {
  const result = await pacth(`dich-vu-kham-benh/edit/${id}`, option);
  return result;
}

export const delDichVu = async (id) => {
  const result = await deleted(`dich-vu-kham-benh/delete/${id}`);
  return result;
}