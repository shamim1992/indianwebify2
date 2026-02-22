import { createSlice } from '@reduxjs/toolkit';
import {
    fetchPortfolios,
    fetchPortfolioById,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
} from '../actions/portfolioActions';

const initialState = {
    portfolios: [],
    currentPortfolio: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        clearCurrentPortfolio: (state) => {
            state.currentPortfolio = null;
        },
        clearPortfolioError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // fetchPortfolios
        builder
            .addCase(fetchPortfolios.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPortfolios.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolios = action.payload.portfolios;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchPortfolios.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // fetchPortfolioById
        builder
            .addCase(fetchPortfolioById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPortfolioById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPortfolio = action.payload;
            })
            .addCase(fetchPortfolioById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // createPortfolio
        builder
            .addCase(createPortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolios.unshift(action.payload);
                state.total += 1;
            })
            .addCase(createPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // updatePortfolio
        builder
            .addCase(updatePortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.portfolios.findIndex(p => p._id === action.payload._id);
                if (idx !== -1) state.portfolios[idx] = action.payload;
                state.currentPortfolio = action.payload;
            })
            .addCase(updatePortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // deletePortfolio
        builder
            .addCase(deletePortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolios = state.portfolios.filter(p => p._id !== action.payload);
                state.total -= 1;
            })
            .addCase(deletePortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentPortfolio, clearPortfolioError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
