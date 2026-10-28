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
