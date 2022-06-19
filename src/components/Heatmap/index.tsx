import React, { useEffect } from 'react';
import { HeatmapView } from "./HeatmapView";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchYearlyTransactions,
    selectTransActionsThroughoutTheYear
} from "../../features/transaction-data/transactionData";


export const TransactionHeatmap: React.FC = () => {
    const transactions = useAppSelector(selectTransActionsThroughoutTheYear);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (transactions === null) dispatch(fetchYearlyTransactions())
    }, [transactions])

    return (<HeatmapView transactions={transactions}/>)
};