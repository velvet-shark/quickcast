"use client";

import { useState } from "react";
import { CopyButton } from "../CopyButton";

export function RunBytes32() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<{ right: string; left: string } | null>(null);

  const convertToBytes32 = (input: string, padRight: boolean) => {
    // Remove 0x prefix if present
    const cleanInput = input.toLowerCase().replace(/^0x/, "");

    // Check if input is a valid hex string
    if (!/^[0-9a-f]+$/.test(cleanInput)) {
      return "Error: Input must be a valid hex string";
    }

    // Check if input is longer than 32 bytes (64 hex characters)
    if (cleanInput.length > 64) {
      return "Error: string >32 bytes";
    }

    // Pad with zeros to 32 bytes (64 characters)
    const padded = padRight ? cleanInput.padEnd(64, "0") : cleanInput.padStart(64, "0");
    return "0x" + padded;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rightPadded = convertToBytes32(input, true);
      const leftPadded = convertToBytes32(input, false);
      setOutputs({ right: rightPadded, left: leftPadded });
    } catch (error) {
      setOutputs({
        right: "Error: Invalid input",
        left: "Error: Invalid input"
      });
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Enter a hex value (with or without 0x prefix):
          </label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono text-sm"
            placeholder="e.g. 1234abc or 0x1234abc"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Convert to bytes32
        </button>
      </form>
      {outputs && (
        <div className="mt-4 space-y-6">
          <div>
            <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Right-padded (same as output of 'cast to-bytes32'):
            </div>
            <div className="relative">
              <div className="font-mono text-sm bg-neutral-100 dark:bg-neutral-900 p-3 pr-12 rounded-md overflow-x-auto">
                {outputs.right}
              </div>
              {!outputs.right.startsWith("Error:") && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CopyButton text={outputs.right} />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Left-padded (not provided by 'cast to-bytes32' but useful):
            </div>
            <div className="relative">
              <div className="font-mono text-sm bg-neutral-100 dark:bg-neutral-900 p-3 pr-12 rounded-md overflow-x-auto">
                {outputs.left}
              </div>
              {!outputs.left.startsWith("Error:") && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CopyButton text={outputs.left} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
