
interface Note {
  name: string
  octave: number
  semi: boolean
  sound: string
}


const assetsPath = './assets'
export const notes: Note[] = [
  {
    name: 'note-c-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/c3.mp3`
  },
  {
    name: 'note-c#-1',
    octave: 1,
    semi: true,
    sound: `${assetsPath}/c-3.mp3`
  },
  {
    name: 'note-d-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/d3.mp3`
  },
  {
    name: 'note-d#-1',
    octave: 1,
    semi: true,
    sound: `${assetsPath}/d-3.mp3`

  },
  {
    name: 'note-e-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/e3.mp3`
  },
  {
    name: 'note-f-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/f3.mp3`
  },
  {
    name: 'note-f#-1',
    octave: 1,
    semi: true,
    sound: `${assetsPath}/f-3.mp3`
  },
  {
    name: 'note-g-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/g3.mp3`
  },
  {
    name: 'note-g#-1',
    octave: 1,
    semi: true,
    sound: `${assetsPath}/g-3.mp3`
  },
  {
    name: 'note-a-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/a3.mp3`
  },
  {
    name: 'note-a#-1',
    octave: 1,
    semi: true,
    sound: `${assetsPath}/a-4.mp3`
  },
  {
    name: 'note-b-1',
    octave: 1,
    semi: false,
    sound: `${assetsPath}/b3.mp3`
  },
  {
    name: 'note-c-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/c4.mp3`
  },
  {
    name: 'note-c#-2',
    octave: 2,
    semi: true,
    sound: `${assetsPath}/c-4.mp3`
  },
  {
    name: 'note-d-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/d4.mp3`
  },
  {
    name: 'note-d#-2',
    octave: 2,
    semi: true,
    sound: `${assetsPath}/d-4.mp3`

  },
  {
    name: 'note-e-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/e4.mp3`
  },
  {
    name: 'note-f-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/f4.mp3`
  },
  {
    name: 'note-f#-2',
    octave: 2,
    semi: true,
    sound: `${assetsPath}/f-4.mp3`
  },
  {
    name: 'note-g-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/g4.mp3`
  },
  {
    name: 'note-g#-2',
    octave: 2,
    semi: true,
    sound: `${assetsPath}/g-4.mp3`
  },
  {
    name: 'note-a-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/a4.mp3`
  },
  {
    name: 'note-a#-2',
    octave: 2,
    semi: true,
    sound: `${assetsPath}/a-5.mp3`
  },
  {
    name: 'note-b-2',
    octave: 2,
    semi: false,
    sound: `${assetsPath}/b4.mp3`
  },
  {
    name: 'note-c-3',
    octave: 3,
    semi: false,
    sound: `${assetsPath}/c5.mp3`
  },
];
export const whiteKeys = notes.filter(note => !note.semi)
export const blackKeys = notes.filter(note => note.semi)