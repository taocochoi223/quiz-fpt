"use client";

// A single AudioContext instance for the whole app
let audioCtx: AudioContext | null = null;
let isSoundEnabled = true;

if (typeof window !== "undefined") {
  const saved = localStorage.getItem("soundEnabled");
  if (saved !== null) {
    isSoundEnabled = saved === "true";
  }
}

export function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("soundEnabled", String(isSoundEnabled));
  }
  return isSoundEnabled;
}

export function getSoundEnabled() {
  return isSoundEnabled;
}

function withAudioContext(callback: (ctx: AudioContext) => void) {
  if (typeof window === "undefined" || !isSoundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (!audioCtx) return;
    const ctx = audioCtx;
    if (ctx.state === "suspended") {
      ctx.resume().then(() => callback(ctx)).catch(() => {});
    } else {
      callback(ctx);
    }
  } catch (e) {
    console.error("Audio playback failed", e);
  }
}

export function playCorrectSound() {
  withAudioContext((ctx) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  });
}

export function playWrongSound() {
  withAudioContext((ctx) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  });
}
