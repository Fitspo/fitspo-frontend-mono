import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from 'app/features/home/screen'
import { LoginScreen } from 'app/features/login/login-screen'
import { SignupScreen } from 'app/features/signup/signup-screen'

export function NativeNavigation() {

  const AuthStack = createNativeStackNavigator();
  function AuthStackScreens() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false, }}/>
        <AuthStack.Screen name="signup" component={SignupScreen} options={{ title: 'Signup', }} />
      </AuthStack.Navigator>
    );
  }

  return (
    AuthStackScreens()
  )
}




  
  

