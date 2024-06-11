"use client";

import React, { useState } from "react";

function add(numbers: string) {
  if (numbers === "") return 0;
  numbers = numbers.replace(/\\n/g, "\n");
  let delimiter = /,|\n/;
  if (numbers.startsWith("//")) {
    const numArray = numbers.split("\n");
    delimiter = /;/;
    numbers = numArray[1];
  }

  const numberArray = numbers.split(delimiter).map(Number);
  const negativeNumbers = numberArray.filter((num: number) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
    );
  }

  return numberArray.reduce((sum: any, num: any) => sum + num, 0);
}

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      setResult(add(input));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-400">
      <h1 className="text-3xl font-bold mb-8">String Calculator</h1>
      <div className="flex space-x-5 mb-3">

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
        className="rounded-md p-2"
      />
      <button onClick={handleCalculate} className="rounded-md p-2 bg-blue-500 text-white">Calculate</button>
      </div>
      {result !== null && <p className="text-lg font-semibold">Sum: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
