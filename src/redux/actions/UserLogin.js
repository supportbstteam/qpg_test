import {createAsyncThunk} from '@reduxjs/toolkit';
import client from '../../api/client';

export const userLogin = createAsyncThunk('fetchUser', async data => {
  try {
    const response = await client.post('/login', {
      ...data,
    });
    const result = await response.data;
    return result;
  } catch (error) {
    // console.error('Error:', error);
    throw error;
  }
});
