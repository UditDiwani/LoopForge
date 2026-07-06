import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type ButtonLinkProps = {
  children: ReactNode;
  to: string;
  variant?: 'primary' | 'secondary';
};

// Reusable link styled as a command button for route navigation.
export function ButtonLink({ children, to, variant = 'primary' }: ButtonLinkProps) {
  const classes =
    variant === 'primary'
      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
      : 'border border-stone-300 bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-50';

  return (
    <Link
      to={to}
      className={`inline-flex min-h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
