import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

interface LeaderboardEntry {
  _id: string;
  userId: string;
  teamId?: string;
  rank: number;
  totalPoints: number;
  activityCount: number;
}

interface LeaderboardResponse {
  message: string;
  data?: LeaderboardEntry[];
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchData<LeaderboardResponse>('/leaderboard');
      
      // Handle both array and data property responses
      const leaderboardData = Array.isArray(response) ? response : (response.data || []);
      setEntries(leaderboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {entries.length === 0 && !error && (
        <div className="alert alert-info">No leaderboard entries found</div>
      )}
      
      {entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User ID</th>
                <th>Total Points</th>
                <th>Activities</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <strong className="fs-5">
                      {entry.rank === 1 && '🥇'}
                      {entry.rank === 2 && '🥈'}
                      {entry.rank === 3 && '🥉'}
                      {entry.rank > 3 && `#${entry.rank}`}
                    </strong>
                  </td>
                  <td>{entry.userId}</td>
                  <td>
                    <span className="badge bg-success fs-6">
                      {entry.totalPoints} pts
                    </span>
                  </td>
                  <td>{entry.activityCount}</td>
                  <td>{entry.teamId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
