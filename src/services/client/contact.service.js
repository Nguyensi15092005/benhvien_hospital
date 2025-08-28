import { post } from "../../utils/client/request"

export const postContact = async (option) => {
    const result = await post("lien-he/create", option);
    return result;
};