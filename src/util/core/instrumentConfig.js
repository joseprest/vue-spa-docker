const pulseOptions = {
  oscillator: {
    type: "pulse"
  },
  envelope: {
    release: 0.07
  }
};
const triangleOptions = {
  oscillator: {
    type: "triangle"
  },
  envelope: {
    release: 0.07
  }
};
const squareOptions = {
  oscillator: {
    type: "square"
  },
  envelope: {
    release: 0.07
  }
};

const pulseSynth = new Tone.PolySynth(6, Tone.Synth, pulseOptions); //polysynth本来就支持[A3,B3,D3]直接传，白弄
const triangleSynth = new Tone.PolySynth(6, Tone.Synth, triangleOptions);
const squareSynth = new Tone.PolySynth(6, Tone.Synth, squareOptions);
// const triangleSynth = new Tone.Synth(triangleOptions);
// const squareSynth = new Tone.Synth(squareOptions);
const noiseSynth = new Tone.NoiseSynth();

// sampler instruments
const musicbox = new Tone.Sampler(
  {
    B3: "B3.[mp3|ogg]",
    E4: "E4.[mp3|ogg]",
    G4: "G4.[mp3|ogg]",
    B4: "B4.[mp3|ogg]",
    "C#5": "Cs5.[mp3|ogg]",
    E5: "E5.[mp3|ogg]",
    G5: "G5.[mp3|ogg]",
    B5: "B5.[mp3|ogg]",
    "C#6": "Cs6.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/mbox/"
  }
);
const piano = new Tone.Sampler(
  {
    C4: "C4.[mp3|ogg]",
    "D#4": "Ds4.[mp3|ogg]",
    "F#4": "Fs4.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    "D#5": "Ds5.[mp3|ogg]",
    "F#5": "Fs5.[mp3|ogg]",
    A5: "A5.[mp3|ogg]",
    C6: "C6.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/piano/"
  }
);
const organ = new Tone.Sampler(
  {
    A2: "A2.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    A5: "A5.[mp3|ogg]",
    C3: "C3.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    C6: "C6.[mp3|ogg]",
    "D#5": "Ds5.[mp3|ogg]",
    "F#5": "Fs5.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/organ/"
  }
);
const harp = new Tone.Sampler(
  {
    A2: "A2.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    A6: "A6.[mp3|ogg]",
    C3: "C3.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    E3: "E3.[mp3|ogg]",
    E5: "E5.[mp3|ogg]",
    G3: "G3.[mp3|ogg]",
    G5: "G5.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/harp/"
  }
);
const guitar = new Tone.Sampler(
  {
    // A2: "A2.[mp3|ogg]",
    // A3: "A3.[mp3|ogg]",
    // C3: "C3.[mp3|ogg]",
    // C4: "C4.[mp3|ogg]",
    D1: "D1.[mp3|ogg]",
    D2: "D2.[mp3|ogg]",
    D3: "D3.[mp3|ogg]",
    D4: "D4.[mp3|ogg]"
  },
  {
    release: 1,
    baseUrl: "/static/audio/guitar-acoustic/"
  }
);
export const instrumentMap = {
  pulse: pulseSynth,
  triangle: triangleSynth,
  square: squareSynth,
  noise: noiseSynth,
  musicbox,
  piano,
  harp,
  guitar,
  organ
};
