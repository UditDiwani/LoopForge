import { Link } from 'react-router-dom';
import { footerLinks } from '../../lib/navigation';

// Footer provides lightweight route-ready navigation for future app areas.
export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#f7f8f3]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone-950">LoopForge</p>
          <p className="mt-1 text-sm text-stone-600">A growing hub for focused browser games.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm text-stone-600">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="transition hover:text-stone-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
