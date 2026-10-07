// High-End Luxury Ambient Audio Engine (Ethereal Glass Marimba / Celestial Chimes)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.hasUnlocked = false;
    this.lastHoverTime = 0;
  }

  getAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    return this.ctx;
  }

  unlock() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (!this.hasUnlocked) {
          this.hasUnlocked = true;
          this.startup();
        }
      }).catch(() => {});
    } else if (ctx.state === 'running' && !this.hasUnlocked) {
      this.hasUnlocked = true;
      this.startup();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (!this.muted) {
      this.unlock();
      this.startup();
    }
    return this.muted;
  }

  // Pure Celestial Glass Pad / Startup Chord (Warm, Luxurious, Ethereal)
  startup() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      // Soft warm Major 9th luxurious ambient chord: F3, C4, E4, G4, A4
      const chord = [174.61, 261.63, 329.63, 392.00, 440.00];

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        // Velvety soft envelope
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.04, start + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 2.3);
      });
    } catch {}
  }

  // Velvety Glass Marimba Chime for Mouse Hover (Whisper quiet, luxurious, elegant)
  hover() {
    if (this.muted) return;
    const nowMs = Date.now();
    if (nowMs - this.lastHoverTime < 110) return; // 110ms elegant spacing
    this.lastHoverTime = nowMs;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft Warm E6 Harmonic Note
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.46);
    } catch {}
  }

  // Delicate Silver Double Chime for Clicks
  chimeClick() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      // Soft high crystal chimes: A6, E7
      [1760.00, 2637.02].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.035, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.75);
      });
    } catch {}
  }

  // Smooth Wind Shimmer on section jump
  shimmer() {
    this.hover();
  }

  // Success Celestial Glow on message submission
  confirm() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      [1046.50, 1318.51, 1567.98, 2093.00].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.04, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 1.25);
      });
    } catch {}
  }

  whoop() { this.hover(); }
  zoop() { this.chimeClick(); }
  click() { this.chimeClick(); }
}

export const sound = new SoundFX();
