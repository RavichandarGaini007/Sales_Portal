import { createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
import { API_REQUEST } from '../app/lib/fetchApi';
import { setAccessToken } from '../app/lib/authToken';

export const loginUser = createAsyncThunk(
  'user/login',
  async (page, { rejectWithValue }) => {
    try {
      // const response = await axios.post(API_REQUEST + 'login', {
      //   emailid: page.emailid,
      //   password: page.password,
      //   keepSignIn: page.keepSignIn
      // });
      // const result = await response.data;
      // if (result.token) {
      //   localStorage.setItem('token', result.token);
      // }
      const response = await fetch(API_REQUEST + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // IMPORTANT (refresh cookie)
        body: JSON.stringify({
          emailid: page.emailid,
          password: page.password,
          keepSignIn: page.keepSignIn
        })
      });
      if (!response.ok) {
        const err = await response.json();
        return rejectWithValue(err.message || 'Login failed');
      }

      const result = await response.json();

      // ✅ store access token in memory
      if (result.token) {
        setAccessToken(result.token);
        // setKeepSignIn(page.keepSignIn);
        // setUserId(result.data[0].userid);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
