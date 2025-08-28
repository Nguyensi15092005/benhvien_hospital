const API_DOMAIN = "https://hospital-be-ufyn.vercel.app/api";

export const get = async (path) => {
    try {
        const response = await fetch(API_DOMAIN + path);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const post = async (path, options) =>{
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "POST", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleted = async (path) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "DELETE"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const pacth = async (path, options) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
