"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";

export function RunToDec() {
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
      // Clean up the input - remove 0x if present
      const cleanInput = value.trim().toLowerCase().replace(/^0x/, "");
      if (!/^[0-9a-f]+$/.test(cleanInput)) {
        setOutput("");
        return;
      }

      const decimal = BigInt("0x" + cleanInput).toString();
      setOutput(decimal);
    } catch (error) {
      console.error("Error converting to decimal:", error);
      setOutput("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Default conversion from hexadecimal to decimal. For other bases, use the CLI command with --base-in flag.
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Hex</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input value={input} onChange={handleInputChange} placeholder="e.g. ff or 0xff" />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={input} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Decimal</div>
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
                {output || "Decimal output will appear here"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
