export enum TransactionType {
    Success = "success",
    Failed = 'failed'
}

export type OntoTransaction = {
    transactionType: string;
    date: string;
    amount: number;
}

export type Transaction = {
    date: string;
    successfulTotal: number;
    failedTotal: number;
    numberOfTransactions: number;
}

export type TransactionKey = string;

export type Transactions = {
    [key: TransactionKey]: Transaction;
}