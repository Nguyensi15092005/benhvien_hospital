export const setLoginAdmin = (status) => {
    return {
        type: "CHECK_LOGIN",
        status: status
    }
}

export const setLoginUser = (status) => {
    return {
        type: "CHECK_LOGIN_USER",
        status: status
    }
}