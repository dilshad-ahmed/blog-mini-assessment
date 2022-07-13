import { configureStore } from '@reduxjs/toolkit';
import blogSliceReducer from '../features/blog/BlogSlice';
import createBlogSlice from '../features/blog/createBlogSlice';
import likeSliceReducer from '../features/blog/likeSlice';
import loginSliceReducer from '../features/user/loginSlice';

const store = configureStore({
    reducer: {
        blogs: blogSliceReducer,
        login: loginSliceReducer,
        createdBlog: createBlogSlice,
        liked: likeSliceReducer,
    }
})

export default store;