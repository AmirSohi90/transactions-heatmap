import { TransactionHeatmap } from "../index";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import dates from '../../../shared/constants/dates'

const mockStore = configureMockStore([thunk]);

const aboveAverageSuccessfulDay = {
    successfulTotal: 251,
    failedTotal: 20,
    numberOfTransactions: 1,
}

const belowAverageSuccessfulDay = {
    successfulTotal: 249,
    failedTotal: 20,
    numberOfTransactions: 1,
}

const aboveAverageFailedDay = {
    failedTotal: 251,
    successfulTotal: 20,

    numberOfTransactions: -1,
}

const belowAverageFailedDay = {
    failedTotal: 249,
    successfulTotal: 20,
    numberOfTransactions: -1,
}


describe('TransactionHeatmap', () => {
    beforeEach(() => {
        dates.startDate = new Date('2017-01-01');
    })

    describe('when it gets all the transactions', () => {
        it('should render all the cells for the date range', () => {
            const store = mockStore({
                transactions: {
                    transactionsThroughoutTheYear: { '2017-01-01': {}, '2017-02-01': {}, '2017-03-01': {} },
                }
            });

            render((<Provider store={store}><TransactionHeatmap/></Provider>));
            expect(screen.getAllByRole('cell')).toHaveLength(3)
        })

        it('should render all the cells for the date range if start date is not on a Sunday', () => {
            dates.startDate = new Date('2019-01-01');

            const store = mockStore({
                transactions: {
                    transactionsThroughoutTheYear: { '2019-01-01': {}, '2019-02-01': {}, '2019-03-01': {} },
                }
            });

            render((<Provider store={store}><TransactionHeatmap/></Provider>));
            expect(screen.getAllByRole('cell')).toHaveLength(5)
        })
    })

    describe('when the date has more successful transactions', () => {
        it('should render a dark green cell if the successful amount is more than half of the highestSuccessfulTotal', () => {
            dates.startDate = new Date('2017-01-01');
            const store = mockStore({
                transactions: {
                    transactionsThroughoutTheYear: {
                        '2017-01-01': aboveAverageSuccessfulDay
                    },
                    highestSuccessfulTotal: 500
                }
            });

            render(<Provider store={store}><TransactionHeatmap/></Provider>)
            expect(screen.getByRole('cell')).toHaveClass('dark-green');
        })

        it('shoulder render a light green cell if the successful amount is less than half of the highestSuccessfulTotal', () => {
            const store = mockStore({
                transactions: {
                    transactionsThroughoutTheYear: {
                        '2017-01-01': belowAverageSuccessfulDay
                    },
                    highestSuccessfulTotal: 500
                }
            });

            render(<Provider store={store}><TransactionHeatmap/></Provider>)
            expect(screen.getByRole('cell')).toHaveClass('light-green');
        })
    })

    describe("when the date has more failed transactions", () => {
        it('should render the light red cell if the failed amount is less than half of the highestFailedTotal', () => {
            const store = mockStore({
                transactions: {
                    transactionsThroughoutTheYear: {
                        '2017-01-01': belowAverageFailedDay
                    },
                    highestFailedTotal: 500
                }
            });

            render(<Provider store={store}><TransactionHeatmap/></Provider>)
            expect(screen.getByRole('cell')).toHaveClass('light-red');
        })

        it('should render the dark red cell if the failed amount is more than half of the highestFailedTotal', () => {
            const store = mockStore({
                transactions: {
                    transactionsThroughoutTheYear: {
                        '2017-01-01': aboveAverageFailedDay
                    },
                    highestFailedTotal: 500
                }
            });

            render(<Provider store={store}><TransactionHeatmap/></Provider>)
            expect(screen.getByRole('cell')).toHaveClass('dark-red');
        })
    })

    describe('when the numberOfTransactions is 0', () => {
        describe("when the successful amount is more than the failed amount", () => {
            it('should render the dark green cell if the successful amount is more than half of highestSuccessfulTotal', () => {
                const store = mockStore({
                    transactions: {
                        transactionsThroughoutTheYear: {
                            '2017-01-01': { ...aboveAverageSuccessfulDay, numberOfTransactions: 0 }
                        },
                        highestSuccessfulTotal: 500
                    }
                });

                render(<Provider store={store}><TransactionHeatmap/></Provider>)
                expect(screen.getByRole('cell')).toHaveClass('dark-green');
            })

            it('should render the light green cell if the successful amount is less than half of highestSuccessfulTotal', () => {
                const store = mockStore({
                    transactions: {
                        transactionsThroughoutTheYear: {
                            '2017-01-01': { ...belowAverageSuccessfulDay, numberOfTransactions: 0 }
                        },
                        highestSuccessfulTotal: 500
                    }
                });

                render(<Provider store={store}><TransactionHeatmap/></Provider>)
                expect(screen.getByRole('cell')).toHaveClass('light-green');
            })
        })

        describe('when the failed amount is more than the succesful amount', () => {
            it('should render the dark red cell if the failed amount is more than half of highestFailedTotal', () => {
                const store = mockStore({
                    transactions: {
                        transactionsThroughoutTheYear: {
                            '2017-01-01': { ...aboveAverageFailedDay, numberOfTransactions: 0 }
                        },
                        highestFailedTotal: 500
                    }
                });

                render(<Provider store={store}><TransactionHeatmap/></Provider>)
                expect(screen.getByRole('cell')).toHaveClass('dark-red');
            })

            it('should render the light red cell the failed amount is less than half of highestFailedTotal', () => {
                const store = mockStore({
                    transactions: {
                        transactionsThroughoutTheYear: {
                            '2017-01-01': { ...belowAverageFailedDay, numberOfTransactions: 0 }
                        },
                        highestFailedTotal: 500
                    }
                });

                render(<Provider store={store}><TransactionHeatmap/></Provider>)
                expect(screen.getByRole('cell')).toHaveClass('light-red');
            })
        })
    })
})