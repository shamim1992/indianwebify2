import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../apiUrl';

// Fetch all projects
export const fetchProjects = createAsyncThunk(
    'project/fetchAll',
    async ({ page = 1, limit = 10, status = '', category = '' } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (status) params.append('status', status);
            if (category) params.append('category', category);
            const res = await fetch(`${API_URL}/api/projects?${params}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Fetch a single project
export const fetchProjectById = createAsyncThunk(
    'project/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/projects/${id}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.project;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create a new project
export const createProject = createAsyncThunk(
    'project/create',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/projects`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.project;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update a project
export const updateProject = createAsyncThunk(
    'project/update',
    async ({ id, formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/projects/${id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.project;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete a project
export const deleteProject = createAsyncThunk(
    'project/delete',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/projects/${id}`, {
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
