import { useMutation, useQuery } from '@apollo/client';
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { User } from '../login/gqlTypes';
import { GET_POSTS } from '../posts/gql';
import { Post, Response } from '../posts/gqlTypes';
import { FeedItem } from './feed/feed-item';
import { useCurrentUser } from "app/hooks/useCurrentUser";
import * as NavigationService from '../../navigation/native/NavigationService';

// import Image from 'next/image'
export function HomeScreen() {
  const { currentUser } = useCurrentUser();
  const [refreshing, setRefreshing] = useState(false)

    const { loading, error, data, refetch } = useQuery<Response>(GET_POSTS, {
        variables: { userId: Number(currentUser?.id) },
      });

    useEffect(() => {
      if (loading) console.log("Fetching Posts...");
      if (error) console.log("Error Fetching Posts..." + error.message + data);
      if(data != null){
        console.log(data)
          if (data?.posts.length > 0){
              console.log("Got " + data.posts.length + " posts: " + JSON.stringify(data))      
          }else {
            console.log("Got empty post array: " + data)
          }
      }
        
  }, [loading, error, data]);

  const rows: any[] = [];
    let numberOfPosts = data?.posts ? data?.posts.length : 0
    for (let i = 0; i < numberOfPosts; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        const post = data?.posts[i]
        console.log("feed item " + i + " contains post: " + JSON.stringify(post))
        rows.push(post);
    }



  return (
    <View className="flex-1 bg-white ">
      <FlatList
        data={rows.reverse()}
        renderItem={({item}: { item: Post }) => <FeedItem post={item}></FeedItem>}
        refreshing={false}
        onRefresh={refetch}
      />
    </View>
  )
}

