import { useMutation } from '@apollo/client'
import { View } from 'app/design/view'
import { useState } from 'react'
import { Button, Text, TextInput, FlatList } from 'react-native'
import { useRouter } from 'solito/router'
import { CREATE_POST } from './gql'
import { Effort, PostCreateInput } from './gqlTypes'
import EmojiModal from 'react-native-emoji-modal';
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import { Avatar } from 'app/design/avatar'


export function CreatePostScreen() {
  const router = useRouter()
  const [content, setContent] = useState(""); 
  const [effort, setEffort] = useState<Effort | undefined>();
  const [effortEmoji, setEffortEmoji] = useState<string>("");
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [moreEffortEmojis, setMoreEffortEmojis] = useState(false);
  const [createPost, { data, loading, error, reset}] = useMutation<Response>(CREATE_POST);
  const { currentUser } = useCurrentUser();

  async function handleSubmitPost(){
    const newPost = {} as PostCreateInput
    if(effort !== undefined){
        newPost.effort = effort
    }
    newPost.effortEmoji = effortEmoji
    newPost.content = content
    if(mediaUrl !== undefined){
      newPost.media = mediaUrl
    }
    newPost.creator = {
        connect: {
            where: {
                node: {
                    id: currentUser?.id!  // this should have a safety check around it!
                }
            }
        }
    }

    console.log("Create post was clicked with info: " + JSON.stringify(newPost))
    
    // await UploadService.uploadImage(mediaUrl, selectedFile)
    createPost({ variables: { input: newPost} });

    setContent("")
    setEffort(undefined)
    setEffortEmoji("")
    
    router.replace('/home')
}

function handleOnEffortEmojiClicked(effort: Effort, emoji: string) {
  console.log("Clicked on emoji: " + emoji)
  setEffort(effort)
  if(emoji === "..."){
    setMoreEffortEmojis(true)
  }else {
    setEffortEmoji(emoji)
    setMoreEffortEmojis(false)
  }
}

const lowEffortEmojis = ["😀","🙂","😎","🫠","..."]
const mediumEffortEmojis = ["😐","😟","😵‍💫","😥","..."]
const highEffortEmojis = ["😮‍💨","🥴","🥵","🤢","..."]

  return (
    <View className="md:flex items-center justify-center p-4 w-full h-full bg-white">
      <View className="md:flex-col z-10 p-4 w-full h-full">
        <View className="flex">
          <View className="flex-row">
            <Avatar 
              profilePic={currentUser?.profilePic}
              effort={effort}
              emoji={effortEmoji}
            ></Avatar>
            <View className="flex-col justify-between  ml-4 mb-4">
                <Text className="font-medium text-black duration-300 transition ease-in-out text-sm">{currentUser?.firstName + " " + currentUser?.lastName}</Text>
            </View>
          </View>
        </View>
        <View className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col space-y-1 my-2 h-auto bg-gray-100" style={{position:'relative', zIndex:1}}>
          <Text className="flex items-center font-bold p-2">Level Of Effort:</Text>
          {moreEffortEmojis && 
            <View className="z-150 dropdown absolute mt-8 ">
              <EmojiModal containerStyle={{position:'relative', zIndex:5}} 
                onEmojiSelected={(item)=>{handleOnEffortEmojiClicked(effort as Effort, item as string)}}
                onPressOutside={()=>{setMoreEffortEmojis(false)}} />
            </View>}
          <View className="flex items-start p-1 bg-green-200 rounded-full border-1" style={{position:'relative', zIndex:2}}>
            <FlatList className="flex flex-row" 
              horizontal={true}
              data={lowEffortEmojis}
              renderItem={({item}: { item: string }) => <Text className="px-1" onPress={()=>{handleOnEffortEmojiClicked(Effort.LOW, item)}}>{item}</Text>}>
            </FlatList> 
          </View>
          <View className="flex items-start p-1 bg-yellow-200 rounded-full border-1" style={{position:'relative', zIndex:2}}>
            <FlatList className="flex flex-row" 
              horizontal={true}
              data={mediumEffortEmojis}
              renderItem={({item}: { item: string }) => <Text className="px-1" onPress={()=>{handleOnEffortEmojiClicked(Effort.MEDIUM, item)}}>{item}</Text>}>
            </FlatList>
          </View> 
          <View className="flex items-start p-1 bg-red-200 rounded-full border-1" style={{position:'relative', zIndex:2}}>
            <FlatList className="flex flex-row" 
              horizontal={true}
              data={highEffortEmojis}
              renderItem={({item}: { item: string }) => <Text className="px-1" onPress={()=>{handleOnEffortEmojiClicked(Effort.HIGH, item)}}>{item}</Text>}>
            </FlatList>
          </View>
        </View>
        <View className="w-full border border-gray-200 rounded-lg bg-white" style={{position:'relative', zIndex:-5}}>
          <View className="px-4 p-2 bg-white rounded-t-lg">
            <TextInput className="h-24 w-full resize-none p-4 text-sm text-gray-900"
              placeholder="How was your workout?"
              style={{padding: 10}}
              multiline={true}
              numberOfLines={6}
              value={content}
              onChangeText={(text)=>{setContent(text)}}>
            </TextInput>
          </View>
          <View className="flex items-center justify-between px-3 py-2 border-t">
            <Button onPress={()=>{handleSubmitPost()}} title={"create Post"}></Button>
          </View>
        </View>
      </View>      
    </View>
  )
}
