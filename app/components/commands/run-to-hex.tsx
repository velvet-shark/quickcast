"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";

export function RunToHex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    generateOutput(value);
  }

  function generateOutput(value: string) {
    if (!value) {
      setOutput("");
      return;
    }

    try {
      // Clean up the input and verify it's a valid decimal number
      const cleanInput = value.trim();
      if (!/^\d+$/.test(cleanInput)) {
        setOutput("");
        return;
      }

      const hex = BigInt(cleanInput).toString(16);
      setOutput(`0x${hex}`);
    } catch (error) {
      console.error("Error converting to hex:", error);
      setOutput("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Default conversion from decimal to hexadecimal. For other bases, use the CLI command with --base-in flag.
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Decimal</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input value={input} onChange={handleInputChange} placeholder="e.g. 255" />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={input} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Hex</div>
        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute right-2 top-2 z-10">
              <CopyButton text={output} />
            </div>
            <div className="pl-4 py-4 text-sm border-l-2 border-green-500 bg-neutral-50">
              <div
                className="font-mono whitespace-pre overflow-x-auto max-w-full pr-12"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {output || "Hex output will appear here"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
