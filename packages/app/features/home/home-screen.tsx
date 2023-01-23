import { useMutation, useQuery } from '@apollo/client';
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { User } from '../login/gqlTypes';
import { GET_POSTS } from '../posts/gql';
import { Post, PostResponse } from '../posts/gqlTypes';
import { FeedItem } from './feed/feed-item';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Image from 'next/image'
export function HomeScreen() {

  const [currentUser, setCurrentUser] = useState({} as User);

  const fetchUser = useCallback(async()=> {
    const userVal = await AsyncStorage.getItem('user')
      let user = JSON.parse('{}') as User
      if(userVal != null){
        user =  JSON.parse(userVal) as User
      }
      setCurrentUser(user);
      console.log("Current User: " + JSON.stringify(user))
  }, [])

    const { loading, error, data, refetch } = useQuery<PostResponse>(GET_POSTS, {
        variables: { userId: Number(currentUser.id) },
      });

    // const [userPosts, { data, loading, error, reset}] = useQuery<PostResponse>(GET_POSTS);

    useEffect(() => {
      fetchUser().catch(console.error)
      if (loading) console.log("Fetching Posts...");
      if (error) console.log("Error Fetching Posts..." + error.message + data);
      if(data != null){
        console.log(data)
          if (data?.postsByUser.length > 0){
              console.log("Got " + data.postsByUser.length + " posts: " + JSON.stringify(data))      
          }else {
            console.log("Got empty post array: " + data)
          }
      }
  
    //   userPosts({ variables: { userId: "5" } });
      
  }, [fetchUser, loading, error, data]);

  const rows: any[] = [];
    let numberOfPosts = data?.postsByUser ? data?.postsByUser.length : 0
    for (let i = 0; i < numberOfPosts; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        const post = data?.postsByUser[i]
        console.log("feed item " + i + " contains post: " + JSON.stringify(post))
        rows.push(post);
    }


  return (
    <View className="flex-1 bg-white ">
      <FlatList
        data={rows}
        renderItem={({item}: { item: Post }) => <FeedItem post={item}></FeedItem>}
      />
    </View>
  )
}

