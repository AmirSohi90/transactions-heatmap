import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TransactionsState {
    transActionsThroughoutTheYear: null
}

const initialState: TransactionsState = {
    transActionsThroughoutTheYear: null,
};

export const fetchYearlyTransactions = createAsyncThunk(
    'counter/fetchYearlyTransactions',
    async () => {
        // THIS IS WHERE WE GET THE TRANSACTION DATA
    }
);

export const transactionData = createSlice({
    name: 'transactionData',
    initialState, // TODO write up initial state
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchYearlyTransactions.fulfilled, (state, action) => {
                // TODO update state here
            })
    },
});

// TODO WILL NEED TO WRITE SELECTORS WHEN THE TIME COMES HERE

export default transactionData.reducer;
