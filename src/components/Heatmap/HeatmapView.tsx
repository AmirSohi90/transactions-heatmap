import React from 'react';
import { Transactions } from "../../features/transaction-data/transactionType";
import './Heatmap.css'
import dates from "../../shared/constants/dates";

type HeatmapViewProps = {
    transactions: Transactions | null;
}

const Cell: React.FC = () => <div className='cell' role="cell" />

export const HeatmapView: React.FC<HeatmapViewProps> = ({ transactions }) => {
    const startDateDay = dates.startDate.getDay();
    const extraCells = Array.from(new Array(startDateDay))
    return (
        <div className="cells-wrapper">
            {extraCells.map((_, index) => <Cell key={index} />)}
            {transactions !== null && Object.keys(transactions).map(transaction => <Cell key={transaction}/>)}
        </div>)
};
