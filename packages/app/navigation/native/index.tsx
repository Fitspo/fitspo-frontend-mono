import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from 'app/features/home/home-screen'
import { LoginScreen } from 'app/features/login/login-screen'
import { SignupScreen } from 'app/features/signup/signup-screen'
import Icon from 'react-native-vector-icons/Ionicons';
import { CreatePostScreen } from 'app/features/posts/create-post-screen';
import { PostDetailScreen } from 'app/features/posts/post-detail-screen';


export function NativeNavigation() {

  const AuthStack = createNativeStackNavigator();
  function AuthStackScreens() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false, }}/>
        <AuthStack.Screen name="signup" component={SignupScreen} options={{ title: 'Signup', }} />
        <AuthStack.Screen name="home" component={HomeTabStackScreen} options={{ headerShown: false, }} />
        <AuthStack.Screen name="post-detail" component={PostDetailScreen} />

      </AuthStack.Navigator>
    );
  }

  const HomeTabStack = createBottomTabNavigator();
  function HomeTabStackScreen() {
    return (
      <HomeTabStack.Navigator>
        <HomeTabStack.Screen name="home" component={HomeScreen} options={{ title: 'Home', tabBarBadge: undefined, 
          tabBarIcon: ({ focused, color, size }) => (<Icon name={focused ? 'home' : 'home-outline'}  size={25}/>) }} />
          <HomeTabStack.Screen name="create-post" component={CreatePostScreen} options={{ title: 'Post',
          tabBarIcon: ({ focused, color, size }) => (<Icon name={focused ? 'add-circle' : 'add-circle-outline'} size={25}/>)}} />
      </HomeTabStack.Navigator>
    );
  }


  return (
    AuthStackScreens()
  )
}




  
  

