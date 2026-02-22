import { createSlice } from '@reduxjs/toolkit';
import {
    fetchBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    fetchCategories,
} from '../actions/blogActions';

const initialState = {
    blogs: [],
    currentBlog: null,
    categories: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        clearCurrentBlog: (state) => { state.currentBlog = null; },
        clearError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        const pending = (state) => { state.loading = true; state.error = null; };
        const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

        // fetchBlogs
        builder
            .addCase(fetchBlogs.pending, pending)
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.blogs;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchBlogs.rejected, rejected);

        // fetchBlogById
        builder
            .addCase(fetchBlogById.pending, pending)
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBlog = action.payload;
            })
            .addCase(fetchBlogById.rejected, rejected);

        // createBlog
        builder
            .addCase(createBlog.pending, pending)
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.unshift(action.payload);
                state.total += 1;
            })
            .addCase(createBlog.rejected, rejected);

        // updateBlog
        builder
            .addCase(updateBlog.pending, pending)
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.blogs.findIndex(b => b._id === action.payload._id);
                if (idx !== -1) state.blogs[idx] = action.payload;
                state.currentBlog = action.payload;
            })
            .addCase(updateBlog.rejected, rejected);

        // deleteBlog
        builder
            .addCase(deleteBlog.pending, pending)
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter(b => b._id !== action.payload);
                state.total -= 1;
            })
            .addCase(deleteBlog.rejected, rejected);

        // fetchCategories
        builder
            .addCase(fetchCategories.pending, pending)
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, rejected);
    },
});

export const { clearCurrentBlog, clearError } = blogSlice.actions;
export default blogSlice.reducer;
