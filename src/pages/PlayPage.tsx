import { CalendarDays, Lightbulb, RotateCcw, Sparkles, Timer, Trophy, Undo2, Redo2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GuestBanner } from '../components/auth/AuthFlow';
import {
  AchievementBadge,
  FilterTabs,
  GlassPanel,
  GradientButton,
  PageShell,
  ProgressBar,
  SectionHeader,
  StatCard,
} from '../components/ui/AppPrimitives';
import { GameController } from '../game/GameController';
import { PuzzleLoader } from '../game/PuzzleLoader';
import { EdgeState } from '../game/types';

const difficulties = ['Gentle', 'Classic', 'Tricky', 'Expert'];
const confettiPieces = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 13) % 84)}%`,
  delay: `${(index % 9) * 0.12}s`,
  duration: `${1.8 + (index % 5) * 0.18}s`,
  color: ['#ffe68a', '#ff82c8', '#7fd5ff', '#ffffff'][index % 4],
  rotate: `${(index * 31) % 180}deg`,
}));

export function PlayPage() {
  const [searchParams] = useSearchParams();
  const isGuestMode = searchParams.get('mode') === 'guest';
  const gameController = useMemo(() => new GameController(PuzzleLoader.loadEngineSamplePuzzle()), []);
  const [gameState, setGameState] = useState(() => gameController.getGameState());
  const board = gameState.board;
  const boardSize = board.size;
  const cells = board.getCells();
  const dots = board.getVertices();
  const horizontalEdges = board.getEdges().filter((edge) => edge.orientation === 'horizontal');
  const verticalEdges = board.getEdges().filter((edge) => edge.orientation === 'vertical');
  const clueCells = Object.values(gameState.validationResult.cells).filter((cell) => cell.clue !== null);
  const satisfiedClueCount = clueCells.filter((cell) => cell.status === 'Satisfied').length;
  const clueProgress = clueCells.length > 0 ? Math.round((satisfiedClueCount / clueCells.length) * 100) : 0;
  const markedEdgeCount = board.getEdges().filter((edge) => edge.state !== EdgeState.Empty).length;
  const isPuzzleComplete = gameState.validationResult.completion.isComplete;
  const [isCelebrationDismissed, setIsCelebrationDismissed] = useState(false);

  const handleEdgeClick = (edgeId: string) => {
    setGameState(gameController.toggleEdge(edgeId));
  };

  useEffect(() => {
    if (!isPuzzleComplete) {
      setIsCelebrationDismissed(false);
    }
  }, [isPuzzleComplete]);

  return (
    <PageShell
      eyebrow="Slitherlink room"
      title="Trace the quiet loop."
      description="A polished puzzle table for the first LoopForge game. Everything here is visual placeholder content until the real Slitherlink engine arrives."
      actions={<GradientButton variant="pink">New puzzle</GradientButton>}
    >
      {isGuestMode ? <GuestBanner /> : null}
      {isPuzzleComplete && !isCelebrationDismissed ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#05091f]/72 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="completion-title"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="celebration-confetti absolute top-[-24px] h-4 w-2 rounded-sm"
                style={{
                  left: piece.left,
                  backgroundColor: piece.color,
                  animationDelay: piece.delay,
                  animationDuration: piece.duration,
                  transform: `rotate(${piece.rotate})`,
                }}
              />
            ))}
          </div>
          <div className="relative w-full max-w-lg rounded-[30px] border border-[#ffe68a]/55 bg-[#111a4a] p-8 text-center shadow-[0_0_52px_rgba(255,230,138,0.3)] sm:p-10">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#ffe68a]/18 text-[#ffe68a]">
              <Trophy size={42} />
            </div>
            <h2 id="completion-title" className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Puzzle complete
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-base font-bold leading-7 text-[#cfd6ff]">
              Beautiful loop. Every clue lines up, and the puzzle is solved.
            </p>
            <button
              type="button"
              className="mt-7 rounded-full bg-[#ffe68a] px-7 py-3 text-sm font-black text-[#161139] shadow-[0_0_18px_rgba(255,230,138,0.35)] transition hover:brightness-110"
              onClick={() => setIsCelebrationDismissed(true)}
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
      <div className="grid gap-6 pb-10 xl:grid-cols-[1fr_360px]">
        <GlassPanel glow="gold" className="overflow-hidden">
          <SectionHeader
            eyebrow="Puzzle board"
            title={board.puzzle.name}
            action={<AchievementBadge label={`${clueProgress}% clues`} tone="gold" />}
          />
          <div className="mx-auto aspect-square w-full max-w-[680px] rounded-[30px] border-4 border-[#ffe68a]/50 bg-[#0d1640]/82 p-6 shadow-[inset_0_0_40px_rgba(127,213,255,0.12)]">
            <div className="relative size-full rounded-[24px] bg-white/[0.025]">
              {cells.map((cell) => {
                const [, row, column] = cell.id.split('-').map(Number);

                return (
                  <div
                    key={cell.id}
                    className="pointer-events-none absolute grid place-items-center text-xl font-black text-[#fff7ca] drop-shadow-[0_0_12px_rgba(255,230,138,0.35)] sm:text-2xl"
                    style={{
                      left: `${(column + 0.5) * (100 / boardSize)}%`,
                      top: `${(row + 0.5) * (100 / boardSize)}%`,
                      width: `${100 / boardSize}%`,
                      height: `${100 / boardSize}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {cell.clue !== null ? <span>{cell.clue}</span> : null}
                  </div>
                );
              })}

              {horizontalEdges.map((edge) => {
                const startVertex = board.getVertex(edge.startVertex);
                const row = startVertex?.position.row ?? 0;
                const column = startVertex?.position.column ?? 0;
                const isActive = edge.state === EdgeState.Line;
                const isCrossed = edge.state === EdgeState.Cross;

                return (
                  <button
                    key={edge.id}
                    type="button"
                    aria-label={`Horizontal edge ${row + 1}, ${column + 1}`}
                    onClick={() => handleEdgeClick(edge.id)}
                    className={`absolute h-4 rounded-full transition hover:bg-[#ffe68a] hover:shadow-[0_0_18px_rgba(255,230,138,0.65)] ${
                      isActive
                        ? 'bg-[#ffe68a] shadow-[0_0_14px_rgba(255,230,138,0.42)]'
                        : isCrossed
                          ? 'bg-[#ff82c8]/45'
                          : 'bg-[#7fd5ff]/18'
                    }`}
                    style={{
                      left: `${column * (100 / boardSize)}%`,
                      top: `${row * (100 / boardSize)}%`,
                      width: `${100 / boardSize}%`,
                      transform: 'translateY(-50%) scaleX(0.72)',
                    }}
                  />
                );
              })}

              {verticalEdges.map((edge) => {
                const startVertex = board.getVertex(edge.startVertex);
                const row = startVertex?.position.row ?? 0;
                const column = startVertex?.position.column ?? 0;
                const isActive = edge.state === EdgeState.Line;
                const isCrossed = edge.state === EdgeState.Cross;

                return (
                  <button
                    key={edge.id}
                    type="button"
                    aria-label={`Vertical edge ${row + 1}, ${column + 1}`}
                    onClick={() => handleEdgeClick(edge.id)}
                    className={`absolute w-4 rounded-full transition hover:bg-[#ff82c8] hover:shadow-[0_0_18px_rgba(255,130,200,0.65)] ${
                      isActive
                        ? 'bg-[#ff82c8] shadow-[0_0_14px_rgba(255,130,200,0.42)]'
                        : isCrossed
                          ? 'bg-[#ffe68a]/45'
                          : 'bg-[#7fd5ff]/18'
                    }`}
                    style={{
                      left: `${column * (100 / boardSize)}%`,
                      top: `${row * (100 / boardSize)}%`,
                      height: `${100 / boardSize}%`,
                      transform: 'translateX(-50%) scaleY(0.72)',
                    }}
                  />
                );
              })}

              {dots.map((dot) => {
                const { row, column } = dot.position;

                return (
                  <span
                    key={dot.id}
                    className="absolute z-10 size-3 rounded-full border border-[#fff7ca]/70 bg-[#fff7ca] shadow-[0_0_12px_rgba(255,230,138,0.5)] sm:size-4"
                    style={{
                      left: `${column * (100 / boardSize)}%`,
                      top: `${row * (100 / boardSize)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <GradientButton variant="ghost"><Lightbulb size={18} />Hint</GradientButton>
            <GradientButton variant="ghost"><Undo2 size={18} />Undo</GradientButton>
            <GradientButton variant="ghost"><Redo2 size={18} />Redo</GradientButton>
            <GradientButton variant="gold"><RotateCcw size={18} />Reset</GradientButton>
          </div>
        </GlassPanel>

        <div className="grid gap-6">
          <GlassPanel glow="blue">
            <SectionHeader eyebrow="Difficulty" title="Choose a constellation" />
            <FilterTabs tabs={difficulties} active="Classic" />
            <div className="mt-5 space-y-4">
              <ProgressBar value={clueProgress} label="Clue validation" />
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Timer" value="08:24" detail="Placeholder" icon={Timer} />
                <StatCard label="Edges" value={String(markedEdgeCount)} detail="Engine state" icon={Sparkles} />
              </div>
            </div>
          </GlassPanel>

          <GlassPanel glow="pink">
            <SectionHeader eyebrow="Today" title="Daily challenge" />
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-3xl bg-[#ffe68a]/18 text-[#ffe68a]">
                <CalendarDays size={28} />
              </span>
              <div>
                <h3 className="font-black text-white">Starlace Loop</h3>
                <p className="mt-1 text-sm leading-6 text-[#cfd6ff]">Mock daily puzzle with a gentle 9 minute target.</p>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel glow="gold">
            <SectionHeader eyebrow="Stats" title="Puzzle notes" />
            <div className="space-y-3 text-sm font-bold text-[#d9dcff]">
              <p>Grid: {boardSize} x {boardSize}</p>
              <p>Difficulty: Classic</p>
              <p>Clues satisfied: {satisfiedClueCount} / {clueCells.length}</p>
              <p>Loop check: {gameState.validationResult.loop.message}</p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </PageShell>
  );
}
