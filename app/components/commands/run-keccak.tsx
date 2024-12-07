"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";
import { keccak256, toUtf8Bytes } from "ethers";

export function RunKeccak() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  function handleInputChange(value: string) {
    setInput(value);
    if (!value) {
      setHash("");
      return;
    }

    try {
      // If input starts with 0x, treat as hex
      if (value.startsWith("0x")) {
        // Validate hex string
        if (!/^0x[0-9a-fA-F]*$/.test(value)) {
          setHash("");
          return;
        }
        setHash(keccak256(value));
      } else {
        // Treat as UTF-8 string
        setHash(keccak256(toUtf8Bytes(value)));
      }
    } catch {
      setHash("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-16 text-sm font-medium">Input</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter text or hex value (with 0x prefix)"
            />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={input} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-16 text-sm font-medium">Hash</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input value={hash} readOnly placeholder="Keccak256 hash" />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={hash} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
