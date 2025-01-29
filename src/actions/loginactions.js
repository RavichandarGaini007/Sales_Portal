import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_REQUEST } from '../app/lib/fetchApi';

export const loginUser = createAsyncThunk(
  'user/login',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_REQUEST + 'login', {
        emailid: page.emailid,
        password: page.password,
      });
      const result = await response.data;
      if (result.token) {
        localStorage.setItem('token', JSON.stringify(result.token));
      }
      // else{
      //   return rejectWithValue(result.message);
      // }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
