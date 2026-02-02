import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ScorePage from './pages/ScorePage';
import AdminPage from './pages/AdminPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:era" element={<QuizPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
