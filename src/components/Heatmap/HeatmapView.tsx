import React from 'react';
import { Transactions } from "../../features/transaction-data/transactionType";
import { Cells } from "./Cells";
import { Days } from './Days';

type HeatmapViewProps = {
    transactions: Transactions | null;
}


export const HeatmapView: React.FC<HeatmapViewProps> = ({ transactions }) => {
    return (
        <div className="heatmap-wrapper">
            <Days/>
            {transactions !== null && <Cells transactions={transactions}/>}
        </div>
    )
};
