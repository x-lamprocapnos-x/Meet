import React from 'react';
import { render } from '@testing-library/react';
import { mockData } from '../mock-data';
import Event from '../components/Event';

const mockEvent = mockData;

describe('<Event /> component', () => {
  let eventComponent;

  beforeEach(() => {
    eventComponent = render(<Event event={mockEvent} />);
  });

  test('render event component', () => {
    expect(eventComponent.container).toBeInTheDocument();
  });

  test('render event name', () => {
    const title = eventComponent.getByText(mockEvent.summary);
    expect(title).toBeInTheDocument();
  });

  test('render event start time', () => {
    const start = eventComponent.getByText(mockEvent.created);
    expect(start).toBeInTheDocument();
  });

  test('render event location', () => {
    const location = eventComponent.getByText(mockEvent.location);
    expect(location).toBeInTheDocument();
  });
});