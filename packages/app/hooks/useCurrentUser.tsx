import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "app/features/user/gql";
import { useState, useCallback, useEffect } from "react";
import { User, Response } from "../features/login/gqlTypes";
import * as LocalStorage from "../helpers/LocalStorage"

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null | undefined>();
    const { loading, error, data } = useQuery<Response>(GET_CURRENT_USER);

    const fetchUser = useCallback(async()=> {
        const userVal = await LocalStorage.getItem('user')
          let user = JSON.parse('{}') as User
          if(userVal != null){
            user =  JSON.parse(userVal) as User
          }
          setCurrentUser(user);
          console.log("Current User: " + JSON.stringify(user))
      }, [])

    useEffect(() => {
        fetchUser().catch(console.error)
        if (loading) console.log("Fetching Current User...");
        if (error) console.log("Error Fetching Current User..." + error.message + data);
        if(data != null){
          console.log(data)
            if (data.success){
                console.log("Got current user: " + JSON.stringify(data.user)) 
                setCurrentUser(data.user)     
            }else {
              console.log("Failed to get current user: " + data.message)
            }
        }
            
    }, [fetchUser, loading, error, data]);

    return { currentUser }
}


