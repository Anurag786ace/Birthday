// Web Audio API Synthesizer for Birthday celebration
let audioCtx = null;
let bdayInterval = null;
let isPlayingSong = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a single music box bell/chime note
function playMusicBoxNote(freq, startTime, duration = 0.8, volume = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Bell-like harmonic
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2.01, startTime); // slight overtone

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
}

// Frequency map for standard notes
const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
};

// Happy Birthday melody notes & durations (in beats)
const BDAY_MELODY = [
  // Happy birthday to you
  { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 1.0 }, { note: 'C4', dur: 1.0 }, { note: 'F4', dur: 1.0 }, { note: 'E4', dur: 2.0 },
  // Happy birthday to you
  { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 1.0 }, { note: 'C4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: 'F4', dur: 2.0 },
  // Happy birthday dear Debalina
  { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'C5', dur: 1.0 }, { note: 'A4', dur: 1.0 }, { note: 'F4', dur: 1.0 }, { note: 'E4', dur: 1.0 }, { note: 'D4', dur: 2.0 },
  // Happy birthday to you
  { note: 'Bb4', dur: 0.75 }, { note: 'Bb4', dur: 0.25 }, { note: 'A4', dur: 1.0 }, { note: 'F4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: 'F4', dur: 2.5 },
];

export function startBdayMusic(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isPlayingSong) return;
  isPlayingSong = true;
  if (onStateChange) onStateChange(true);

  const tempo = 0.45; // seconds per beat

  function scheduleMelody() {
    if (!isPlayingSong) return;
    const now = ctx.currentTime + 0.05;
    let timeOffset = 0;

    BDAY_MELODY.forEach((item) => {
      const noteFreq = NOTES[item.note];
      if (noteFreq) {
        playMusicBoxNote(noteFreq, now + timeOffset, item.dur * tempo * 1.2, 0.16);
        // Add a gentle warm bass root on main beats
        if (item.dur >= 1.0) {
          playMusicBoxNote(noteFreq / 2, now + timeOffset, 1.2, 0.08);
        }
      }
      timeOffset += item.dur * tempo;
    });

    // Schedule next loop
    const totalDuration = timeOffset * 1000 + 1200;
    bdayInterval = setTimeout(() => {
      if (isPlayingSong) {
        scheduleMelody();
      }
    }, totalDuration);
  }

  scheduleMelody();
}

export function stopBdayMusic(onStateChange) {
  isPlayingSong = false;
  if (bdayInterval) {
    clearTimeout(bdayInterval);
    bdayInterval = null;
  }
  if (onStateChange) onStateChange(false);
}

export function toggleBdayMusic(onStateChange) {
  if (isPlayingSong) {
    stopBdayMusic(onStateChange);
  } else {
    startBdayMusic(onStateChange);
  }
}

export function isMusicPlaying() {
  return isPlayingSong;
}

// Realistic Heartbeat Sound (lub-dub)
export function playHeartbeatSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  function createThump(time, freq, decay, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + decay);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(vol, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + decay);
  }

  // Lub
  createThump(now, 75, 0.14, 0.4);
  // Dub
  createThump(now + 0.16, 60, 0.18, 0.3);
}

// Soft Candle Blow Whoosh + Bell
export function playCandleBlowSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.6;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(150, now + 0.5);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.6);

  // Soft sparkle bell
  setTimeout(() => {
    playMusicBoxNote(880, ctx.currentTime, 1.2, 0.2);
    playMusicBoxNote(1318.5, ctx.currentTime + 0.15, 1.2, 0.18);
  }, 250);
}

// Knife Slicing Cake Sound
export function playCakeSliceSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);

  // Sweet chime upon finish
  setTimeout(() => {
    playCelebrationChime();
  }, 200);
}

// Celebration Confetti Pop + Harp Chime
export function playCelebrationChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

  chord.forEach((freq, idx) => {
    playMusicBoxNote(freq, now + idx * 0.07, 1.0, 0.18);
  });
}

// Interactive button soft sparkle
export function playSparkleSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  playMusicBoxNote(880, now, 0.4, 0.12);
  playMusicBoxNote(1174.66, now + 0.06, 0.4, 0.1);
}

// Subtle quill/fountain pen scratch on paper
export function playPenScratchSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.025);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600 + (Math.random() - 0.5) * 600, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.008, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.025);
  } catch (err) {
    // Ignore any audio context edge cases
  }
}


// Realistic Balloon Pop Sound Effect
export function playBalloonPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.04);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1400, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.04);

    // Soft cheerful chime after pop
    playMusicBoxNote(1046.5, now + 0.015, 0.45, 0.16);
  } catch (err) {
    // Ignore audio context edge cases
  }
}

// ─────────────────────────────────────────────────────────────
// Gentle Lullaby Music Box for Debalina's Kiddo Mode
// ─────────────────────────────────────────────────────────────
let isPlayingLullaby = false;
let lullabyInterval = null;

// Lullaby melody: warm, slow, dreamy
const LULLABY_NOTES = [
  { note: 'G4', dur: 1.2 }, { note: 'E4', dur: 1.2 }, { note: 'C4', dur: 2.0 },
  { note: 'G4', dur: 1.2 }, { note: 'E4', dur: 1.2 }, { note: 'C4', dur: 2.0 },
  { note: 'A4', dur: 1.2 }, { note: 'F4', dur: 1.2 }, { note: 'D4', dur: 2.0 },
  { note: 'G4', dur: 1.0 }, { note: 'F4', dur: 0.8 }, { note: 'E4', dur: 1.0 }, { note: 'D4', dur: 1.0 }, { note: 'C4', dur: 2.5 },
  // Birthday chime variation
  { note: 'C4', dur: 1.0 }, { note: 'E4', dur: 1.0 }, { note: 'G4', dur: 1.2 }, { note: 'E4', dur: 1.2 },
  { note: 'F4', dur: 1.0 }, { note: 'D4', dur: 1.0 }, { note: 'G4', dur: 1.5 },
  { note: 'C5', dur: 1.5 }, { note: 'G4', dur: 1.0 }, { note: 'E4', dur: 1.2 }, { note: 'D4', dur: 1.0 }, { note: 'C4', dur: 3.0 },
];

export function startLullabyMusic(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isPlayingLullaby) return;
  // If birthday melody is playing, pause it for lullaby
  if (isPlayingSong) {
    stopBdayMusic();
  }

  isPlayingLullaby = true;
  if (onStateChange) onStateChange(true);

  const tempo = 0.75; // very slow, soothing beat

  function scheduleLullaby() {
    if (!isPlayingLullaby) return;
    const now = ctx.currentTime + 0.05;
    let timeOffset = 0;

    LULLABY_NOTES.forEach((item) => {
      const freq = NOTES[item.note];
      if (freq) {
        // Soft sine wave music box chime
        playMusicBoxNote(freq, now + timeOffset, item.dur * tempo * 1.5, 0.11);
        // Soft harmonic octave overtone
        if (item.dur >= 1.2) {
          playMusicBoxNote(freq * 0.5, now + timeOffset, 1.8, 0.05);
        }
      }
      timeOffset += item.dur * tempo;
    });

    const totalDuration = timeOffset * 1000 + 1500;
    lullabyInterval = setTimeout(() => {
      if (isPlayingLullaby) {
        scheduleLullaby();
      }
    }, totalDuration);
  }

  scheduleLullaby();
}

export function stopLullabyMusic(onStateChange) {
  isPlayingLullaby = false;
  if (lullabyInterval) {
    clearTimeout(lullabyInterval);
    lullabyInterval = null;
  }
  if (onStateChange) onStateChange(false);
}

export function toggleLullabyMusic(onStateChange) {
  if (isPlayingLullaby) {
    stopLullabyMusic(onStateChange);
  } else {
    startLullabyMusic(onStateChange);
  }
}

export function isLullabyActive() {
  return isPlayingLullaby;
}

// ─────────────────────────────────────────────────────────────
// Sound Effects for New Interactive Features
// ─────────────────────────────────────────────────────────────

// Bottle / Pill Vial Pop Sound for First-Aid Kit
export function playBottlePopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);

  setTimeout(() => {
    playMusicBoxNote(1046.5, ctx.currentTime, 0.4, 0.12);
  }, 70);
}

// Camera Shutter Click for Sticker Booth
export function playCameraClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.35;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1800, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.28, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.06);

  // Soft sparkle flash chime
  setTimeout(() => {
    playMusicBoxNote(1318.5, ctx.currentTime, 0.5, 0.14);
  }, 80);
}

// Badge Flip Chime
export function playBadgeFlipSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  playMusicBoxNote(587.33, now, 0.3, 0.1);
  playMusicBoxNote(880, now + 0.06, 0.35, 0.12);
  playMusicBoxNote(1174.66, now + 0.12, 0.4, 0.14);
}

// Firework Launch Whoosh & Sparkle Explosion (Lightweight & Throttled)
let lastFireworkSoundTime = 0;

export function playFireworkSound() {
  try {
    const nowMs = Date.now();
    if (nowMs - lastFireworkSoundTime < 200) {
      return; // Skip audio node congestion when rapid fireworks burst
    }
    lastFireworkSoundTime = nowMs;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Launch whistle
    const whistle = ctx.createOscillator();
    const whistleGain = ctx.createGain();

    whistle.type = 'sine';
    whistle.frequency.setValueAtTime(350, now);
    whistle.frequency.exponentialRampToValueAtTime(1200, now + 0.32);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    whistle.connect(whistleGain);
    whistleGain.connect(ctx.destination);

    whistle.start(now);
    whistle.stop(now + 0.32);

    // 2. Explosion boom + soft sparkle chime
    setTimeout(() => {
      try {
        if (!ctx || ctx.state === 'closed') return;
        const burstNow = ctx.currentTime;
        const boomOsc = ctx.createOscillator();
        const boomGain = ctx.createGain();

        boomOsc.type = 'triangle';
        boomOsc.frequency.setValueAtTime(150, burstNow);
        boomOsc.frequency.exponentialRampToValueAtTime(45, burstNow + 0.28);

        boomGain.gain.setValueAtTime(0.22, burstNow);
        boomGain.gain.exponentialRampToValueAtTime(0.001, burstNow + 0.3);

        boomOsc.connect(boomGain);
        boomGain.connect(ctx.destination);

        boomOsc.start(burstNow);
        boomOsc.stop(burstNow + 0.3);

        // Soft sparkle tones
        playMusicBoxNote(880, burstNow + 0.04, 0.4, 0.08);
        playMusicBoxNote(1318.5, burstNow + 0.1, 0.5, 0.09);
      } catch (err) {
        // Safe audio fallback
      }
    }, 300);
  } catch (err) {
    // Non-blocking catch
  }
}
