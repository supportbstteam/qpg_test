import {userLogin} from '../actions/UserLogin';

import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.isLoader = true;
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoader = false;
        state.isError = false;
        state.data = action.payload;
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export default UserSlice.reducer;
