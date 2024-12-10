"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";
import { Interface } from "ethers";

type ParamValue = string | number | boolean;

export function RunCalldata() {
  const [signature, setSignature] = useState("");
  const [params, setParams] = useState("");
  const [calldata, setCalldata] = useState("");

  function handleSignatureChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSignature(value);
    generateCalldata(value, params);
  }

  function handleParamsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setParams(value);
    generateCalldata(signature, value);
  }

  function parseParams(paramsStr: string): ParamValue[] {
    if (!paramsStr.trim()) return [];

    // Split by spaces, but keep quoted strings together
    const matches = paramsStr.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];

    return matches.map((param) => {
      // Remove quotes from strings
      param = param.replace(/^["']|["']$/g, "");

      // Try to parse numbers if they don't start with 0x and look like a number
      if (!param.startsWith("0x") && /^\d+$/.test(param)) {
        return param; // Keep numbers as strings to preserve precision
      }

      return param;
    });
  }

  function generateCalldata(sig: string, parameters: string) {
    if (!sig || !sig.includes("(")) {
      setCalldata("");
      return;
    }

    try {
      // Clean up the signature
      const cleanSig = sig.trim().replace(/\s+/g, "");

      // Create a function fragment from the signature
      const iface = new Interface([`function ${cleanSig}`]);

      // Parse parameters as space-separated values
      const parsedParams = parseParams(parameters);

      // Get the function name
      const funcName = cleanSig.split("(")[0];

      // Encode the function call
      const encoded = iface.encodeFunctionData(funcName, parsedParams);
      setCalldata(encoded);
    } catch (error) {
      console.error("Error generating calldata:", error);
      setCalldata("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Signature</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input value={signature} onChange={handleSignatureChange} placeholder="e.g. transfer(address,uint256)" />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={signature} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Parameters</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input value={params} onChange={handleParamsChange} placeholder="e.g. 0x123... 1000000000000000000" />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={params} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Calldata</div>
        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute right-2 top-2 z-10">
              <CopyButton text={calldata} />
            </div>
            <div className="pl-4 py-4 text-sm border-l-2 border-green-500 bg-neutral-50">
              <div
                className="font-mono whitespace-nowrap overflow-x-auto max-w-full pr-12"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {calldata || "Encoded calldata will appear here"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
