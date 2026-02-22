import { createSlice } from '@reduxjs/toolkit';
import {
    fetchInvoices,
    fetchInvoiceById,
    createInvoice,
    updateInvoice,
    updateInvoiceStatus,
    deleteInvoice,
    fetchInvoiceStats,
} from '../actions/invoiceActions';

const initialState = {
    invoices: [],
    currentInvoice: null,
    stats: null,
    loading: false,
    statsLoading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        clearCurrentInvoice: (state) => { state.currentInvoice = null; },
        clearInvoiceError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        // Stats
        builder
            .addCase(fetchInvoiceStats.pending, (s) => { s.statsLoading = true; })
            .addCase(fetchInvoiceStats.fulfilled, (s, a) => { s.statsLoading = false; s.stats = a.payload; })
            .addCase(fetchInvoiceStats.rejected, (s, a) => { s.statsLoading = false; s.error = a.payload; });

        // Fetch all
        builder
            .addCase(fetchInvoices.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchInvoices.fulfilled, (s, a) => {
                s.loading = false;
                s.invoices = a.payload.invoices;
                s.total = a.payload.total;
                s.page = a.payload.page;
                s.pages = a.payload.pages;
            })
            .addCase(fetchInvoices.rejected, (s, a) => { s.loading = false; s.error = a.payload; });

        // Fetch by ID
        builder
            .addCase(fetchInvoiceById.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchInvoiceById.fulfilled, (s, a) => { s.loading = false; s.currentInvoice = a.payload; })
            .addCase(fetchInvoiceById.rejected, (s, a) => { s.loading = false; s.error = a.payload; });

        // Create
        builder
            .addCase(createInvoice.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(createInvoice.fulfilled, (s, a) => { s.loading = false; s.invoices.unshift(a.payload); s.total += 1; })
            .addCase(createInvoice.rejected, (s, a) => { s.loading = false; s.error = a.payload; });

        // Update
        builder
            .addCase(updateInvoice.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(updateInvoice.fulfilled, (s, a) => {
                s.loading = false;
                const idx = s.invoices.findIndex(i => i._id === a.payload._id);
                if (idx !== -1) s.invoices[idx] = a.payload;
                s.currentInvoice = a.payload;
            })
            .addCase(updateInvoice.rejected, (s, a) => { s.loading = false; s.error = a.payload; });

        // Update status
        builder
            .addCase(updateInvoiceStatus.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(updateInvoiceStatus.fulfilled, (s, a) => {
                s.loading = false;
                const idx = s.invoices.findIndex(i => i._id === a.payload._id);
                if (idx !== -1) s.invoices[idx] = a.payload;
                if (s.currentInvoice?._id === a.payload._id) s.currentInvoice = a.payload;
            })
            .addCase(updateInvoiceStatus.rejected, (s, a) => { s.loading = false; s.error = a.payload; });

        // Delete
        builder
            .addCase(deleteInvoice.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(deleteInvoice.fulfilled, (s, a) => {
                s.loading = false;
                s.invoices = s.invoices.filter(i => i._id !== a.payload);
                s.total -= 1;
            })
            .addCase(deleteInvoice.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
    },
});

export const { clearCurrentInvoice, clearInvoiceError } = invoiceSlice.actions;
export default invoiceSlice.reducer;
