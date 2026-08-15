import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import { getApiUrl } from './utils/api';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation Header */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <strong>🏋️ OctoFit Tracker</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teams" className="nav-link">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/activities" className="nav-link">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/workouts" className="nav-link">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1 bg-light py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-4">
          <div className="container">
            <p className="mb-1">OctoFit Tracker &copy; 2024</p>
            <small className="text-muted">API: {getApiUrl()}</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="display-4 mb-3">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness activities, compete with your team, and reach your goals!
          </p>
          <div className="d-grid gap-2 d-sm-flex">
            <Link to="/activities" className="btn btn-primary btn-lg px-4 gap-3">
              View Activities
            </Link>
            <Link to="/leaderboard" className="btn btn-outline-secondary btn-lg px-4">
              Check Leaderboard
            </Link>
          </div>
        </div>
        <div className="col-lg-6 text-center">
          <div className="display-1">🏆</div>
          <h3 className="mt-3">Get Fit. Compete. Win.</h3>
        </div>
      </div>

      {/* Features */}
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h3>🏃</h3>
              <h5 className="card-title">Track Activities</h5>
              <p className="card-text">
                Log your workouts and watch your points accumulate.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h3>👥</h3>
              <h5 className="card-title">Join Teams</h5>
              <p className="card-text">
                Team up with friends and compete for the top spot.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h3>📊</h3>
              <h5 className="card-title">Personalized Workouts</h5>
              <p className="card-text">
                Get custom workout suggestions tailored to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
