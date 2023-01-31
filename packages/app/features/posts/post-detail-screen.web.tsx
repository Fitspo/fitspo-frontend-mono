import { useQuery } from "@apollo/client";
import { Avatar } from "app/design/avatar";
import { useEffect, useState } from "react";
import { View, Image, Text, Button } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createParam } from 'solito'
import { GET_POSTS } from "./gql";
import { Post, Response } from "./gqlTypes";

const { useParam } = createParam<{ 
    id: string
 }>()

export function PostDetailScreen() {
    const [postId] = useParam('id')
    const [post, setPost] = useState<Post>();

    const { loading, error, data, refetch } = useQuery<Response>(GET_POSTS, {
        variables: { "where": {
            "id": postId
          } },
    });
    
    useEffect(() => {
        if (loading) console.log("Fetching Posts...");
        if (error) console.log("Error Fetching Posts..." + error.message + data);
        if(data != null){
          console.log(data)
            if (data?.posts.length > 0){
                console.log("Got post: " + JSON.stringify(data))   
                setPost(data.posts[0])   
            }else {
              console.log("Got empty post array: " + data)
            }
        }
                
    }, [loading, error, data]);
    
    function getPostTimeOrDefault() {
        if(post === undefined || post === null){
            return ""
        }else {
            return new Date(post!.updatedAt).toLocaleDateString()
        }
    }

    function getNameOrDefault() {
        if(post === undefined || post === null){
            return ""
        }else {
            return post.creator.firstName + " " + post.creator.lastName
        }
    }

    function getPostMediaOrDefault(){
        if(post === undefined || post === null){
            return ""
        }else if(post.media === null || post.media === undefined || post.media === "") {
            return post.media
        }else {
            return post.media as string
        }
    }

    function feedMediaNull(){
        return data?.posts[0].media === null || data?.posts[0].media === "null" || data?.posts[0].media[0] === ""
    }
    return (
        <View className="md:flex flex-start z-10 block rounded-lg shadow-md bg-gray-100 mb-5">
            <View className="flex-row px-4 pt-4 ">
                <Avatar 
                    profilePic={data?.posts[0].creator.profilePic}
                    effort={data?.posts[0].effort}
                    emoji={data?.posts[0].effortEmoji}
                ></Avatar>
                <View className="flex-col justify-between  ml-4 mb-4">
                    <Text className="font-medium text-black duration-300 transition ease-in-out text-sm">{getNameOrDefault()}</Text>
                    <Text className="font-medium text-slate-600 duration-300 transition ease-in-out text-sm">{getPostTimeOrDefault()}</Text>
                </View>
            </View>
            {!feedMediaNull()  && <View  className="my-2">
                <Image source={{uri: getPostMediaOrDefault()}} style={{width:'100%', height:300}}></Image>
            </View>}
                <View className="flex-col p-4 ">
                    <Text className="text-gray-700 mb-4">{data?.posts[0].content}</Text>
                    <View className="flex-row space-x-4">
                        <Icon name={'heart-outline'} size={25}/>
                        <MaterialIcon name={'comment-text-outline'} size={25}/>
                        <Button title="Like"></Button>
                        <Button title="Comment"></Button>
                    </View>
                </View>
                
        </View>
    )
}