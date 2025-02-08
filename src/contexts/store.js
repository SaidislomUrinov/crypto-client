import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import cfg from './cfg';
export default configureStore({
    reducer:{
        user,
        cfg
    }
})