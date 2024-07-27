"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "@/redux/store";
import {
  setPassage,
  setInput,
  setStartTime,
  setWPM,
} from "@/redux/typingSlice";

export default function TypingTest() {
  const dispatch = useDispatch<AppDispatch>();
  const { passage, input, startTime, wpm, phrases } = useSelector(
    (state: Rootstate) => state.typing
  );

  useEffect(() => {
    if (input === passage) {
      const endTime = Date.now();
      const minutes = (endTime - (startTime || 0)) / 60000;
      const words = passage.split(" ").length;
      dispatch(setWPM(Math.round(words / minutes)));
    }
  }, [input]);

  function handleStart() {
    dispatch(setStartTime(Date.now()));
    dispatch(
      setPassage(
        phrases.length > 0
          ? phrases[Math.floor(Math.random() * phrases.length)]
          : phrases[0]
      )
    );
  }

  function handleSubmit() {
    dispatch(setStartTime(null));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Type Test</h1>
      <p className="mb-4">{passage}</p>
      <textarea
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        onFocus={handleStart}
        placeholder="Start typing here..."
        className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
      />
      {wpm && (
        <div>
          <h2 className="text-xl font-semibold">Words Per Minute: {wpm}</h2>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Submit Score
          </button>
        </div>
      )}
    </div>
  );
}
