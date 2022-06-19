import { getYearlyTransactions } from '../transactionDataApi'
import dates from '../../../shared/constants/dates'

jest.mock('../../../data/transaction-data.json', () => ([
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
    it('should return the correct formatted data', async () => {
        dates.startDate = new Date('2019-01-01');
        dates.endDate = new Date('2019-01-03');
        const data = await getYearlyTransactions();
        expect(data).toEqual({
            data: {
                highestFailedAmount: 30,
                highestSuccessfulAmount: 60,
                transactionsThroughoutTheYear: {
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