import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

interface Activity {
  _id: string;
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  date: string;
  points: number;
}

interface ActivitiesResponse {
  message: string;
  data?: Activity[];
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchData<ActivitiesResponse>('/activities');
      
      // Handle both array and data property responses
      const activityData = Array.isArray(response) ? response : (response.data || []);
      setActivities(activityData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activities');
      setActivities([]);
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
      <h2>Activities</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {activities.length === 0 && !error && (
        <div className="alert alert-info">No activities found</div>
      )}
      
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (mi)</th>
                <th>Calories</th>
                <th>Points</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>
                    <span className="badge bg-info text-dark">
                      {activity.type}
                    </span>
                  </td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance || '-'}</td>
                  <td>{activity.calories}</td>
                  <td>
                    <strong className="text-success">+{activity.points}</strong>
                  </td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
