import { TransactionHeatmap } from "../index";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import dates from '../../../shared/constants/dates'

const mockStore = configureMockStore([thunk]);


describe('TransactionHeatmap', () => {
    beforeEach(() => {
        jest.resetModules();
    })

    it('should render all the cells for the date range', () => {
        dates.startDate = new Date('2017-01-01');

        const store = mockStore({
            transactions: {
                transactionsThroughoutTheYear: { '2017-01-01': {}, '2017-02-01': {}, '2017-03-01': {} },
            }
        });

        render((<Provider store={store}><TransactionHeatmap /></Provider>));
        expect(screen.getAllByRole('cell')).toHaveLength(3)
    })

    it('should render all the cells for the date range if start date is not on a Sunday', () => {
        dates.startDate = new Date('2019-01-01');

        const store = mockStore({
            transactions: {
                transactionsThroughoutTheYear: { '2019-01-01': {}, '2019-02-01': {}, '2019-03-01': {} },
            }
        });

        render((<Provider store={store}><TransactionHeatmap /></Provider>));
        expect(screen.getAllByRole('cell')).toHaveLength(5)
    })
})