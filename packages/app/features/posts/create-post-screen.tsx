import { useMutation } from '@apollo/client'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Image, GestureResponderEvent, TextInput, FlatList } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'solito/router'
import { User } from '../login/gqlTypes'
import { CREATE_POST } from './gql'
import { Effort, PostCreateInput } from './gqlTypes'
import EmojiModal from 'react-native-emoji-modal';


export function CreatePostScreen() {
  const router = useRouter()
  const [content, setContent] = useState(""); 
  const [effort, setEffort] = useState<Effort | undefined>();
  const [effortEmoji, setEffortEmoji] = useState<String>("");
  const [mediaUrl, setMediaUrl] = useState<String>();
  const [currentUser, setCurrentUser] = useState({} as User);
  const [moreEffortEmojis, setMoreEffortEmojis] = useState(false);
  const [createPost, { data, loading, error, reset}] = useMutation<Response>(CREATE_POST);

  const fetchUser = useCallback(async()=> {
    const userVal = await SecureStore.getItemAsync('user')
    let user = JSON.parse('{}') as User
    if(userVal != null){
        user =  JSON.parse(userVal) as User
    }
    setCurrentUser(user);
  }, [])

  useEffect(() => {
    fetchUser().catch(console.error)
  }, [fetchUser,]);

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
                    id: currentUser.id
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

function handleOnEffortEmojiClicked(effort: Effort, emoji: String) {
  console.log("Clicked on emoji: " + emoji)
  setEffort(effort)
  if(emoji === "..."){
    setMoreEffortEmojis(true)
  }else {
    setEffortEmoji(emoji)
    setMoreEffortEmojis(false)
  }
}

function getEffortColor(){
  switch (effort) {
      case Effort.HIGH:
          return 'red'
      case Effort.MEDIUM:
          return 'yellow'
      case Effort.LOW:
          return 'green'
      default:
          return 'slate'
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
            <View className="items-center" style={{width:52, height:52, borderRadius: 52/ 2, borderWidth: 2, borderColor: getEffortColor()}}>
                <Image source={{uri:currentUser.profilePic as string}} style={{width:44, height:44, borderRadius: 44/ 2, margin:2}}></Image>
            </View>
            <View className="flex-col justify-between  ml-4 mb-4">
                <Text className="font-medium text-black duration-300 transition ease-in-out text-sm">{currentUser.firstName + " " + currentUser.lastName}</Text>
                <Text className="relative top-3 right-7 z-50">{effortEmoji}</Text>
            </View>
          </View>
        </View>
        <View className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col space-y-1 my-2 h-auto bg-gray-100" style={{position:'relative', zIndex:1}}>
          <Text className="flex items-center font-bold p-2">Level Of Effort:</Text>
          {moreEffortEmojis && 
            <View className="z-150 dropdown absolute mt-8 ">
              <EmojiModal containerStyle={{position:'relative', zIndex:5}} 
                onEmojiSelected={(item)=>{handleOnEffortEmojiClicked(effort as Effort, item as String)}}
                onPressOutside={()=>{setMoreEffortEmojis(false)}} />
            </View>}
          <View className="flex items-start p-1 bg-green-200 rounded-full border-1" style={{position:'relative', zIndex:2}}>
            <FlatList className="flex flex-row" 
              horizontal={true}
              data={lowEffortEmojis}
              renderItem={({item}: { item: String }) => <Text className="px-1" onPress={()=>{handleOnEffortEmojiClicked(Effort.LOW, item)}}>{item}</Text>}>
            </FlatList> 
          </View>
          <View className="flex items-start p-1 bg-yellow-200 rounded-full border-1" style={{position:'relative', zIndex:2}}>
            <FlatList className="flex flex-row" 
              horizontal={true}
              data={mediumEffortEmojis}
              renderItem={({item}: { item: String }) => <Text className="px-1" onPress={()=>{handleOnEffortEmojiClicked(Effort.MEDIUM, item)}}>{item}</Text>}>
            </FlatList>
          </View> 
          <View className="flex items-start p-1 bg-red-200 rounded-full border-1" style={{position:'relative', zIndex:2}}>
            <FlatList className="flex flex-row" 
              horizontal={true}
              data={highEffortEmojis}
              renderItem={({item}: { item: String }) => <Text className="px-1" onPress={()=>{handleOnEffortEmojiClicked(Effort.HIGH, item)}}>{item}</Text>}>
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
