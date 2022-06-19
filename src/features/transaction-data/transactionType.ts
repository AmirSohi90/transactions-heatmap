export interface Transaction {
    date: string;
    successfulAmount: number;
    failedAmount: number;
    numberOfTransactions: number;
}

export type TransactionKey = string;

export type Transactions = {
    [key: TransactionKey]: Transaction;
}