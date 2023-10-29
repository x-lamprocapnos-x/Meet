/* eslint-disable react-hooks/exhaustive-deps */
import CitySearch from './components/CitySearch';
import CityEventsChart from './components/CityEventsChart';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { useState, useEffect } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';



const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all cities'
      ? allEvents
      : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert('You are offline, some events may not be up to date')
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className='App'>
      <div className='alerts-container'>
        {infoAlert ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <div id='event-list'>
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
        />
        <div className='charts-container'>
          <CityEventsChart allLocations={allLocations} events={events} />
          
        </div>
        <EventList events={events} />
      </div>

    </div>
  );
}
 
export default App;
