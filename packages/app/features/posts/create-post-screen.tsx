import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import React from 'react'
import { Button, GestureResponderEvent, TextInput, StyleSheet, Platform } from 'react-native'
import { useRouter } from 'solito/router'

export function CreatePostScreen() {
    const [postText, setPostText] = React.useState(''); 
    const router = useRouter()
  
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: getInputWidth(),
    },
    });

function getInputWidth(){
    if(Platform.OS === 'web'){
        return ''
    }else {
        return '66%'
    }
}

  const buttonHandler = (event: GestureResponderEvent) => {
    event.preventDefault();

    console.log("Create post clicked")
    router.replace('/home')
  };

  return (
    <View className="flex-1 items-center justify-start p-3">
      <H1>Create A Post</H1>
      <View className="max-w-xl">
        <TextInput
            placeholder="How was your workouttt?"
            value={postText}
            onChangeText={setPostText}
            style={{...styles.input}}
        />
        <Button onPress={buttonHandler} title="Create Post"></Button>
      </View>
    </View>
  )
}
