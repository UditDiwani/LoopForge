// About gives visitors context without introducing implementation promises.
export function AboutSection() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <h2 className="text-3xl font-semibold text-stone-950 sm:text-4xl">Built as a long-term game hub.</h2>
        <p className="text-base leading-7 text-stone-600">
          LoopForge is starting with a focused frontend foundation: clear routing, reusable sections, and a layout
          system that can grow as games, profiles, leaderboards, and social features are added in future iterations.
        </p>
      </div>
    </section>
  );
}
