import React from 'react';
import { Transactions } from "../../features/transaction-data/transactionType";
import { Cells } from "./Cells";
import { Days } from './Days';
import { Months } from './Months';
import { Loading } from '../Loading'

type HeatmapViewProps = {
    transactions: Transactions | null;
}


export const HeatmapView: React.FC<HeatmapViewProps> = ({ transactions }) => {
    return (
        <>
            {transactions !== null ?
                (
                    <>
                        <Months numberOfDays={Object.keys(transactions).length}/>
                        <div className="heatmap-wrapper">
                            <Days/>
                            <Cells transactions={transactions}/>
                        </div>
                    </>
                ) :
                <Loading/>
            }
        </>
    )
};
