import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const ArrowForwardIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='arrow-forward-outline'/>
);

export const GoogleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='google'/>
);

export const FacebookIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='facebook'/>
);

export const TwitterIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='twitter'/>
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person' />
);
