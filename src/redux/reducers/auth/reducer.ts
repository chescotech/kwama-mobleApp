import {fromJS} from 'immutable';

import {REHYDRATE} from 'redux-persist/lib/constants';
import * as Actions from './constants';
import {
  shippingAddressInit,
  billingAddressInit,
  errorInit as initError,
} from './config';

const initState = fromJS({
  isLogin: false,
  pending: false,
  pendingMobile: false,
  pendingGoogle: false,
  pendingFacebook: false,
  pendingApple: false,
  user: {},
  token: '',
  shippingAddress: shippingAddressInit,
  billingAddress: billingAddressInit,
  loginError: initError,
  signUpError: initError,
  changeMailError: {
    message: '',
    errors: {},
  },
  changePasswordError: initError,
  forgotPasswordError: initError,
  updateShippingAddressError: initError,
  pendingChangeEmail: false,
  pendingChangePassword: false,
  pendingForgotPassword: false,
  pendingUpdateCustomer: false,
  location: {},
});

export default function authReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.CHANGE_DATA:
      return state.setIn(action.payload.path, action.payload.value);
    case Actions.SIGN_IN_WITH_EMAIL:
      return state.set('pending', true).set('loginError', fromJS(initError));
    case Actions.SIGN_IN_WITH_EMAIL_SUCCESS:
      const currentUserLocation = action.payload.user?.location;
      if (currentUserLocation?.name) {
        state.set(
          'location',
          fromJS({
            latitude: currentUserLocation.lat,
            longitude: currentUserLocation?.lng,
            formatted_address: currentUserLocation?.name,
          }),
        );
      }
      return state
        .set('pending', false)
        .set('user', fromJS(action.payload.user))
        .set('isLogin', true)
        .set('token', fromJS(action.payload.token))
        .set('pendingMobile', false)
        .set('pendingFacebook', false)
        .set('pendingFacebook', false)
        .set('pendingApple', false);
    case Actions.SIGN_IN_WITH_MOBILE:
      return state.set('pendingMobile', true);
    case Actions.SIGN_IN_WITH_MOBILE_ERROR:
      return state.set('pendingMobile', false);
    case Actions.SIGN_IN_WITH_GOOGLE:
      return state.set('pendingGoogle', true);
    case Actions.SIGN_IN_WITH_GOOGLE_ERROR:
    case Actions.SIGN_IN_WITH_GOOGLE_CANCEL:
      return state.set('pendingGoogle', false);
    case Actions.SIGN_IN_WITH_APPLE:
      return state.set('pendingApple', true);
    case Actions.SIGN_IN_WITH_FACEBOOK:
      return state.set('pendingFacebook', true);
    case Actions.SIGN_IN_WITH_FACEBOOK_ERROR:
    case Actions.SIGN_IN_WITH_FACEBOOK_CANCEL:
      return state.set('pendingFacebook', false);
    case Actions.SIGN_IN_WITH_APPLE_ERROR:
    case Actions.SIGN_IN_WITH_APPLE_CANCEL:
      return state.set('pendingApple', false);
    case Actions.SIGN_UP_WITH_EMAIL:
      return state.set('pending', true).set('signUpError', fromJS(initError));
    case Actions.SIGN_UP_WITH_EMAIL_SUCCESS:
      return state.set('pending', false);
    case Actions.SIGN_OUT_SUCCESS:
      const userLocation = state.get('user').toJS().location;
      const locationSelect = state.get('location').toJS();
      if (userLocation) {
        return initState.set(
          'location',
          fromJS({
            latitude: userLocation?.lat,
            longitude: userLocation?.lng,
            formatted_address: userLocation?.name,
          }),
        );
      }

      return initState.set('location', fromJS(locationSelect));

    case Actions.CHANGE_EMAIL:
      return state.set('pendingChangeEmail', true).set('changeMailError', {
        message: '',
        errors: {},
      });
    case Actions.CHANGE_EMAIL_SUCCESS:
      return state.set('pendingChangeEmail', false);
    case Actions.CHANGE_PASSWORD:
      return state
        .set('pendingChangePassword', true)
        .set('changePasswordError', fromJS(initError));
    case Actions.CHANGE_PASSWORD_SUCCESS:
      return state.set('pendingChangePassword', false);
    case Actions.CHANGE_EMAIL_ERROR:
      return state.set('pendingChangePassword', false);

    case Actions.FORGOT_PASSWORD:
      return state
        .set('pendingForgotPassword', true)
        .set('forgotPasswordError', fromJS(initError));

    case Actions.FORGOT_PASSWORD_SUCCESS:
      return state.set('pendingForgotPassword', false);
    case Actions.GET_CUSTOMER_SUCCESS:
      return state
        .set('shippingAddress', fromJS(action.payload.shipping))
        .set('billingAddress', fromJS(action.payload.billing));
    case Actions.UPDATE_CUSTOMER:
      return state.set('pendingUpdateCustomer', true);

    case Actions.UPDATE_CUSTOMER_SUCCESS:
    case Actions.UPDATE_CUSTOMER_ERROR:
      return state.set('pendingUpdateCustomer', false);
    case Actions.UPDATE_USER_SUCCESS:
      const userOld = state.get('user');
      const user = {
        ...userOld.toJS(),
        ...action.payload,
      };
      return state.set('user', fromJS(user));
    case Actions.UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return state.set('shippingAddress', fromJS(action.payload));
    case REHYDRATE:
      if (action.payload && action.payload.auth) {
        // Restore only user and isLogin state
        const {auth} = action.payload;
        return initState.merge(
          fromJS({
            user: auth.get('user'),
            token: auth.get('token'),
            isLogin: auth.get('isLogin'),
            location: auth.get('location'),
            shippingAddress:
              auth.get('shippingAddress') || fromJS(shippingAddressInit),
            billingAddress:
              auth.get('billingAddress') || fromJS(billingAddressInit),
          }),
        );
      } else {
        return state;
      }
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState;
    case Actions.UPDATE_LOCATION_SUCCESS:
      return state.set('location', fromJS(action.payload.payload));
    default:
      return state;
  }
}