import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user_reducer',
  initialState: {
    customerInfo: {},
  },
  reducers: {
    customerData: (state: { customerInfo: object }, action: { payload: object }) => {
      state.customerInfo = action.payload
    }
  }
})

export const { customerData } = UserSlice.actions

export default UserSlice.reducer