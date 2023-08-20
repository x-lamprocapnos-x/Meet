/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe ('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />); // Render the component before each test
    });

    test('render NumberOfEvents component', () => {
        expect(NumberOfEventsComponent.container).toBeInTheDocument();
    });

    test('has the input textbox', () => {
        const input = NumberOfEventsComponent.getByRole('textbox');
        expect(input).toBeInTheDocument();

    });

    test('updates number of events when user types', async () => {
        const input = NumberOfEventsComponent.getByRole('textbox');
        await userEvent.type(input, '{backspace}{backspace}10');
        expect(input).toHaveValue('10');
    });

});
