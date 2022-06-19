import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getYearlyTransactions } from "./transactionDataApi";
import { Transactions } from "./transactionType";

// TODO might be worth writing tests for the reducer not just the getYearlyTransactions function

export interface TransactionsState {
    transactionsThroughoutTheYear: Transactions | null;
}

const initialState: TransactionsState = {
    transactionsThroughoutTheYear: null,
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
                state.transactionsThroughoutTheYear = action.payload.transactionsThroughoutTheYear;
            })
    },
});

export const selectTransActionsThroughoutTheYear = (state: RootState) => state.transactions.transactionsThroughoutTheYear;

export default transactionData.reducer;
