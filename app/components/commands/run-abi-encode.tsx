"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";
import { AbiCoder } from "ethers";

type ParamValue = string | bigint;
type TupleValue = ParamValue[];
type Parameter = ParamValue | TupleValue;

export function RunAbiEncode() {
  const [signature, setSignature] = useState("");
  const [params, setParams] = useState("");
  const [encoded, setEncoded] = useState("");

  function handleSignatureChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSignature(value);
    generateEncoded(value, params);
  }

  function handleParamsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setParams(value);
    generateEncoded(signature, value);
  }

  function parseTuple(tupleStr: string): TupleValue {
    // Remove outer parentheses
    const inner = tupleStr.slice(1, -1);
    const parts = inner.split(",").map((p) => p.trim());

    return parts.map((part) => {
      // If it's a number and doesn't start with 0x
      if (!part.startsWith("0x") && /^\d+$/.test(part)) {
        return BigInt(part);
      }
      return part;
    });
  }

  function parseParams(paramsStr: string): Parameter[] {
    if (!paramsStr.trim()) return [];

    // If the entire input is a tuple
    if (paramsStr.trim().startsWith("(") && paramsStr.trim().endsWith(")")) {
      return parseTuple(paramsStr.trim());
    }

    // Otherwise split by spaces and parse each parameter
    const parts = paramsStr.trim().split(/\s+/);
    return parts.map((part) => {
      if (part.startsWith("(") && part.endsWith(")")) {
        return parseTuple(part);
      }
      if (!part.startsWith("0x") && /^\d+$/.test(part)) {
        return BigInt(part);
      }
      return part;
    });
  }

  function generateEncoded(signature: string, parameters: string) {
    if (!signature || !signature.includes("(")) {
      setEncoded("");
      return;
    }

    try {
      // Extract types from the function signature
      const match = signature.match(/\((.*)\)/);
      if (!match) {
        setEncoded("");
        return;
      }

      const typeString = match[1];
      const parsedParams = parseParams(parameters);

      // Use AbiCoder
      const abiCoder = new AbiCoder();

      // For tuple types, we need to wrap both the type and params
      if (typeString.startsWith("(") && typeString.endsWith(")")) {
        const encoded = abiCoder.encode([typeString], [parsedParams]);
        setEncoded(encoded);
      } else {
        // For non-tuple types, encode directly
        const types = typeString.split(",").map((t) => t.trim());
        const encoded = abiCoder.encode(types, parsedParams);
        setEncoded(encoded);
      }
    } catch (error) {
      console.error("Error generating encoded data:", error);
      setEncoded("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Signature</div>
        <div className="flex-1">
          <div className="flex gap-2">
            <Input value={signature} onChange={handleSignatureChange} placeholder='e.g. "someFunc(address,uint256)"' />
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
            <Input
              value={params}
              onChange={handleParamsChange}
              placeholder="e.g. 0xbd20e68967fc2a813356bff4754bba48692d8e0d 123"
            />
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <CopyButton text={params} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-24 text-sm font-medium">Encoded</div>
        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute right-2 top-2 z-10">
              <CopyButton text={encoded} />
            </div>
            <div className="pl-4 py-4 text-sm border-l-2 border-green-500 bg-neutral-50">
              <div
                className="font-mono whitespace-nowrap overflow-x-auto max-w-full pr-12"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {encoded || "Encoded data will appear here"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
