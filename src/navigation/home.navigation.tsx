import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/home';

const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='home' component={Home}/>
    </Stack.Navigator>
  );