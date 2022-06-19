import { getYearlyTransactions } from './transactionDataApi'

jest.mock('../../data/transaction-data.json', () => ([
    {
        "transactionType": "failed",
        "date": "2019-01-01",
        "amount": 10
    }, { "transactionType": "failed", "date": "2019-01-01", "amount": 10 }, {
        "transactionType": "failed",
        "date": "2019-01-01",
        "amount": 10
    }, { "transactionType": "success", "date": "2019-01-01", "amount": 20 },
    {
        "transactionType": "success",
        "date": "2019-01-02",
        "amount": 20
    }, { "transactionType": "success", "date": "2019-01-02", "amount": 20 }, {
        "transactionType": "failed",
        "date": "2019-01-02",
        "amount": 10
    }, { "transactionType": "success", "date": "2019-01-02", "amount": 20 }]));

describe('transactionData reducer', () => {
    it('should return the correct formatted data', () => {
        const data = getYearlyTransactions();
        expect(data).toEqual({
            data: {
                highestFailedAmount: 30,
                highestSuccessfulAmount: 60,
                transActionsThroughoutTheYear: {
                    "2019-01-01": {
                        date: "2019-01-01",
                        failedAmount: 30,
                        numberOfTransactions: -2,
                        successfulAmount: 20,
                    },
                    "2019-01-02": {
                        date: "2019-01-02",
                        failedAmount: 10,
                        numberOfTransactions: 2,
                        successfulAmount: 60,
                    },
                },
            },
        })
    })
})