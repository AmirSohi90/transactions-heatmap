import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getYearlyTransactions } from "./transactionDataApi";
import { Transactions } from "./transactionType";

// TODO might be worth writing tests for the reducer not just the getYearlyTransactions function

export interface TransactionsState {
    transactionsThroughoutTheYear: Transactions | null;
    highestSuccessfulTotal: number;
    highestFailedTotal: number;
}

const initialState: TransactionsState = {
    transactionsThroughoutTheYear: null,
    highestSuccessfulTotal: 0,
    highestFailedTotal: 0
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
                state.highestSuccessfulTotal = action.payload.highestSuccessfulTotal;
                state.highestFailedTotal = action.payload.highestFailedTotal;
            })
    },
});

export const selectTransActionsThroughoutTheYear = (state: RootState) => state.transactions.transactionsThroughoutTheYear;
export const selectHighestSuccessfulTotal = (state: RootState) => state.transactions.highestSuccessfulTotal;
export const selectHighestFailedTotal = (state: RootState) => state.transactions.highestFailedTotal;

export default transactionData.reducer;
