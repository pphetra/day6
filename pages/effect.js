import React, { useState, useEffect } from "react";

export default function Effect() {
  const [val, set] = useState("");
  const [phrase, setPhrase] = useState("example phrase");

  const createPhrase = () => {
    setPhrase(val);
    set("");
  };

  useEffect(() => {
    console.log(`typing "${val}"`);
  });

  useEffect(() => {
    console.log(`saved phrase: "${phrase}"`);
  });

  return (
    <div className="flex flex-col w-1/4 gap-8 m-8">
      <label>Favorite phrase:</label>
      <input
        className="border rounded px-4 py-2"
        value={val}
        placeholder={phrase}
        onChange={(e) => set(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white rounded py-2"
        onClick={createPhrase}
      >
        send
      </button>
    </div>
  );
}
