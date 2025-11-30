import { get } from "../../utils/admin/request"

export const getlistDashboard = async () => {
    const result = await get("dashboard");
    return result;
}
export const getThongKeBieuDo = async () => {
    const result = await get("dashboard/bieu-do");
    return result;
};
export const getLichHen = async () => {
    const result = await get("dashboard/lich-hen");
    return result;
}
export const getLichkhamgannhat = async () => {
    const result = await get("dashboard/lich-kham-gan-nhat");
    return result;
}