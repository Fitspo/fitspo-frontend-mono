import { Post } from "app/features/posts/gqlTypes"
import { Text } from 'app/design/typography'
import { View } from "moti"
import { Button, Image } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { sizes } from "graphql-playground-react/lib/styled/theme";


export function FeedItem({post}: { post: Post }){
    const feedPost = post as Post
    console.log("Feed item: "+ JSON.stringify(post))
    const postTime = JSON.stringify(feedPost.updatedAt)

    function feedMediaNull(){
        return feedPost.media === null || feedPost.media === "null"
    }

    function getEffortColor(){
        switch (feedPost.effort) {
            case "high":
                return 'red'
            case "medium":
                return 'yellow'
            case "low":
                return 'green'
            default:
                return 'slate'
        }
    }

    // const postUri = feedPost.media as string

    return (
        <View className="md:flex flex-start z-10 block rounded-lg shadow-md bg-gray-100 mb-5">
            <View className="flex-row px-4 pt-4 ">
                <View className="items-center" style={{width:52, height:52, borderRadius: 52/ 2, borderWidth: 2, borderColor: getEffortColor()}}>
                    <Image source={{uri:feedPost.user.profilePic}} style={{width:44, height:44, borderRadius: 44/ 2, margin:2}}></Image>
                </View>
                <View className="flex-col justify-between  ml-4 mb-4">
                    <Text className="font-medium text-black duration-300 transition ease-in-out text-sm">{feedPost.user.fullName}</Text>
                    <Text className="font-medium text-slate-600 duration-300 transition ease-in-out text-sm">{postTime}</Text>
                </View>
            </View>
            {!feedMediaNull()  && <View  className="my-2">
                <Image source={{uri:feedPost.media as string}} style={{width:'100%', height:300}}></Image>
            </View>}
                <View className="flex-col p-4 ">
                    <Text className="text-gray-700 mb-4">{feedPost.message}</Text>
                    <View className="flex-row space-x-4">
                        <Icon name={'heart-outline'} size={25}/>
                        <MaterialIcon name={'comment-text-outline'} size={25}/>
                        {/* <Button title="Like"></Button>
                        <Button title="Comment"></Button> */}
                    </View>
                </View>
                
        </View>
    )
}