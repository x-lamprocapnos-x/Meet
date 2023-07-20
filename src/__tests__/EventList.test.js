/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import Event from '../components/Event';

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    })

    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    test('renders correct number of events', () => {
        EventListComponent.rerender(<EventList events={
            [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
        } />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
    });
});