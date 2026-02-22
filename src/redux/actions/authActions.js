import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../apiUrl'; // adjust import if needed

// Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(`${API_URL}/api/users/login`, credentials, config);

            // Save accessToken to local storage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.accessToken);
            }

            return { token: data.accessToken, user: data.user };
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Register User
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(`${API_URL}/api/users/register`, userData, config);

            // Save token to local storage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Refresh Access Token (uses HTTP-only refresh cookie automatically)
export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/api/users/refresh-token`,
                {},
                { withCredentials: true }
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.accessToken);
            }
            return { token: data.accessToken };
        } catch (error) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

