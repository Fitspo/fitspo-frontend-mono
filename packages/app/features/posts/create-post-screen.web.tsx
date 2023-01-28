import { useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post, Effort, PostCreateInput } from "app/features/posts/gqlTypes"
import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "../login/gqlTypes";
import EmojiPicker from 'emoji-picker-react';
import { CREATE_POST } from "./gql";
import { Avatar } from "app/design/avatar";
import { useCurrentUser } from "app/hooks/useCurrentUser";
// import * as UploadService from '../../helpers/fileUploader';
// import axios from "axios";

export function CreatePostScreen(){
    const emojiButtonRef = useRef(null);
    const lowEffortEmojiPickerRef= useRef(null);
    const mediumEffortEmojiPickerRef= useRef(null);
    const highEffortEmojiPickerRef= useRef(null);
    const textAreaRef = useRef(null);
    const [moreLowEffortEmojis, setMoreLowEffortEmojis] = useState(false);
    const [moreMediumEffortEmojis, setMoreMediumEffortEmojis] = useState(false);
    const [moreHighEffortEmojis, setMoreHighEffortEmojis] = useState(false);
    const [textInputEmoji, setTextInputEmoji] = useState(false);
    const [effort, setEffort] = useState<Effort>();
    const [effortEmoji, setEffortEmoji] = useState("");
    const [mediaPreview, setMediaPreview] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>();
    const [mediaUrl, setMediaUrl] = useState<string>();
    const [message, setMessage] = useState("");
    // const [currentUser, setCurrentUser] = useState({} as User);
    const [createPost, { data, loading, error, reset}] = useMutation<Response>(CREATE_POST);
    const { currentUser } = useCurrentUser();


    // const fetchUser = useCallback(async()=> {
    //     const userVal = await AsyncStorage.getItem('user')
    //     let user = JSON.parse('{}') as User
    //     if(userVal != null){
    //         user =  JSON.parse(userVal) as User
    //     }
    //     setCurrentUser(user);
    // }, [])

    useEffect(() => {
        // fetchUser().catch(console.error)
        console.log("Current Input emoji state is: " + textInputEmoji)
        console.log("Current low effort emoji state is: " + moreLowEffortEmojis)

        const handleClickOutside = (event) => {
            if (emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)) {
                setTextInputEmoji(false)
            }else {
                setTextInputEmoji(true)
            }

            
            if (lowEffortEmojiPickerRef.current && !lowEffortEmojiPickerRef.current.contains(event.target)) {
                setMoreLowEffortEmojis(false)
            }
            if (mediumEffortEmojiPickerRef.current && !mediumEffortEmojiPickerRef.current.contains(event.target)) {
                setMoreMediumEffortEmojis(false)
            }
            if (highEffortEmojiPickerRef.current && !highEffortEmojiPickerRef.current.contains(event.target)) {
                setMoreHighEffortEmojis(false)
            }
          };
          document.addEventListener('click', handleClickOutside, true);
          return () => {
            document.removeEventListener('click', handleClickOutside, true);
          };

    }, []);
  

    async function handleSubmitPost(){
        const newPost = {} as PostCreateInput
        if(effort !== undefined){
            newPost.effort = effort
        }
        newPost.effortEmoji = effortEmoji
        newPost.content = textAreaRef.current.value
        newPost.media = mediaUrl
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

        // If successful response will look like below.  Take the user to home screen.
    
            // "data": {
            //     "createPost": {
            //         "id": "10",
            //         "user": {
            //             "profilePic": "https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg",
            //             "latestEffort": "medium",
            //             "fullName": "Test user",
            //             "id": "1",
            //             "__typename": "User"
            //         },
            //         "createdAt": "2022-12-01T22:36:41.034Z",
            //         "updatedAt": "2022-12-01T22:36:41.034Z",
            //         "message": "boo",
            //         "media": "",
            //         "effort": "low",
            //         "__typename": "Post"
            //     }
            // }
        
    }

    async function handleImageAdded(fileInput){
        const selectedFile = fileInput.files[0];
        setSelectedFile(selectedFile)
        const imageSrc = URL.createObjectURL(selectedFile)
        setMediaPreview(imageSrc)
        console.log("Selected file ObjectURL: " + imageSrc)
        console.log(selectedFile);

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     console.log("Encoded image data: " + reader.result);
        // };
        // reader.readAsDataURL(selectedFile);

        // const reader = new FileReader();
        // reader.onload = function () {
        //     const base64String = reader.result.replace("data:", "")
        //         .replace(/^.+,/, "");
      
        //     imageBase64Stringsep = base64String;
      
        //     // alert(imageBase64Stringsep);
        //     console.log(base64String);
        // }

        // const uploadUrl = await UploadService.getUploadUrl(selectedFile)
        // if(uploadUrl !== null){
        //     setMediaUrl(uploadUrl)
        //     console.log("Setting media url: " + JSON.stringify(uploadUrl))
        // }else {
        //     console.log("Error getting creating a promise url for the image selected")
        // }
        // const fileReader = new FileReader();
        // fileReader.readAsText(selectedFile, "UTF-8");
        // fileReader.onload = e => {
        //     if(e !== null && e.target !== null){
        //         const content = e.target.result;
        //         console.log(content);
        //         setMediaFile(content);
        //     }else {
        //         console.log("Trying to read file data but e or e.target was null")
        //     }
        // };
        // console.log("Added Image File: " + imageFile);
    }

    function handleTextInputEmojiClick(emoji, event){
        if(emoji.emoji !== null){
            setTextInputEmoji(!textInputEmoji)
            console.log("clicked on emoji " + JSON.stringify(emoji.emoji)) 

            if(textAreaRef.current != null){
                textAreaRef.current.value += emoji.emoji
            }
        }
    }


    function handleOnLowEffortClicked(emoji) {
        console.log("Clicked on emoji: " + emoji)
        setEffort(Effort.LOW)
        setEffortEmoji(emoji)
        setMoreLowEffortEmojis(false)
        setMoreMediumEffortEmojis(false)
        setMoreHighEffortEmojis(false)
    }

    function handleOnMediumEffortClicked(emoji) {
        console.log("Clicked on emoji: " + emoji)
        setEffort(Effort.MEDIUM)
        setEffortEmoji(emoji)
        setMoreLowEffortEmojis(false)
        setMoreMediumEffortEmojis(false)
        setMoreHighEffortEmojis(false)
    }

    function handleOnHighEffortClicked(emoji) {
        console.log("Clicked on emoji: " + emoji)
        setEffort(Effort.HIGH)
        setEffortEmoji(emoji)
        setMoreLowEffortEmojis(false)
        setMoreMediumEffortEmojis(false)
        setMoreHighEffortEmojis(false)
    }


    function feedMediaNull(){
        return mediaPreview === null || mediaPreview === ""
    }

    function getUserNameStyleBasedOnEffortEmoji(){
        if(effortEmoji.length > 0){
            return "flex-col justify-between items-center ml-4 mb-4"
        }else {
            return "flex-col justify-between items-center ml-4 mb-4"
        }
    }

    function getProfileIconStyleBasedOnEffort(){
        let effortColor
        switch (effort) {
            case Effort.HIGH:
                effortColor = 'ring-red-500'
                break;
            case Effort.MEDIUM:
                effortColor = 'ring-yellow-500'
                break;
            case Effort.LOW:
                effortColor = 'ring-green-500'
                break;
            default:
                effortColor = 'ring-slate-500'
                break;
        }
        return "rounded-full ring-4 ring-offset-2 " + effortColor
    }

    return (
        <div className="md:flex items-center justify-center p-4 w-full" >
            <div className="md:flex-col z-10 p-4 rounded-lg shadow-md w-full bg-gray-100" style={{width:'50%'}}>
                <div className="flex px-4">
                    <Avatar 
                        profilePic={currentUser?.profilePic}
                        effort={effort}
                        emoji={effortEmoji}
                    ></Avatar>
                    <div className={"flex-col justify-between items-center ml-4 mb-4"}>
                        <p className="font-medium text-black duration-300 transition ease-in-out text-sm">{currentUser?.firstName + " " + currentUser?.lastName}</p>
                    </div>
                </div>
                <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col space-x-4 my-2 h-auto" >
                    <p className="flex items-center font-bold p-2">Level Of Effort:</p> 
                    <div className="flex items-center p-2 bg-green-200 rounded-full border-2">
                        <li className="flex flex-row space-x-1">
                            <button className="hover:bg-green-300" onClick={()=>{handleOnLowEffortClicked("😀")}}>😀</button>      
                            <button className="hover:bg-green-300" onClick={()=>{handleOnLowEffortClicked("🙂")}}>🙂</button>  
                            <button className="hover:bg-green-300" onClick={()=>{handleOnLowEffortClicked("😎")}}>😎</button> 
                            <button className="hover:bg-green-300" onClick={()=>{handleOnLowEffortClicked("🫠")}}>🫠</button>      
                            <button className="hover:bg-green-300" onClick={()=>{setMoreLowEffortEmojis(true)}}>...</button> 
                            {moreLowEffortEmojis && <div ref={lowEffortEmojiPickerRef} id="lowEffortEmojiPicker" className="z-50 dropdown absolute mt-8 ">
                                <EmojiPicker  onEmojiClick={(emoji)=>{handleOnLowEffortClicked(emoji.emoji)}} />
                            </div>}      
                        </li>   
                    </div>
                    <div className="flex items-center p-2 bg-yellow-200 rounded-full border-2">
                        <li className="flex flex-row space-x-1">
                            <button className="hover:bg-yellow-300" onClick={()=>{handleOnMediumEffortClicked("😐")}}>😐</button> 
                            <button className="hover:bg-yellow-300" onClick={()=>{handleOnMediumEffortClicked("😟")}}>😟</button>  
                            <button className="hover:bg-yellow-300" onClick={()=>{handleOnMediumEffortClicked("😵‍💫")}}>😵‍💫</button>           
                            <button className="hover:bg-yellow-300" onClick={()=>{handleOnMediumEffortClicked("😥")}}>😥</button> 
                            <button className="hover:bg-yellow-300" onClick={()=>{setMoreMediumEffortEmojis(true)}}>...</button>   
                            {moreMediumEffortEmojis && <div ref={mediumEffortEmojiPickerRef} id="mediumEffortEmojiPicker" className="z-50 dropdown absolute mt-8 ">
                                <EmojiPicker  onEmojiClick={(emoji)=>{handleOnMediumEffortClicked(emoji.emoji)}} />
                            </div>}    
                        </li>
                    </div>
                    <div className="flex items-center p-2 bg-red-200 rounded-full border-2">
                        <li className="flex flex-row space-x-1">
                            <button className="hover:bg-red-300" onClick={()=>{handleOnHighEffortClicked("😮‍💨")}}>😮‍💨</button>      
                            <button className="hover:bg-red-300" onClick={()=>{handleOnHighEffortClicked("🥴")}}>🥴</button>  
                            <button className="hover:bg-red-300" onClick={()=>{handleOnHighEffortClicked("🥵")}}>🥵</button>      
                            <button className="hover:bg-red-300" onClick={()=>{handleOnHighEffortClicked("🤢")}}>🤢</button> 
                            <button className="hover:bg-red-300" onClick={()=>{setMoreHighEffortEmojis(true)}}>...</button>    
                            {moreHighEffortEmojis && <div ref={highEffortEmojiPickerRef} id="highEffortEmojiPicker" className="z-50 dropdown absolute mt-8 ">
                                <EmojiPicker onEmojiClick={(emoji)=>{handleOnHighEffortClicked(emoji.emoji)}} />
                            </div>}   
                        </li>
                    </div>
                </div>
                {!feedMediaNull()  &&
                <div className="flex bg-white border-r border-t border-l border-gray-200 rounded-lg  h-96 w-full pb-3/4 justify-center" style={{height:500}}>
                    <div className="relative h-full w-fit"> 
                        <img className="relative h-full w-fit object-contain" src={mediaPreview} alt=""/>
                        <button type="button" onClick={()=>{
                            setMediaPreview("")
                            setSelectedFile(null)
                            }}  className="absolute top-0 m-2 w-7 h-7 hover:bg-gray-500 hover:bg-opacity-50 rounded">
                            <svg fill="black" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>}
                <div className="w-full border border-gray-200 rounded-lg bg-white">
                        <div className="px-4 p-2 bg-white rounded-t-lg ">
                            <textarea ref={textAreaRef} id="post" rows={6} className="h-24 w-full resize-none p-4 text-sm text-gray-900 " placeholder="How was your workout?" required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t">
                            <button onClick={()=>{handleSubmitPost()}} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                                Create Post
                            </button>
                            <div className="flex pl-0 space-x-1 sm:pl-2">
                                <button ref={emojiButtonRef} type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {textInputEmoji && <div id="emojiPicker" className="z-50 dropdown absolute mt-8 ">
                                        <EmojiPicker onEmojiClick={(emoji, event)=>{handleTextInputEmojiClick(emoji, event)}} />
                                    </div>}
                                </button>
                                
                                <div >
                                    <label className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Upload image</span>
                                    <input type='file' id="fileInput" className="hidden"  onChange={()=> handleImageAdded(document.getElementById('fileInput'))}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            

        </div>
    )
}
