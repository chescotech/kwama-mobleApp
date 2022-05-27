import {createSelector} from 'reselect';

export const auth = (state: { auth: any; }) => state.auth;
export const authSelector = createSelector(
  auth,
  data => data.toJS(),
);

export const isLoginSelector = createSelector(
  auth,
  data => data.get('isLogin'),
);

/**
 * Get user id
 */
export const userIdSelector = createSelector(
  auth,
  data => data.getIn(['user', 'ID']),
);
  