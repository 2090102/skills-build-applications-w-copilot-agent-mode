import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

interface Workout {
  _id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  duration: number;
  difficulty: string;
  exercises: string[];
}

interface WorkoutsResponse {
  message: string;
  data?: Workout[];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchData<WorkoutsResponse>('/workouts');
      
      // Handle both array and data property responses
      const workoutData = Array.isArray(response) ? response : (response.data || []);
      setWorkouts(workoutData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workouts');
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  }

  function getDifficultyBadgeClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning text-dark';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
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
      <h2>Workouts</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {workouts.length === 0 && !error && (
        <div className="alert alert-info">No workouts found</div>
      )}
      
      {workouts.length > 0 && (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{workout.title}</h5>
                    <span className={`badge ${getDifficultyBadgeClass(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-2">
                    <small>
                      <strong>Type:</strong> {workout.type}
                    </small>
                  </div>
                  <div className="mb-2">
                    <small>
                      <strong>Duration:</strong> {workout.duration} minutes
                    </small>
                  </div>
                  {workout.exercises.length > 0 && (
                    <div className="mb-2">
                      <small>
                        <strong>Exercises:</strong>
                        <div className="mt-1">
                          {workout.exercises.map((exercise, idx) => (
                            <span key={idx} className="badge bg-light text-dark me-1 mb-1">
                              {exercise}
                            </span>
                          ))}
                        </div>
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
