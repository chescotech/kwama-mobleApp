import {configureStore} from '@reduxjs/toolkit';
import {registerSlice} from './reducers/registrationReducer';

export default configureStore({
  reducer: registerSlice.reducer,
});
