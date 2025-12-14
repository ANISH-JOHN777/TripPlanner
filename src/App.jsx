import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import TripCreator from './pages/TripCreator';
import DayPlanner from './pages/DayPlanner';
import SavedTrips from './pages/SavedTrips';
import Settings from './pages/Settings';
import Bookings from './pages/Bookings';
import HotelFinder from './pages/bookings/HotelFinder';
import Transport from './pages/bookings/Transport';
import Restaurants from './pages/bookings/Restaurants';
import ExpenseSplitter from './pages/bookings/ExpenseSplitter';
import CurrencyConverter from './pages/bookings/CurrencyConverter';
import SmartTools from './pages/SmartTools';
import PackingList from './pages/smart-tools/PackingList';
import SafetyAlerts from './pages/smart-tools/SafetyAlerts';
import EmergencyHelp from './pages/smart-tools/EmergencyHelp';
import AIChatPlanner from './pages/smart-tools/AIChatPlanner';
import TripStoryCreator from './pages/smart-tools/TripStoryCreator';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TripProvider>
          <div className="app">
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Navigate to="/overview" replace />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/trip-creator" element={<TripCreator />} />
                <Route path="/day-planner" element={<DayPlanner />} />
                <Route path="/saved-trips" element={<SavedTrips />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/hotels" element={<HotelFinder />} />
                <Route path="/bookings/transport" element={<Transport />} />
                <Route path="/bookings/restaurants" element={<Restaurants />} />
                <Route path="/bookings/expenses" element={<ExpenseSplitter />} />
                <Route path="/bookings/currency" element={<CurrencyConverter />} />
                <Route path="/smart-tools" element={<SmartTools />} />
                <Route path="/smart-tools/packing" element={<PackingList />} />
                <Route path="/smart-tools/safety" element={<SafetyAlerts />} />
                <Route path="/smart-tools/emergency" element={<EmergencyHelp />} />
                <Route path="/smart-tools/ai-chat" element={<AIChatPlanner />} />
                <Route path="/smart-tools/story" element={<TripStoryCreator />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/overview" replace />} />
              </Routes>
            </main>
          </div>
        </TripProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
