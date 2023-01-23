import { NavigationContainer } from '@react-navigation/native'
import {navigationRef} from '../../navigation/native/NavigationService';
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const screens = {
    login: 'login',
    signup: 'signup',
    home: 'home'
  }

  const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: screens,
    },
};

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onStateChange={state => console.log('New state is', state)}
    >
      {children}
    </NavigationContainer>
  )
}
