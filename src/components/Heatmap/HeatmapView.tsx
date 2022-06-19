import React from 'react';
import { Transactions } from "../../features/transaction-data/transactionType";
import './Heatmap.css'

type HeatmapViewProps = {
    transactions: Transactions | null;
}

const Cell: React.FC = () => <div className='cell' role="cell" />

export const HeatmapView: React.FC<HeatmapViewProps> = ({ transactions }) => {
    return (
        <div className="heatmap-cells-wrapper">
            {transactions !== null && Object.keys(transactions).map(transaction => <Cell key={transaction}/>)}
        </div>)
};
