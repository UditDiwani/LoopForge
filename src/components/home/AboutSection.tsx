// About gives visitors context without introducing implementation promises.
export function AboutSection() {
  return (
    <section id="about" className="relative px-4 pb-14 pt-8 sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl gap-5 rounded-[30px] border-4 border-[#7fd5ff]/45 bg-white/10 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-md md:grid-cols-[0.75fr_1.25fr] md:items-center sm:p-7">
        <h2 className="text-2xl font-black text-[#ffe68a] sm:text-3xl">A cozy hub built to grow.</h2>
        <p className="text-base leading-7 text-[#d9dcff]">
          LoopForge keeps the foundation simple while the world expands: games, friends, leaderboards, achievements,
          and multiplayer can join this menu as new playful portals.
        </p>
      </div>
    </section>
  );
}
