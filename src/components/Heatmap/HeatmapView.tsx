import React from 'react';
import { Transactions } from "../../features/transaction-data/transactionType";

interface HeatmapViewProps {
    transactions: Transactions | null;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ transactions }) => {
    return (
        <div className="heatmap-cells-wrapper">
            {transactions !== null && Object.keys(transactions).map(transaction => <div role="cell" key={transaction}>Cell</div>)}
        </div>)
};
