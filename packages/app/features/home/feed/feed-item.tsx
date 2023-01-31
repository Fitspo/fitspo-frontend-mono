import { Effort, Post } from "app/features/posts/gqlTypes"
import { Text } from 'app/design/typography'
import { View } from "moti"
import { Button, Image, TouchableWithoutFeedback } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from "app/design/avatar";
import * as NavigationService from '../../../navigation/native/NavigationService';
import { useRouter } from 'solito/router'

// import { sizes } from "graphql-playground-react/lib/styled/theme";


export function FeedItem({post}: { post: Post }){
    const router = useRouter()
    const feedPost = post as Post
    console.log("Feed item: "+ JSON.stringify(post))
    const postTime = new Date(feedPost.updatedAt).toLocaleDateString()

    function feedMediaNull(){
        return feedPost.media === null || feedPost.media === "null" || feedPost.media[0] === ""
    }

    const fullName = feedPost.creator.firstName + " " + feedPost.creator.lastName

    function handleOnClick() {
        console.log("Clicked feed item")
        const postId = String(feedPost.id);
        router.push({
            pathname: '/post/[id]',
            query: {
                id: postId,
            }
        })
        // NavigationService.navigationRef.resetRoot({
        //     index: 0,
        //     routes: [{name: 'post-detail'},],
        // });
        // NavigationService.navigationRef.navigate({screen: 'screenName '}, {userName: 'Lucy'});
      }

    return (
        <TouchableWithoutFeedback onPress={()=>{handleOnClick()}}> 
        <View className="md:flex flex-start z-10 block rounded-lg shadow-md bg-gray-100 mb-5"> 
            <View className="flex-row px-4 pt-4 ">
                <Avatar 
                    profilePic={feedPost?.creator.profilePic}
                    effort={feedPost?.effort}
                    emoji={feedPost?.effortEmoji}
                ></Avatar>
                {/* <View className="items-center" style={{width:52, height:52, borderRadius: 52/ 2, borderWidth: 2, borderColor: getEffortColor()}}>
                    <Image source={{uri:feedPost.creator.profilePic as string}} style={{width:44, height:44, borderRadius: 44/ 2, margin:2}}></Image>
                </View> */}
                <View className="flex-col justify-between  ml-4 mb-4">
                    <Text className="font-medium text-black duration-300 transition ease-in-out text-sm">{fullName}</Text>
                    <Text className="font-medium text-slate-600 duration-300 transition ease-in-out text-sm">{postTime}</Text>
                </View>
            </View>
            {!feedMediaNull()  && <View  className="my-2">
                <Image source={{uri:feedPost.media as string}} style={{width:'100%', height:300}}></Image>
            </View>}
                <View className="flex-col p-4 ">
                    <Text className="text-gray-700 mb-4">{feedPost.content}</Text>
                    <View className="flex-row space-x-4">
                        <Icon name={'heart-outline'} size={25}/>
                        <MaterialIcon name={'comment-text-outline'} size={25}/>
                        {/* <Button title="Like"></Button>
                        <Button title="Comment"></Button> */}
                    </View>
                </View>
        </View>
        </TouchableWithoutFeedback>
    )
}