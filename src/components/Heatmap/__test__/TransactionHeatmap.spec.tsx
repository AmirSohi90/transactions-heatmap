import { TransactionHeatmap } from "../index";
import { render, screen } from "@testing-library/react";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([thunk]);


describe('TransactionHeatmap', () => {
    it('should render all the cells for the date range', () => {
        render(<TransactionHeatmap />)
        expect(screen.getByRole('cell')).toHaveLength(3)
    })
})