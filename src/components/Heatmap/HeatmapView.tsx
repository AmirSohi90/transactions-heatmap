import React from 'react';
import { Transactions } from "../../features/transaction-data/transactionType";
import { Cells } from "./Cells";

type HeatmapViewProps = {
    transactions: Transactions | null;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ transactions }) => {
    return (
        <div className="cells-wrapper">
            {transactions !== null && <Cells transactions={transactions}/>}
        </div>
    )
};
