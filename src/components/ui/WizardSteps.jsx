import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1];
const EXIT_EASE = [0.4, 0, 1, 1];
const RAIL = { type: "spring", stiffness: 520, damping: 40, mass: 0.5 };
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 };

function clampIndex(value, total) {
  if (total < 1) return 0;
  return Math.max(0, Math.min(total - 1, Math.trunc(value)));
}

function useWizard({
  total,
  index,
  defaultIndex = 0,
  onIndexChange,
  onComplete,
}) {
  const [internal, setInternal] = useState(() =>
    clampIndex(defaultIndex, total),
  );
  const current = clampIndex(index ?? internal, total);

  const [seen, setSeen] = useState({ index: current, direction: 1 });
  if (seen.index !== current) {
    setSeen({ index: current, direction: current > seen.index ? 1 : -1 });
  }

  const [furthest, setFurthest] = useState(current);
  if (furthest < current) setFurthest(current);

  const emit = useRef(onIndexChange);
  emit.current = onIndexChange;
  const finish = useRef(onComplete);
  finish.current = onComplete;

  const controlled = index !== undefined;

  const goTo = useCallback(
    (to) => {
      const target = clampIndex(to, total);
      if (target === current) return;
      const direction = target > current ? 1 : -1;
      if (!controlled) setInternal(target);
      emit.current?.(target, direction);
    },
    [controlled, current, total],
  );

  const next = useCallback(() => {
    if (current >= total - 1) {
      finish.current?.();
      return;
    }
    goTo(current + 1);
  }, [current, goTo, total]);

  const back = useCallback(() => goTo(current - 1), [current, goTo]);

  return {
    index: current,
    direction: seen.direction,
    furthest: Math.min(furthest, Math.max(total - 1, 0)),
    total,
    isFirst: current === 0,
    isLast: current === total - 1,
    next,
    back,
    goTo,
  };
}

export default function WizardSteps({
  steps,
  index,
  defaultIndex = 0,
  onIndexChange,
  onComplete,
  complete = false,
  isLoading = false,
  height = 300,
  backLabel = "Retour",
  nextLabel = "Suivant",
  finishLabel = "Terminer",
  completeLabel = "Validé",
  completeHint = "Redirection en cours...",
  className = "",
}) {
  const wizard = useWizard({
    total: steps.length,
    index,
    defaultIndex,
    onIndexChange,
    onComplete,
  });
  const reduced = useReducedMotion();
  const listRef = useRef(null);
  const viewportRef = useRef(null);
  const intent = useRef(null);

  const {
    index: at,
    direction,
    furthest,
    total,
    isFirst,
    isLast,
    next,
    back,
    goTo,
  } = wizard;

  useEffect(() => {
    const move = intent.current;
    intent.current = null;
    if (move === "list") {
      listRef.current?.querySelector('button[data-current="true"]')?.focus();
      return;
    }
    if (move === "panel") viewportRef.current?.focus({ preventScroll: true });
  }, [at]);

  const variants = useMemo(
    () => ({
      enter: (d) => (reduced ? { opacity: 0 } : { opacity: 0, x: d * 22 }),
      center: reduced ? { opacity: 1 } : { opacity: 1, x: 0 },
      exit: (d) =>
        reduced
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              x: d * -22,
              transition: { duration: 0.14, ease: EXIT_EASE },
            },
    }),
    [reduced],
  );

  const panelTransition = reduced ? { duration: 0 } : CROSSFADE;
  const step = steps[at];
  if (!step) return null;

  return (
    <div className={`w-full ${className}`}>
      {/* Labels des étapes */}
      <span
        aria-hidden
        className="mb-2 grid select-none text-[13px] font-black uppercase tracking-widest text-ink"
      >
        {steps.map((s, i) => (
          <motion.span
            key={s.id}
            className="col-start-1 row-start-1 truncate"
            initial={false}
            animate={{ opacity: i === at ? 1 : 0 }}
            transition={reduced ? { duration: 0 } : CROSSFADE}
          >
            {s.label}
          </motion.span>
        ))}
      </span>

      {/* Barre de progression Brutaliste */}
      <ol ref={listRef} className="mb-6 flex list-none items-center gap-2 p-0">
        {steps.map((s, i) => {
          const done = complete || i < at;
          const here = !complete && i === at;

          const tile = (
            <motion.span
              className={`grid size-8 place-items-center rounded-full border-3 border-ink text-[12px] font-black tabular-nums transition-colors duration-150 ${
                done
                  ? "bg-mint text-ink shadow-hard-sm"
                  : here
                    ? "bg-ink text-white shadow-hard-sm"
                    : "bg-white text-ink/30"
              }`}
              initial={false}
              animate={{ scale: here ? 1 : 0.92 }}
              transition={reduced ? { duration: 0 } : RAIL}
            >
              {done ? (
                <svg width="14" height="14" viewBox="0 0 256 256" fill="none">
                  <polyline
                    points="216 72 104 184 48 128"
                    stroke="currentColor"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </motion.span>
          );

          return (
            <li
              key={s.id}
              className="flex flex-1 items-center gap-2 last:flex-none"
            >
              {i <= furthest ? (
                <button
                  type="button"
                  data-current={here ? "true" : undefined}
                  onClick={() => {
                    if (here) return;
                    intent.current = "list";
                    goTo(i);
                  }}
                  className="rounded-full outline-none focus-visible:ring-2 ring-ink"
                >
                  {tile}
                </button>
              ) : (
                <span>{tile}</span>
              )}
              {i < total - 1 && (
                <span className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-cream border-y border-transparent">
                  <motion.span
                    className="absolute inset-0 origin-left bg-ink"
                    initial={false}
                    animate={{ scaleX: complete || i < at ? 1 : 0 }}
                    transition={reduced ? { duration: 0 } : RAIL}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Panneau de contenu de l'étape */}
      <div
        ref={viewportRef}
        style={{ height }}
        className="relative overflow-hidden rounded-2xl border-3 border-ink bg-white shadow-hard outline-none transition-all duration-300"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={complete ? "__complete" : step.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={panelTransition}
            className="absolute inset-0 overflow-y-auto p-5"
          >
            {complete ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <p className="text-xl font-black uppercase text-ink">
                  {completeLabel}
                </p>
                <p className="text-sm font-medium text-ink/70">
                  {completeHint}
                </p>
              </div>
            ) : (
              step.content
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Boutons d'action en bas */}
      <div className="mt-5 flex h-12 items-center gap-3">
        <AnimatePresence initial={false}>
          {!isFirst && !complete && (
            <motion.button
              key="back"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                intent.current = "panel";
                back();
              }}
              className="btn-hard !bg-white !text-ink !px-5 !py-0 h-full"
            >
              {backLabel}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {!complete && (
            <motion.button
              key="advance"
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (!isLast) intent.current = "panel";
                next();
              }}
              className="btn-hard !px-6 !py-0 h-full ml-auto min-w-[120px]"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <span className="col-start-1 row-start-1">
                  {isLast ? finishLabel : nextLabel}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
