# Source Structure

This frontend is organized for medium-to-large React growth while keeping the first iteration presentation-only.

- `app/`: Top-level application wiring such as providers and router configuration.
- `assets/`: Static frontend assets that can be imported by components.
- `components/home/`: Reusable sections that compose the Home landing page.
- `components/layout/`: Shared layout components such as the Header and Footer.
- `components/ui/`: Generic reusable UI primitives that are not tied to one feature.
- `lib/`: Shared constants and utilities that do not render UI.
- `pages/`: Route-level components connected by React Router.
- `styles/`: Global styles and Tailwind CSS entry points.
