import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../apiUrl';

// Fetch all blogs (paginated, filterable)
export const fetchBlogs = createAsyncThunk(
    'blog/fetchAll',
    async ({ page = 1, limit = 10, status = '', category = '' } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ page, limit });
            if (status) params.append('status', status);
            if (category) params.append('category', category);
            const res = await fetch(`${API_URL}/api/blogs?${params}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data; // { blogs, total, page, pages }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Fetch single blog
export const fetchBlogById = createAsyncThunk(
    'blog/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.blog;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create blog (multipart/form-data for thumbnail upload)
export const createBlog = createAsyncThunk(
    'blog/create',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.blog;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update blog
export const updateBlog = createAsyncThunk(
    'blog/update',
    async ({ id, formData, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.blog;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
    'blog/delete',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
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

// Fetch all categories (used in blog forms)
export const fetchCategories = createAsyncThunk(
    'blog/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/categories`);
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.categories;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
