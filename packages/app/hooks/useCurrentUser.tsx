import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "../features/login/gqlTypes";
import * as LocalStorage from "../helpers/LocalStorage"

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null | undefined>();

    const fetchUser = useCallback(async()=> {
        const userString = await LocalStorage.getItem('user')
        let currentUser = JSON.parse('{}') as User
        if(userString != null){
            currentUser =  JSON.parse(userString) as User
        }
        setCurrentUser(currentUser);
    }, [])

    useEffect(() => {
        fetchUser().catch(console.error);
    }, [fetchUser]);

    return { currentUser }
}


