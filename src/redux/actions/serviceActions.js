import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../apiUrl';

export const fetchServices = createAsyncThunk(
    'service/fetchAll',
    async ({ page = 1, limit = 10, status = '', category = '' } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (status) params.append('status', status);
            if (category) params.append('category', category);
            const res = await fetch(`${API_URL}/api/services?${params}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

export const fetchServiceById = createAsyncThunk(
    'service/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/services/${id}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.service;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

export const createService = createAsyncThunk(
    'service/create',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/services`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.service;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

export const updateService = createAsyncThunk(
    'service/update',
    async ({ id, formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/services/${id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.service;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

export const deleteService = createAsyncThunk(
    'service/delete',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/services/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return id;
        } catch (err) { return rejectWithValue(err.message); }
    }
);
