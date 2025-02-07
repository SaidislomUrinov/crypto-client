import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
        balance: 0,
        dailyProfit: 0,
        lvl: 0,
        profit: 0,
    },
    reducers: {
        updateUser: (state, { payload }) => {
            return { ...state, ...payload }
        },
        clearUser: (state) => {
            state.payload = '';
            state.email = '';
            state.balance = 0;
            state.dailyProfit = 0;
            state.lvl = 0;
            state.profit = 0;
        },
    }
});
export const { updateUser, clearUser } = user.actions;
export default user.reducer;