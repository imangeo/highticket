import confetti from "canvas-confetti";

export function fireConfetti() {
  const count = 120;
  const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

  function shoot(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  shoot(0.25, { spread: 26, startVelocity: 55 });
  shoot(0.2, { spread: 60 });
  shoot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  shoot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  shoot(0.1, { spread: 120, startVelocity: 45 });
}