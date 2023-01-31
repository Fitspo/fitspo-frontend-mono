import { Effort } from "app/features/posts/gqlTypes";
import { Image, View, Text } from "react-native";

export interface AvatarProps {
    profilePic?: string | undefined,
    effort?: Effort | undefined,
    emoji?: string | undefined,
    scale?: number
}
export function Avatar({profilePic, effort, emoji, scale = 1}: AvatarProps) {
    const defaultProfilePic = "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"

    const getProfileImage = ()=> {
        if(profilePic === undefined || profilePic === null || profilePic === ""){
            return defaultProfilePic
        }else {
            return profilePic
        }
    }
    

    function getEffortColor(effort: Effort | undefined | null){
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

    const outerRingStyle = {
        width: 52,
        height: 52,
        borderRadius: 52 / 2,
        borderWidth: 1,
        margin:-4,
        borderColor: 'slate'
    }

    const effortRingStyle = {
        width: 52,
        height: 52,
        borderRadius: 52 / 2,
        borderWidth: 4,
        margin:-4,
        borderColor: getEffortColor(effort)
    }

    const profileImageStyle = {
        width: 42,
        height: 42,
        borderRadius: 42 / 2,
        margin: 4
    }

    // The margin is pretty janky here... Need to revisit and refactor this.
    const emojiStyle = {
        alignBottom: true,
        alignEnd: true,
        marginTop: -15,
        marginStart: 35,
        zIndex: 15
    }

    return (
        <View style={{transform: [{scale: scale}]}}>
            <View className="flex" style={effortRingStyle}>
                <View className="flex" style={outerRingStyle}>
                    <View>
                        <Image 
                            source={{uri:getProfileImage()}}
                            style={profileImageStyle}
                        ></Image>
                    </View>                      
                </View>           
            </View> 
            <Text style={emojiStyle}>{emoji}</Text> 
        </View>
    );
  }