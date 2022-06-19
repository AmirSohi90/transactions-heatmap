import { Transaction, Transactions, TransactionType, OntoTransaction } from "./transactionType";
import transactionData from "../../data/transaction-data.json";
import { getNumberOfDaysInTheYear, formatDateToYYYYMMDD } from '../../shared/helperFunctions/formatDates'

const daysOfTheYear = (): Transactions => {
    const numberOfDaysInTheYear = getNumberOfDaysInTheYear()
    const arrayOfNumberOfDaysInTheYear = Array.from(new Array(numberOfDaysInTheYear));

    return arrayOfNumberOfDaysInTheYear.reduce((year, _, index) => {
        const formattedDate = formatDateToYYYYMMDD(index);
        year[formattedDate] = {
            date: formattedDate,
            successfulTotal: 0,
            failedTotal: 0,
            numberOfTransactions: 0,
        };

        return year
    }, {})
}

const formatTransaction = ({
                               transactionType,
                               formattedTransaction,
                               ontoTransaction
                           }: { transactionType: string, formattedTransaction: Transaction, ontoTransaction: OntoTransaction }) => {
    if (transactionType === TransactionType.Success) {
        formattedTransaction.successfulTotal = Number((formattedTransaction.successfulTotal + ontoTransaction.amount).toFixed(2));
        formattedTransaction.numberOfTransactions = formattedTransaction.numberOfTransactions + 1;
    } else if (transactionType === TransactionType.Failed) {
        formattedTransaction.failedTotal = Number((formattedTransaction.failedTotal + ontoTransaction.amount).toFixed(2));
        formattedTransaction.numberOfTransactions = formattedTransaction.numberOfTransactions - 1;
    }
    return formattedTransaction
}

const formattedYearlyTransactions = (): Transactions => {
    const initialTransactions = daysOfTheYear();
    return transactionData.reduce((transactions: Transactions, transaction) => {
            const dateOfTransaction = transactions[transaction.date as keyof Transactions]
            if (dateOfTransaction !== undefined) {
                formatTransaction({
                    transactionType: transaction.transactionType,
                    formattedTransaction: dateOfTransaction,
                    ontoTransaction: transaction
                })
            }
            return transactions;
        },
        initialTransactions)
}

const getHighestYearlyTransaction = (yearlyTransactions: Transactions): { highestSuccessfulTotal: number, highestFailedTotal: number } => {
    const transactionKeys = Object.keys(yearlyTransactions);
    const highestSuccessfulTotal = Math.max(...transactionKeys.map(key => yearlyTransactions[key]).filter(transaction => transaction.numberOfTransactions > 0).map(transaction => transaction.successfulTotal))
    const highestFailedTotal = Math.max(...transactionKeys.map(key => yearlyTransactions[key]).filter(transaction => transaction.numberOfTransactions < 0).map(transaction => transaction.failedTotal))

    return { highestSuccessfulTotal, highestFailedTotal }
}

export const getYearlyTransactions = () => {
    return new Promise<{ data: { transactionsThroughoutTheYear: Transactions, highestSuccessfulTotal: number, highestFailedTotal: number } }>((resolve) => {
        const transactionsThroughoutTheYear = formattedYearlyTransactions();
        const { highestSuccessfulTotal, highestFailedTotal } = getHighestYearlyTransaction(transactionsThroughoutTheYear);

        resolve({
            data: {
                transactionsThroughoutTheYear,
                highestSuccessfulTotal,
                highestFailedTotal
            }
        })
    })
};