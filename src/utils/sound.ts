// High-performance synthesized Web Audio micro-haptics (0 external audio dependencies)

let audioCtx: AudioContext | null = null;
const STORAGE_KEY = 'portfolio_audio_haptics_v2';

// Listeners for reactive state updates
type SoundListener = (enabled: boolean) => void;
const listeners = new Set<SoundListener>();

function getStoredSoundState(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    // Enabled by default unless explicitly disabled by user
    return val !== 'false';
  } catch {
    return true;
  }
}

let soundEnabled = getStoredSoundState();

function notifyListeners() {
  listeners.forEach((fn) => fn(soundEnabled));
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignore localStorage restrictions
  }
  notifyListeners();
  if (enabled) {
    playPop();
  }
}

export function toggleSound(): boolean {
  const next = !soundEnabled;
  setSoundEnabled(next);
  return next;
}

export function subscribeSound(callback: SoundListener): () => void {
  listeners.add(callback);
  callback(soundEnabled);
  return () => {
    listeners.delete(callback);
  };
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Global one-time unlock on first user gesture (required by Chrome, Brave, Safari)
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('click', unlockAudio);
  };

  window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
  window.addEventListener('keydown', unlockAudio, { passive: true, once: true });
  window.addEventListener('click', unlockAudio, { passive: true, once: true });
}

/**
 * Clean high-frequency mechanical tick (~1600Hz decaying in 22ms)
 * Audible and tactile on all laptop, desktop, and mobile speakers.
 */
export function playTick(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.022);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.028);
  } catch {
    // safe fallback
  }
}

/**
 * Satisfying acoustic pop (~340Hz dropping to 140Hz in 40ms)
 * Clean tactile feedback for clicks, tab changes, and dock buttons.
 */
export function playPop(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.038);

    gain.gain.setValueAtTime(0.26, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch {
    // safe fallback
  }
}

/**
 * Dual-tone futuristic tactile switch (520Hz & 740Hz)
 * Ideal for switching tabs and toggling card previews.
 */
export function playSwitch(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.setValueAtTime(740, now + 0.035);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // safe fallback
  }
}

/**
 * Melodic 2-tone chime (587Hz -> 880Hz / D5 -> A5)
 * Crystal clear acoustic feedback when copying email.
 */
export function playChime(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Tone 1: 587.33Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.24, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Tone 2: 880Hz (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.07);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.setValueAtTime(0.28, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.33);
  } catch {
    // safe fallback
  }
}

/**
 * Soft dismiss snap (~260Hz down to 90Hz in 25ms)
 */
export function playSnap(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.025);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    // safe fallback
  }
}
