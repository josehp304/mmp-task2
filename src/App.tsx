import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamPage from './pages/TeamPage';
import SelectPage from './pages/SelectPage';
import Pokeball from './components/Pokeball/Pokeball';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Pokeball />
        <Routes>
          <Route path="/" element={<TeamPage />} />
          <Route path="/select" element={<SelectPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App; 