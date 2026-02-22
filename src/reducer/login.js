export const loginAdminReducer = (state = false, action) => {
    switch (action.type) {
        case "CHECK_LOGIN":
            return action
        default:
            return state;
    }
}

export const loginUserReducer = (state = false, action) => {
    switch (action.type){
        case "CHECK_LOGIN_USER": 
            return action;
        default:
            return state;
    }
}