import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingState {
  passage: string;
  input: string;
  startTime: number | null;
  wpm: number | null;
  phrases: string[];
}

const initialState: TypingState = {
  passage: "",
  input: "",
  startTime: null,
  wpm: null,
  phrases: [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
  ],
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setPassage: (state, action: PayloadAction<string>) => {
      state.passage = action.payload;
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setStartTime: (state, action: PayloadAction<number | null>) => {
      state.startTime = action.payload;
    },
    setWPM: (state, action: PayloadAction<number | null>) => {
      state.wpm = action.payload;
    },
    addPhrase: (state, action: PayloadAction<string>) => {
      state.phrases.push(action.payload);
    },
  },
});

export const { setPassage, setInput, setStartTime, setWPM, addPhrase } =
  typingSlice.actions;
export default typingSlice.reducer;
