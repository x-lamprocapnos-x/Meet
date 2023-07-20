import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <div id="event-list">
        <CitySearch />
        <EventList />
      </div>
      
    </div>
  );
}

export default App;
