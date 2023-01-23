import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../features/home/screen'
import { LoginScreen } from 'app/features/login/login-screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

export function NativeNavigation() {

  const AuthStack = createNativeStackNavigator();
  function AuthStackScreens() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false, }}/>
      </AuthStack.Navigator>
    );
  }

  return (
    AuthStackScreens()
  )
}




  
  

