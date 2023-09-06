/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });
    
    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });
});

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).getByRole('textbox');
    
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).getByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).getAllByRole('listitem');   
    
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          event => event.location === 'Berlin, Germany'
        );
    
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
          });
      });

});

