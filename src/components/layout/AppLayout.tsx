import { Outlet } from 'react-router-dom';

// Shared route shell. Page-level sections decide whether to render their own header/footer.
export function AppLayout() {
  return <Outlet />;
}
