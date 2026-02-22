import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, refreshAccessToken } from '../actions/authActions';

const initialState = {
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    loading: false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            state.success = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Login User
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // Refresh Access Token
        builder
            .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
                state.token = payload.token;
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                // Refresh failed — clear auth state, force re-login
                state.user = null;
                state.token = null;
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                }
            });
    },
});

export const { logout, clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;
