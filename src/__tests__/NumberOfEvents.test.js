/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, within } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}}/>); // Render the component before each test
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

describe('<NumberOfEvents /> integration', () => {
    test('render number of events selected by user', async () => {
        const AppComponent = render(<App />);
        const AppDom = AppComponent.container.firstChild;

        const NumberOfEventsDom = AppDom.querySelector('#number-of-events');
        const NumberOfEventsInput =
            within(NumberOfEventsDom).getByRole('textbox');

        await userEvent.type(NumberOfEventsInput, '{backspace}{backspace}10');

        const EventListDOM = AppDom.querySelector('#event-list');
        const allRenderedEventItems =
            within(EventListDOM).queryAllByRole('listitem');
        expect(allRenderedEventItems.length).toEqual(10);
    });



});
