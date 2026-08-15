# OctoFit Tracker - Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Technology Stack

- **React 19** - Modern UI library
- **Vite 8.2** - Lightning-fast build tool
- **Bootstrap 5.3** - CSS framework for styling
- **react-router-dom 7** - Client-side routing
- **TypeScript** - Type-safe development

## Project Structure

```
src/
├── App.tsx              # Main app component with routing
├── main.tsx             # Application entry point
├── App.css              # Application styles
├── index.css            # Global styles
├── components/          # Page components
│   ├── Users.tsx        # Users list view
│   ├── Teams.tsx        # Teams list view
│   ├── Activities.tsx   # Activities list view
│   ├── Leaderboard.tsx  # Leaderboard rankings
│   └── Workouts.tsx     # Workout suggestions
└── utils/
    └── api.ts           # API utilities and fetch helpers
```

## Setup Instructions

### Prerequisites

- Node.js LTS
- npm or yarn
- Backend API running (port 8000)
- MongoDB running (backend dependency)

### Installation

```bash
# Install dependencies
npm install --prefix octofit-tracker/frontend

# Set up environment variables
cp octofit-tracker/frontend/.env.example octofit-tracker/frontend/.env.local
```

### Environment Configuration

The frontend uses Vite environment variables for API URL configuration.

**For GitHub Codespaces:**

1. Find your Codespace name from the URL or GitHub settings (e.g., `scaling-broccoli-xyz123`)
2. Edit `.env.local`:
   ```
   VITE_CODESPACE_NAME=scaling-broccoli-xyz123
   ```
3. The app will use: `https://scaling-broccoli-xyz123-8000.app.github.dev/api`

**For Local Development:**

1. Leave `VITE_CODESPACE_NAME` empty in `.env.local`
2. The app will use: `http://localhost:8000/api`

### Development

```bash
# Start development server on port 5173
npm run dev --prefix octofit-tracker/frontend

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Build for production
npm run build --prefix octofit-tracker/frontend

# Preview production build
npm run preview --prefix octofit-tracker/frontend
```

### Linting

```bash
# Run code quality checks
npm run lint --prefix octofit-tracker/frontend
```

## API Integration

The frontend uses the `api.ts` utility module for all backend communication.

### Available API Functions

```typescript
import { fetchData, postData, putData, deleteData, getApiUrl } from '../utils/api';

// Get API URL (useful for debugging)
const apiUrl = getApiUrl();

// Fetch data
const users = await fetchData('/users');

// Post data
const newUser = await postData('/users', { username: 'john' });

// Update data
const updatedUser = await putData('/users/123', { name: 'John Doe' });

// Delete data
await deleteData('/users/123');
```

### Automatic Response Handling

The API utility handles both response formats:

1. Direct arrays: `[{ ...item }, ...]`
2. Objects with data property: `{ message: '...', data: [...] }`

This ensures compatibility with various API response patterns.

## Components

### Home Page

Welcome screen with features overview and quick action buttons.

### Users

Displays all registered users in a table format with:
- Username
- Full name
- Email
- Join date

### Teams

Shows team information in card format with:
- Team name and description
- Member count
- Total accumulated points

### Activities

Lists all logged activities in a table with:
- Activity type (running, yoga, cycling, etc.)
- Duration in minutes
- Distance (if applicable)
- Calories burned
- Points earned
- Activity date

### Leaderboard

Displays user rankings with:
- Rank (with medals for top 3)
- User ID
- Total points
- Activity count
- Team affiliation

### Workouts

Shows personalized workout suggestions in card format with:
- Workout title and description
- Difficulty level (Easy/Medium/Hard)
- Workout type and duration
- List of exercises

## Features

- ✅ Responsive Bootstrap UI
- ✅ Client-side routing with react-router-dom
- ✅ Dynamic API URL detection (Codespaces/localhost)
- ✅ Loading states and error handling
- ✅ Type-safe TypeScript components
- ✅ Component-level data fetching
- ✅ Production-ready build

## Error Handling

All components include error handling:

- Failed API calls display error messages
- Graceful fallback to empty states
- Loading spinners during data fetching
- Toast-like error alerts

## Styling

The app uses Bootstrap's utility classes combined with custom CSS:

- Navbar with responsive menu
- Card-based layouts
- Table designs with hover effects
- Badge components for labels
- Responsive grid system

## Backend Integration

Ensure the backend is running before starting the frontend:

```bash
# Terminal 1: Start backend
cd octofit-tracker/backend
npm run dev

# Terminal 2: Start frontend
cd octofit-tracker/frontend
npm run dev
```

## Troubleshooting

### API Connection Issues

1. Verify backend is running: `http://localhost:8000/api/health`
2. Check `VITE_CODESPACE_NAME` in `.env.local` matches your Codespace
3. For Codespaces, ensure port 8000 is publicly accessible
4. Check browser console for CORS errors

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Check that TypeScript configuration is correct
- Clear `node_modules` and reinstall if issues persist

## Performance

The app is optimized for performance:

- Vite provides hot module replacement (HMR)
- Code splitting via react-router-dom
- Minimal bundle size (241 KB gzipped)
- Bootstrap CSS is cached (232 KB gzipped)

## Next Steps

- Add user authentication and login
- Implement create/edit/delete functionality
- Add real-time updates with WebSockets
- Enhance UI with animations
- Add PWA capabilities
