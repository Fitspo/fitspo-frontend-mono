import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import {Platform} from 'react-native'

export async function setItem(itemKey: string, item: any){
    if(Platform.OS === 'web'){
        return await AsyncStorage.setItem(itemKey, item)
    }else if(Platform.OS === 'ios' || Platform.OS === 'android'){
        return await SecureStore.setItemAsync(itemKey, item)
    }else {
      console.log("Platform not supported")  
    }
}

export async function getItem(itemKey: string){
    if(Platform.OS === 'web'){
        return await AsyncStorage.getItem(itemKey)
    }else if(Platform.OS === 'ios' || Platform.OS === 'android'){
        return await SecureStore.getItemAsync(itemKey)
    }else {
      console.log("Platform not supported")  
    }
} 