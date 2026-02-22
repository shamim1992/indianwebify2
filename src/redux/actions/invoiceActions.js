import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../apiUrl';

const authHeaders = (token) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

// Fetch stats summary
export const fetchInvoiceStats = createAsyncThunk(
    'invoice/fetchStats',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await fetch(`${API_URL}/api/invoices/stats`, { headers: authHeaders(token) });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.stats;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

// Fetch all invoices
export const fetchInvoices = createAsyncThunk(
    'invoice/fetchAll',
    async ({ page = 1, limit = 15, status = '', search = '' } = {}, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const params = new URLSearchParams({ page, limit });
            if (status) params.append('status', status);
            if (search) params.append('search', search);
            const res = await fetch(`${API_URL}/api/invoices?${params}`, { headers: authHeaders(token) });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

// Fetch single invoice
export const fetchInvoiceById = createAsyncThunk(
    'invoice/fetchById',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await fetch(`${API_URL}/api/invoices/${id}`, { headers: authHeaders(token) });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.invoice;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

// Create invoice
export const createInvoice = createAsyncThunk(
    'invoice/create',
    async (payload, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await fetch(`${API_URL}/api/invoices`, {
                method: 'POST',
                headers: authHeaders(token),
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.invoice;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

// Update invoice
export const updateInvoice = createAsyncThunk(
    'invoice/update',
    async ({ id, ...payload }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await fetch(`${API_URL}/api/invoices/${id}`, {
                method: 'PUT',
                headers: authHeaders(token),
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.invoice;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

// Update invoice status only
export const updateInvoiceStatus = createAsyncThunk(
    'invoice/updateStatus',
    async ({ id, status, paymentMethod = '', paidDate = null }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await fetch(`${API_URL}/api/invoices/${id}/status`, {
                method: 'PATCH',
                headers: authHeaders(token),
                body: JSON.stringify({ status, paymentMethod, paidDate }),
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.invoice;
        } catch (err) { return rejectWithValue(err.message); }
    }
);

// Delete invoice
export const deleteInvoice = createAsyncThunk(
    'invoice/delete',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await fetch(`${API_URL}/api/invoices/${id}`, {
                method: 'DELETE',
                headers: authHeaders(token),
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);
            return id;
        } catch (err) { return rejectWithValue(err.message); }
    }
);
