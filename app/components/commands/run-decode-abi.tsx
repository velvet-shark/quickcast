"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";
import { AbiCoder } from "ethers";

type DecodedValue = string | bigint | DecodedValue[];

export function RunAbiDecode() {
  const [signature, setSignature] = useState("");
  const [data, setData] = useState("");
  const [decoded, setDecoded] = useState("");

  function handleSignatureChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSignature(value);
    generateDecoded(value, data);
  }

  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setData(value);
    generateDecoded(signature, value);
  }

  function formatDecodedValue(value: DecodedValue): string {
    if (Array.isArray(value)) {
      return value.map((v) => formatDecodedValue(v)).join("\n");
    }
    if (typeof value === "bigint") {
      // Format large numbers with scientific notation
      const num = Number(value);
      if (num >= 1e15) {
        return `${value} [${num.toExponential(3)}]`;
      }
      return value.toString();
    }
    if (typeof value === "string" && value.startsWith("0x")) {
      // Ensure addresses are properly checksummed
      return value.toLowerCase().replace(/^0x[a-f0-9]{40}$/i, (address) =>
        address.replace(/[a-f0-9]/g, (c, i) => {
          const hash = Array.from(value.slice(2).toLowerCase())
            .map((c) => parseInt(c, 16))
            .reduce((h, v) => (h * 16 + v) % 9973, 0);
          return (hash >> i) & 1 ? c.toUpperCase() : c.toLowerCase();
        })
      );
    }
    return String(value);
  }

  function generateDecoded(signature: string, hexData: string) {
    if (!signature || !hexData || !signature.includes("(")) {
      setDecoded("");
      return;
    }

    try {
      // Clean up the hex data
      const cleanData = hexData.trim().toLowerCase();
      if (!cleanData.startsWith("0x")) {
        setDecoded("");
        return;
      }

      // Extract return types from the signature
      const match = signature.match(/\)(?:\s*\((.*?)\))?$/);
      if (!match || !match[1]) {
        setDecoded("");
        return;
      }

      const returnTypes = match[1].split(",").map((t) => t.trim());
      const abiCoder = new AbiCoder();
      const decoded = abiCoder.decode(returnTypes, cleanData);
      const formatted = Array.from(decoded).map(formatDecodedValue).join("\n");
      setDecoded(formatted);
    } catch (error) {
      console.error("Error decoding data:", error);
      setDecoded("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Works for output data, same as running `cast decode-calldata`. decode-abi can also decode input data with the
        `--input` flag, but it is the same as running `cast decode-calldata`, so you can just use that instead.
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Signature</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input
              value={signature}
              onChange={handleSignatureChange}
              placeholder='e.g. "balanceOf(address)(uint256)"'
            />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={signature} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Data</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input
              value={data}
              onChange={handleDataChange}
              placeholder="e.g. 0x000000000000000000000000000000000000000000000000000000000000000a"
            />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={data} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Decoded</div>
        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute right-2 top-2 z-10">
              <CopyButton text={decoded} />
            </div>
            <div className="pl-4 py-4 text-sm border-l-2 border-green-500 bg-neutral-50">
              <div
                className="font-mono whitespace-pre overflow-x-auto max-w-full pr-12"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {decoded || "Decoded data will appear here"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
