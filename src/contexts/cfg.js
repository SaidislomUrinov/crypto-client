import { createSlice } from "@reduxjs/toolkit";

const cfg = createSlice({
    name: 'cfg',
    initialState: {
        currencies: [],
        minWithdraw: 0,
        maxWithdraw: 0,
        withdrawFees: 0,
        withdrawDays: 0,
        autoWithdraw: false,
        ref1Percent: 0,
        ref2Percent: 0,
        ref3Percent: 0,
        ref1Bonus: 0,
        ref2Bonus: 0,
        ref3Bonus: 0,
        lvlPrice: 0,
        profit: 0
    },
    reducers: {
        updateCurrency: (state, { payload }) => {
            state.currencies = payload
        },
        updateConfigs: (state, { payload }) => {
            return {...state,...payload }
        }
    }
});

export const { updateCurrency, updateConfigs } = cfg.actions;
export default cfg.reducer;