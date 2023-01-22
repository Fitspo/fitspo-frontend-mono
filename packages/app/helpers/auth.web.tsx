import { getCookie, setCookie, removeCookie} from 'typescript-cookie'

const TOKEN_KEY = 'TOKEN'
export const getToken = async () => {
    console.log("Looking to see if we have a JWT Token in cookies")
    let token
    try {
        token = getCookie(TOKEN_KEY) 
    } catch (e) {
        console.log("Error getting JWT Token from cookies: " + e)
    }

    if(token != null){
        console.log("Found token in cookies: " + token)
    }else {
        console.log("No token found in cookies")
    }
    
    return token
};

export const storeToken = async (token:string) => {
    try {
        setCookie(TOKEN_KEY, token)
        console.log("Stored JWT Token in cookies: " + token)
    } catch (e) {
        console.log("Error saving JWT Token in cookies: " + e)
    }    
};

export const removeToken = async () => {
    try {
        removeCookie(TOKEN_KEY)
        console.log("Removed JWT Token from cookies")
    } catch (e) {
        console.log("Error saving JWT Token in cookies: " + e)
    }
};

