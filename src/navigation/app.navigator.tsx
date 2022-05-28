import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './auth.navigator';
import {useStore} from 'react-redux';
import {startAppListening} from '../redux/listenerMiddleware';
import { userLoggedIn } from '../redux/features/auth/userAuth';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

export const AppNavigator = (): React.ReactElement => {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const store = useStore();
  const state = store.getState();

  useEffect(() => {
    startAppListening({
      actionCreator: userLoggedIn,
      effect: (action, listenerApi) => {
        // whatever logic you want here
        console.log(listenerApi.getState());
        console.log(action);
      },
    });
  }, [state]);

  return (
    <NavigationContainer theme={navigatorTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};
