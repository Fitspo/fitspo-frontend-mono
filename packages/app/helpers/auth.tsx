import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'TOKEN'
export const getToken = async () => {
    console.log("Looking to see if we have a JWT Token")
    let token
    try {
        token = await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (e) {
        console.log("Error getting JWT Token: " + e)
    }

    if(token != null){
        console.log("Found token: " + token)
    }else {
        console.log("No token found")
    }
    
    return token
};

export const storeToken = async (token:string) => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        console.log("Stored JWT Token: " + token)
    } catch (e) {
        console.log("Error saving JWT Token: " + e)
    }    
};

export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        console.log("Removed JWT Token")
    } catch (e) {
        console.log("Error saving JWT Token: " + e)
    }
};

