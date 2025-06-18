import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamPage from './pages/TeamPage';
import SelectPage from './pages/SelectPage';
import Pokeball from './components/Pokeball/Pokeball';

function App() {
  return (
    <Router>
      <Pokeball />
      <Routes>
        <Route path="/" element={<TeamPage />} />
        <Route path="/select" element={<SelectPage />} />
      </Routes>
    </Router>
  );
}

export default App; 