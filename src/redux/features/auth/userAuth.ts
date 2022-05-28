import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  first_name: string;
  last_name: string;
  nrc: string;
  email: string;
  account: number;
  phone: number;
  dob: string;
  photoUri: string;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = {
  first_name: '',
  last_name: '',
  nrc: '',
  account: 0,
  phone: 0,
  email: '',
  dob: '',
  photoUri: '',
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
};

export const userAuthSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    userLoggedIn: (
      state: {
        first_name: string;
        last_name: string;
        nrc: string;
        email: string;
        account: number;
        phone: number;
        dob: string;
        photoUri: string;
        isLoggedIn: boolean;
        accessToken: string;
        refreshToken: string;
      },
      action: PayloadAction<any>,
    ) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.nrc = action.payload.nrc;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.dob = action.payload.dob;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.photoUri = action.payload.photoUri;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const {userLoggedIn} = userAuthSlice.actions;

export default userAuthSlice.reducer;
