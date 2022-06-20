import { Transaction, Transactions, TransactionType, OntoTransaction } from "./transactionType";
import transactionData from "../../data/transaction-data.json";
import { getNumberOfDaysInTheYear, formatDateToYYYYMMDD } from '../../shared/helperFunctions/formatDates'

type FormatTransaction = {
    transactionType: string;
    formattedTransaction: Transaction;
    ontoTransaction: OntoTransaction;
}

const getDefaultTransactionData = (): Transactions => {
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

const calculateNewTotal = (transactionTotal: number, ontoTransactionTotal: number): number => Number((transactionTotal + ontoTransactionTotal).toFixed(2));

const formatTransaction = ({
                               transactionType,
                               formattedTransaction,
                               ontoTransaction
                           }: FormatTransaction) => {
    if (transactionType === TransactionType.Success) {
        formattedTransaction.successfulTotal = calculateNewTotal(formattedTransaction.successfulTotal, ontoTransaction.amount)
    } else if (transactionType === TransactionType.Failed) {
        formattedTransaction.failedTotal = calculateNewTotal(formattedTransaction.failedTotal, ontoTransaction.amount)
    }

    formattedTransaction.numberOfTransactions = transactionType === TransactionType.Success ? formattedTransaction.numberOfTransactions + 1 : formattedTransaction.numberOfTransactions - 1
    return formattedTransaction
};

const formattedYearlyTransactions = (): Transactions => {
    const initialTransactions = getDefaultTransactionData();

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
};

const getHighestYearlyTransaction = (yearlyTransactions: Transactions): { highestSuccessfulTotal: number, highestFailedTotal: number } => {
    const arrayOfTransactions = Object.keys(yearlyTransactions).map(key => yearlyTransactions[key]);

    const highestSuccessfulTotal = Math.max(...arrayOfTransactions.filter(transaction => transaction.numberOfTransactions > 0).map(transaction => transaction.successfulTotal))
    const highestFailedTotal = Math.max(...arrayOfTransactions.filter(transaction => transaction.numberOfTransactions < 0).map(transaction => transaction.failedTotal))

    return { highestSuccessfulTotal, highestFailedTotal }
}

export const getYearlyTransactions = () => {
    return new Promise<{ data: { transactionsThroughoutTheYear: Transactions, highestSuccessfulTotal: number, highestFailedTotal: number } }>((resolve) => {
        const transactionsThroughoutTheYear = formattedYearlyTransactions();

        const {
            highestSuccessfulTotal,
            highestFailedTotal
        } = getHighestYearlyTransaction(transactionsThroughoutTheYear);

        resolve({
            data: {
                transactionsThroughoutTheYear,
                highestSuccessfulTotal,
                highestFailedTotal
            }
        })
    })
};