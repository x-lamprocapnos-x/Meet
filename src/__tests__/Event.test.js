/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render } from '@testing-library/react';
import mockData from '../mock-data';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';

const mockEvent = mockData[0];

describe('<Event /> component', () => {
  let eventComponent;

  beforeEach(() => {
    eventComponent = render(<Event event={mockEvent} />);
  });

  test('render event component', () => {
    expect(eventComponent.container).toBeInTheDocument();
  });

  test('displays event name', () => {
    const title = eventComponent.getByText(mockEvent.summary);
    expect(title).toBeInTheDocument();
  });

  test('displays event start time', () => {
    const start = eventComponent.getByText(mockEvent.created);
    expect(start).toBeInTheDocument();
  });

  test('displays event location', () => {
    const location = eventComponent.getByText(mockEvent.location);
    expect(location).toBeInTheDocument();
  });

  test('render show details button', () => {
    const button = eventComponent.getByText(/show details/i);
    expect(button).toBeInTheDocument();
  });

  test('hide details by default', () => {
    const eventDOM = eventComponent.container.firstChild;
    const details = eventDOM.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });

  test('show the details section when the user clicks on "show details" button', async () => {
    const user = userEvent.setup();
    const button = eventComponent.getByText('Show Details');
    await user.click(button);

    const eventDOM = eventComponent.container.firstChild;
    const details = eventDOM.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test ('hides the details section when the user clicks on "hide details" button', async () => {
    const button = eventComponent.getByText('Show Details');
    const eventDOM = eventComponent.container.firstChild;
    await userEvent.click(button);

    const hideButton = eventComponent.getByText('Hide Details');
    await userEvent.click(hideButton);

    const details = eventDOM.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });
  
});