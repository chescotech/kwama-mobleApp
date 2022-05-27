import React, { useEffect, useRef } from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './auth.navigator';
import { useStore } from 'react-redux';
// import { HomeNavigator } from './home.navigator';

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

/**
 * Subscribes to redux store events
 *
 * @param effect
 * @param type
 * @param deps
 */

export const AppNavigator = (): React.ReactElement => {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const currentValue = useRef(null);
  const store = useStore();

  const handleChange = () => {
    const state = store.getState();
    const action = state.action;
    let previousValue = currentValue.current;
    currentValue.current = action.type;

    console.log(previousValue);
    console.log(currentValue);
    
    // if (
    //   previousValue !== action.type &&
    //   _castArray(type).includes(action.type)
    // ) {
    //   effect(action);
    // }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(handleChange);
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer theme={navigatorTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};
