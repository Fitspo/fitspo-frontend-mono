import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../features/home/screen'
import { LoginScreen } from 'app/features/login/login-screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

export function NativeNavigation() {

  const Stack = createNativeStackNavigator<{
    home: undefined
    'login': undefined
    'user-detail': {
      id: string
    }
  }>()
  
  const AuthStack = createNativeStackNavigator();
  function AuthStackScreen() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false, }}/>
      </AuthStack.Navigator>
    );
  }

  return (

    <Stack.Navigator>
      <>
        <Stack.Screen name="login" component={AuthStackScreen} options={{ headerShown: false, }}/>
      </>
    </Stack.Navigator>
  )
}




  
  

