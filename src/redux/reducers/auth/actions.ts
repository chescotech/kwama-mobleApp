import * as Actions from './constants';

/**
 * Action login
 * @param username
 * @param password
 * @returns {{type: string, username: *, password: *}}
 */
export function signInWithEmail(userInfo: any) {
  return {
    type: Actions.SIGN_IN_WITH_EMAIL,
    userInfo
  };
}
