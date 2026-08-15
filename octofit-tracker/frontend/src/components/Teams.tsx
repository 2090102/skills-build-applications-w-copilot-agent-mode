import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

interface Team {
  _id: string;
  name: string;
  description: string;
  members: string[];
  totalPoints: number;
}

interface TeamsResponse {
  message: string;
  data?: Team[];
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  async function loadTeams() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchData<TeamsResponse>('/teams');
      
      // Handle both array and data property responses
      const teamData = Array.isArray(response) ? response : (response.data || []);
      setTeams(teamData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load teams');
      setTeams([]);
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
      <h2>Teams</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {teams.length === 0 && !error && (
        <div className="alert alert-info">No teams found</div>
      )}
      
      {teams.length > 0 && (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <div className="mb-2">
                    <span className="badge bg-primary">
                      {team.members.length} members
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong>Total Points:</strong> {team.totalPoints}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
