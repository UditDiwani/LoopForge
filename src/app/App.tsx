import { RouterProvider } from 'react-router-dom';
import { router } from './router';

// App wires top-level providers. Keep feature logic out of this file.
export function App() {
  return <RouterProvider router={router} />;
}
