import { post, postLoginGoogle } from "../../utils/client/request"

export const requesLoginGoogle = async (gg)=>{
    const result = await postLoginGoogle("user/login-google", gg);
    return result;
}

export const Register = async (options) => {
    const result = await post("user/register", options);
    return result;
}

export const LoginPost = async (options) => {
    const result = await post("user/login", options);
    return result;
}

