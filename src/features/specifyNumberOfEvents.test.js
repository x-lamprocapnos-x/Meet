/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    //SCENARIO 1
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        let AppComponent;
        let eventList;
        given('the event page is open', () => {
            AppComponent = render(<App />);
        });

        when('viewing the page without filter', async () => {
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                eventList = within(AppDOM).getAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        then(/^(\d+) events shall be listed$/, (arg0) => {
            expect(eventList.length).toEqual(32);
        });
    });
    //SCENATIO 2
    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppComponent;
        given('the event page is open', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const eventList = within(AppDOM).getAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('a user selects number on events to be filtered', async () => {
            const button = AppComponent.getByPlaceholderText('Enter a number');

        await userEvent.type(button, '{backspace}{backspace}10');
        });

        then('that specified number of events shall be displayed', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventList = within(AppDOM).getAllByRole('listitem');
            expect(eventList.length).toEqual(10);
        });
    });

});