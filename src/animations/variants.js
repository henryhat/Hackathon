// ── Page & section transitions ────────────────────────────────────────────────
export const pageTransition = {
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -8 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

export const fadeUp = {
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -8 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

export const fadeIn = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.93 },
  animate:    { opacity: 1, scale: 1    },
  exit:       { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
}

export const slideLeft = {
  initial:    { opacity: 0, x: 40  },
  animate:    { opacity: 1, x: 0   },
  exit:       { opacity: 0, x: -20 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

// ── Stagger containers ────────────────────────────────────────────────────────
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerItemFast = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

// ── Letter-by-letter text animation ──────────────────────────────────────────
export const letterContainer = {
  animate: { transition: { staggerChildren: 0.03 } },
}

export const letterItem = {
  initial: { opacity: 0, y: 20, rotateX: -40 },
  animate: { opacity: 1, y: 0,  rotateX: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}
