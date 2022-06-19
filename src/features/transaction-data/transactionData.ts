import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getYearlyTransactions } from "./transactionDataApi";
import { Transactions } from "./transactionType";

export interface TransactionsState {
    transActionsThroughoutTheYear: Transactions | null;
}

const initialState: TransactionsState = {
    transActionsThroughoutTheYear: null,
};

export const fetchYearlyTransactions = createAsyncThunk(
    'counter/fetchYearlyTransactions',
    async () => {
        const response = await getYearlyTransactions();
        return response.data;
    }
);

export const transactionData = createSlice({
    name: 'transactionData',
    initialState, // TODO write up initial state
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchYearlyTransactions.fulfilled, (state, action) => {
                state.transActionsThroughoutTheYear = action.payload.transactionsThroughoutTheYear;
            })
    },
});

// TODO WILL NEED TO WRITE SELECTORS WHEN THE TIME COMES HERE

export default transactionData.reducer;
