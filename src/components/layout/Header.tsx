import { Link } from 'react-router-dom';
import { navLinks } from '../../lib/navigation';
import { ButtonLink } from '../ui/ButtonLink';

// Header is intentionally presentational; routing destinations are centralized in lib/navigation.
export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#f7f8f3]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3" aria-label="LoopForge home">
          <span className="grid size-9 place-items-center rounded-md bg-emerald-600 text-sm font-bold text-white">
            LF
          </span>
          <span className="text-base font-semibold text-stone-950">LoopForge</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="transition hover:text-stone-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden px-3 py-2 text-sm font-medium text-stone-700 sm:inline-flex">
            Login
          </Link>
          <ButtonLink to="/register">Register</ButtonLink>
        </div>
      </div>
    </header>
  );
}
