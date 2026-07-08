import { Gamepad2, Play, Settings, Sparkles, Trophy, UserPlus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const sparkles = [
  'left-[8%] top-[18%]',
  'left-[18%] top-[68%]',
  'left-[78%] top-[14%]',
  'left-[86%] top-[62%]',
  'left-[48%] top-[9%]',
  'left-[58%] top-[78%]',
];

// Hero introduces the app hub and points to future-ready routes only.
export function HeroSection({ onPlayRequest }: { onPlayRequest: () => void }) {
  return (
    <section className="relative min-h-[760px] overflow-hidden px-4 pb-16 pt-7 sm:min-h-screen sm:px-6 lg:px-10">
      <div className="cloud cloud-one" aria-hidden="true" />
      <div className="cloud cloud-two" aria-hidden="true" />
      <div className="cloud cloud-three" aria-hidden="true" />

      {sparkles.map((position, index) => (
        <span
          key={position}
          className={`twinkle absolute ${position} size-2 rounded-full bg-[#ffe68a] shadow-[0_0_18px_5px_rgba(255,230,138,0.45)]`}
          style={{ animationDelay: `${index * 0.55}s` }}
          aria-hidden="true"
        />
      ))}

      <div className="mx-auto flex min-h-[700px] w-full max-w-7xl flex-col items-center justify-center sm:min-h-[calc(100vh-56px)]">
        <Link
          to="/"
          className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-[#fff7ca] shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:scale-105 hover:border-[#ffe68a]/80 sm:left-8 sm:top-7"
          aria-label="LoopForge home"
        >
          <Gamepad2 aria-hidden="true" size={18} />
          LoopForge
        </Link>

        <div className="relative grid w-full max-w-5xl grid-cols-2 gap-x-3 gap-y-5 pt-16 sm:grid-cols-[1fr_1.2fr_1fr] sm:items-center sm:gap-6 lg:gap-8">
          <Link
            to="/leaderboard"
            className="game-object star-object order-2 justify-self-center text-[#27133f] sm:order-1 sm:mt-10"
            aria-label="Leaderboard"
          >
            <Trophy aria-hidden="true" size={28} />
            <span>Standings</span>
          </Link>

          <div className="logo-orb order-1 col-span-2 mx-auto flex aspect-square w-[min(78vw,340px)] flex-col items-center justify-center rounded-full border-[6px] border-[#ffe68a] bg-[radial-gradient(circle_at_35%_25%,#ffffff_0%,#ffd8fb_18%,#a778ff_49%,#402778_78%,#241341_100%)] p-8 text-center shadow-[0_0_45px_rgba(255,230,138,0.45),0_24px_70px_rgba(0,0,0,0.42)] sm:order-2 sm:col-span-1">
            <span className="text-sm font-black uppercase tracking-[0.28em] text-[#fff7ca]">enter</span>
            <h1 className="mt-2 text-5xl font-black leading-none text-white drop-shadow-[0_5px_0_rgba(54,23,96,0.7)] sm:text-6xl">
              Loop
              <span className="block text-[#ffe68a]">Forge</span>
            </h1>
            <Sparkles className="mt-4 text-[#fff1a8]" aria-hidden="true" size={34} />
          </div>

          <Link
            to="/login"
            className="game-object hex-object order-3 justify-self-center text-[#fff7fb] sm:mt-16"
          >
            <UserPlus aria-hidden="true" size={27} />
            <span>Login</span>
          </Link>

          <button
            type="button"
            onClick={onPlayRequest}
            className="game-object play-object order-4 col-span-2 mx-auto mt-0 min-h-20 w-full max-w-[360px] text-[#2b1745] sm:col-span-1 sm:col-start-2 sm:mt-1"
          >
            <Play aria-hidden="true" size={34} fill="currentColor" />
            <span>Play</span>
          </button>

          <Link
            to="/friends"
            className="game-object cloud-object order-5 justify-self-end text-[#24315f] sm:col-start-1 sm:row-start-3 sm:-mt-4"
          >
            <Users aria-hidden="true" size={27} />
            <span>Friends</span>
          </Link>

          <Link
            to="/settings"
            className="game-object settings-object order-6 justify-self-start text-[#2b1745] sm:col-start-3 sm:row-start-3 sm:-mt-2"
          >
            <Settings aria-hidden="true" size={27} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
