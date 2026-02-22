import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../apiUrl';

// Fetch all portfolio items (public + admin)
export const fetchPortfolios = createAsyncThunk(
    'portfolio/fetchAll',
    async ({ page = 1, limit = 12, category = '', status = '' } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (category) params.append('category', category);
            if (status) params.append('status', status);
            const res = await fetch(`${API_URL}/api/portfolio?${params}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Fetch single portfolio item
export const fetchPortfolioById = createAsyncThunk(
    'portfolio/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/portfolio/${id}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.portfolio;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create portfolio item (admin)
export const createPortfolio = createAsyncThunk(
    'portfolio/create',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/portfolio`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.portfolio;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update portfolio item (admin)
export const updatePortfolio = createAsyncThunk(
    'portfolio/update',
    async ({ id, formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/portfolio/${id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.portfolio;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete portfolio item (admin)
export const deletePortfolio = createAsyncThunk(
    'portfolio/delete',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/portfolio/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return id;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
