import React from "react";
import dates from "../../shared/constants/dates";
import { useAppSelector } from "../../app/hooks";
import { Cell } from './Cell'
import './Heatmap.css'

import {
    selectHighestFailedTotal,
    selectHighestSuccessfulTotal
} from "../../features/transaction-data/transactionData";

import { Transactions } from "../../features/transaction-data/transactionType";

const getCellColour = ({
                           numberOfTransactions,
                           successfulTotal,
                           highestSuccessfulTotal,
                           failedTotal,
                           highestFailedTotal
                       }: {
    numberOfTransactions: number; successfulTotal: number; highestSuccessfulTotal: number, failedTotal: number;
    highestFailedTotal: number;
}) => {
    if (numberOfTransactions > 0 || (numberOfTransactions === 0 && successfulTotal > failedTotal)) {
        return successfulTotal / highestSuccessfulTotal > 0.5 ? 'dark-green' : 'light-green';
    } else if (numberOfTransactions < 0 || numberOfTransactions === 0 && successfulTotal < failedTotal) {
        return failedTotal / highestFailedTotal > 0.5 ? 'dark-red' : 'light-red';
    }
    return 'neutral';
}


type CellsProps = {
    transactions: Transactions;
}

export const Cells: React.FC<CellsProps> = ({ transactions }) => {
    const startDateDay = dates.startDate.getDay();
    const extraCells = Array.from(new Array(startDateDay));
    const highestSuccessfulTotal = useAppSelector(selectHighestSuccessfulTotal);
    const highestFailedTotal = useAppSelector(selectHighestFailedTotal);

    return (
        <>
            {extraCells.map((_, index) => <Cell key={index}/>)}
            {
                transactions !== null && Object.keys(transactions).map(transactionDate => {
                    const {
                        numberOfTransactions,
                        successfulTotal,
                        failedTotal
                    } = transactions[transactionDate]

                    const backgroundColour = getCellColour({
                        numberOfTransactions,
                        successfulTotal,
                        highestSuccessfulTotal,
                        failedTotal,
                        highestFailedTotal
                    })

                    return (<Cell key={transactionDate} backgroundColour={backgroundColour}/>)
                })
            }
        </>
    )
}