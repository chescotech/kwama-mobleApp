import { createSlice } from '@reduxjs/toolkit'
import {GLOBALTYPES} from '../globalTypes';

export const UserSlice = createSlice({
  name: GLOBALTYPES.USERINFO,
  initialState: {
    customerInfo: {},
  },
  reducers: {
    customerData: (state: { customerInfo: object }, action: { payload: object }) => {
      console.log(action);
      
      state.customerInfo = action.payload
    }
  }
})

export const { customerData } = UserSlice.actions

export default UserSlice.reducer