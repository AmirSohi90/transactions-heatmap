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
            successfulAmount: 0,
            failedAmount: 0,
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
        formattedTransaction.successfulAmount = Number((formattedTransaction.successfulAmount + ontoTransaction.amount).toFixed(2));
        formattedTransaction.numberOfTransactions = formattedTransaction.numberOfTransactions + 1;
    } else if (transactionType === TransactionType.Failed) {
        formattedTransaction.failedAmount = Number((formattedTransaction.failedAmount + ontoTransaction.amount).toFixed(2));
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

const getHighestYearlyTransaction = (yearlyTransactions: Transactions): { highestSuccessfulAmount: number, highestFailedAmount: number } => {
    const transactionKeys = Object.keys(yearlyTransactions);
    const highestSuccessfulAmount = Math.max(...transactionKeys.map(key => yearlyTransactions[key]).filter(transaction => transaction.numberOfTransactions > 0).map(transaction => transaction.successfulAmount))
    const highestFailedAmount = Math.max(...transactionKeys.map(key => yearlyTransactions[key]).filter(transaction => transaction.numberOfTransactions < 0).map(transaction => transaction.failedAmount))

    return { highestSuccessfulAmount, highestFailedAmount }
}

export const getYearlyTransactions = () => {
    return new Promise<{ data: { transactionsThroughoutTheYear: Transactions, highestSuccessfulAmount: number, highestFailedAmount: number } }>((resolve) => {
        const transactionsThroughoutTheYear = formattedYearlyTransactions();
        const { highestSuccessfulAmount, highestFailedAmount } = getHighestYearlyTransaction(transactionsThroughoutTheYear);

        resolve({
            data: {
                transactionsThroughoutTheYear,
                highestSuccessfulAmount,
                highestFailedAmount
            }
        })
    })
};