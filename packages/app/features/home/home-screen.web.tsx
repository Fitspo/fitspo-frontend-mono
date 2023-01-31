import { useMutation, useQuery } from '@apollo/client';
import { View } from 'app/design/view'
import { useCallback, useEffect, useState } from 'react';
import { GET_POSTS } from '../posts/gql';
import { Post, Response } from '../posts/gqlTypes';
import { FeedItem } from './feed/feed-item';
import { useCurrentUser } from '../../hooks/useCurrentUser';

// import Image from 'next/image'
export function HomeScreen() {

  const { currentUser } = useCurrentUser();

  const { loading, error, data, refetch } = useQuery<Response>(GET_POSTS, {
      variables: { userId: currentUser?.id },
    });

    useEffect(() => {
      if (loading) console.log("Fetching Posts...");
      if (error) console.log("Error Fetching Posts..." + error.message + data);
      if(data != null){
        console.log(data)
          if (data?.posts.length > 0){
              console.log("Got " + data.posts.length + " posts: ")      
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
        const post = data?.posts[i] as Post
        rows.push(<FeedItem post={post}></FeedItem>);
    }

  return (
    <View className="flex items-center justify-center p-3" style={{width:'100%'}}>
      <li className="items-center justify-center " style={{width:'66%'}}>
        {rows.reverse()}
      </li>
    </View>
  )
}
