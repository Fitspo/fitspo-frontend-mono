import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'
import {navigationRef} from '../../navigation/native/NavigationService';

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  let screens = {
    login: 'login',
    signup: 'signup',
    home: 'home',
    createPost: 'createPost',
    profile: 'profile',
    'user-detail': 'user/:id',
    settings: 'settings'
  }
  return (
      <NavigationContainer
        linking={useMemo(
          () => ({
            prefixes: [Linking.createURL('/')],
            config: {
              initialRouteName: 'login',
              screens: screens,
            },
          }),
          []
        )}
        ref={navigationRef}
        onStateChange={state => console.log('New state is', state)}
      >
        {children}
      </NavigationContainer>
  )
}
