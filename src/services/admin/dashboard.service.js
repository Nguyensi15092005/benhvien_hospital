import { get } from "../../utils/admin/request"

export const getlistDashboard = async () => {
    const result = await get("");
    return result;
}
export const getThongKeBieuDo = async () => {
    const result = await get("bieu-do");
    return result;
};
export const getLichHen = async () => {
    const result = await get("lich-hen");
    return result;
}
export const getLichkhamgannhat = async () => {
    const result = await get("lich-kham-gan-nhat");
    return result;
}