import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/auth/sign-in.component';
import { SignUpScreen } from '../screens/auth/sign-up.component';
import PhotoId from '../layouts/auth/photoId';
import Passwords from '../layouts/auth/passwords';
import Home from '../screens/home/home';


const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='SignIn' component={SignInScreen}/>
      <Stack.Screen name='SignUp' component={SignUpScreen}/>
      <Stack.Screen name='home' component={Home}/>
      <Stack.Screen name='PhotoId' component={PhotoId}/>
      <Stack.Screen name='Password' component={Passwords}/>
    </Stack.Navigator>
  );