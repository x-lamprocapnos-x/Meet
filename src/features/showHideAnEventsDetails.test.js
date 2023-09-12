/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    //SCENARIO 1
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('the event page is open', () => {
            AppComponent = render(<App />); 
        });

        when('a user has not clicked on any event', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems =
                    within(EventListDOM).getAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then('all events shall be collapsed', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });

    //SCENARIO 2
    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppComponent;
        given('the event page is open', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList =
                    within(AppDOM).getAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('a user clicks on an event', async () => {
            const button = AppComponent.getAllByText('Show Details')[0];
            await userEvent.click(button);
        });

        then('more details shall be displayed', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });
    });

    //SCENARIO 3
    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppComponent;
        let button;
        given('a user had clicked on an event', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList =
                    within(AppDOM).getAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('the user is done viewing the details and clicks away or back', async () => {
            await userEvent.click(button);
        });

        then('the event details shall collapse', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });


});