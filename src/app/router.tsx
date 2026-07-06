import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { FriendsPage } from '../pages/FriendsPage';
import { HomePage } from '../pages/HomePage';
import { LeaderboardPage } from '../pages/LeaderboardPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PlayPage } from '../pages/PlayPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';
import { SettingsPage } from '../pages/SettingsPage';

// Router definitions live in one place so future route guards and layouts can be added cleanly.
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/friends', element: <FriendsPage /> },
      { path: '/leaderboard', element: <LeaderboardPage /> },
      { path: '/play', element: <PlayPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
