"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPhrase } from "@/redux/typingSlice";

export default function CustomPhrase() {
  const [phrase, setPhrase] = useState<string>("");
  const dispatch = useDispatch();

  function handleAddPhrase() {
    dispatch(addPhrase(phrase));
    setPhrase("");
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Add Your Own Phrase</h2>
      <input
        type="text"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        placeholder="Enter a phrase..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleAddPhrase}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Phrase
      </button>
    </div>
  );
}
