import { createSlice } from '@reduxjs/toolkit';
import { fetchServices, fetchServiceById, createService, updateService, deleteService } from '../actions/serviceActions';

const initialState = {
    services: [],
    currentService: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        clearCurrentService: (state) => { state.currentService = null; },
        clearError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        const pending = (state) => { state.loading = true; state.error = null; };
        const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

        builder
            .addCase(fetchServices.pending, pending)
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload.services;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchServices.rejected, rejected);

        builder
            .addCase(fetchServiceById.pending, pending)
            .addCase(fetchServiceById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentService = action.payload;
            })
            .addCase(fetchServiceById.rejected, rejected);

        builder
            .addCase(createService.pending, pending)
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false;
                state.services.unshift(action.payload);
                state.total += 1;
            })
            .addCase(createService.rejected, rejected);

        builder
            .addCase(updateService.pending, pending)
            .addCase(updateService.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.services.findIndex(s => s._id === action.payload._id);
                if (idx !== -1) state.services[idx] = action.payload;
                state.currentService = action.payload;
            })
            .addCase(updateService.rejected, rejected);

        builder
            .addCase(deleteService.pending, pending)
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = state.services.filter(s => s._id !== action.payload);
                state.total -= 1;
            })
            .addCase(deleteService.rejected, rejected);
    },
});

export const { clearCurrentService, clearError } = serviceSlice.actions;
export default serviceSlice.reducer;
