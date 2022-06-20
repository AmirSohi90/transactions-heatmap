import React from "react";
import dates from "../../shared/constants/dates";
import { getBackgroundColour } from "../..//shared/helperFunctions/getBackgroundColour";
import { useAppSelector } from "../../app/hooks";
import { Cell } from './Cell'
import './Heatmap.css'

import {
    selectHighestFailedTotal,
    selectHighestSuccessfulTotal
} from "../../features/transaction-data/transactionData";

import { Transactions } from "../../features/transaction-data/transactionType";


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

                    const backgroundColour = getBackgroundColour({
                        numberOfTransactions,
                        successfulTotal,
                        highestSuccessfulTotal,
                        failedTotal,
                        highestFailedTotal
                    })

                    return <Cell key={transactionDate} backgroundColour={backgroundColour}/>
                })
            }
        </>
    )
}