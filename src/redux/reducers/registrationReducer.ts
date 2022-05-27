import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    customerInfo: {},
    serverResponse: {},
  },
  reducers: {
    customerData: (state: { customerInfo: object }, action: { payload: object }) => {
      state.customerInfo = action.payload
    }
  }
})

export const { customerData } = registerSlice.actions

export default registerSlice.reducer