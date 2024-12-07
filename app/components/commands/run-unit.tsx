"use client";

import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { CopyButton } from "@/app/components/CopyButton";
import { parseUnits, formatUnits } from "ethers";

interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
}

export function RunUnit() {
  const [wei, setWei] = useState("");
  const [gwei, setGwei] = useState("");
  const [ether, setEther] = useState("");
  const [activeField, setActiveField] = useState<"wei" | "gwei" | "ether" | null>(null);
  const [rates, setRates] = useState<ExchangeRates>({ USD: 0, EUR: 0, GBP: 0 });

  useEffect(() => {
    fetchRates();
  }, []);

  async function fetchRates() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,eur,gbp"
      );
      const data = await response.json();
      setRates({
        USD: data.ethereum.usd,
        EUR: data.ethereum.eur,
        GBP: data.ethereum.gbp
      });
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    }
  }

  function formatWithSpaces(value: string): string {
    if (!value) return "";

    // Handle decimal numbers
    const [whole, decimal] = value.split(".");

    // Add spaces to the whole number part
    const withSpaces = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // Return with decimal part if it exists
    return decimal ? `${withSpaces}.${decimal}` : withSpaces;
  }

  function trimTrailingZeros(value: string): string {
    if (!value.includes(".")) return value;
    return value.replace(/\.?0+$/, "");
  }

  function handleWeiChange(value: string) {
    setActiveField("wei");
    if (value === "") {
      setWei("");
      setGwei("");
      setEther("");
      return;
    }

    try {
      setWei(value);
      setGwei(trimTrailingZeros(formatUnits(value, "gwei")));
      setEther(formatUnits(value, "ether"));
    } catch (error) {
      // Invalid input
    }
  }

  function handleGweiChange(value: string) {
    setActiveField("gwei");
    if (value === "") {
      setWei("");
      setGwei("");
      setEther("");
      return;
    }

    try {
      const weiValue = parseUnits(value, "gwei").toString();
      setWei(weiValue);
      setGwei(value);
      setEther(formatUnits(weiValue, "ether"));
    } catch (error) {
      // Invalid input
    }
  }

  function handleEtherChange(value: string) {
    setActiveField("ether");
    setEther(value);

    if (value === "") {
      setWei("");
      setGwei("");
      return;
    }

    try {
      if (/^\d*\.?\d*$/.test(value)) {
        const weiValue = parseUnits(value, "ether").toString();
        setWei(weiValue);
        setGwei(trimTrailingZeros(formatUnits(weiValue, "gwei")));
      }
    } catch (error) {
      setWei("");
      setGwei("");
    }
  }

  function formatFiatValue(ethAmount: string): { usd: string; eur: string; gbp: string } {
    if (!ethAmount || !rates.USD) {
      return { usd: "0.00", eur: "0.00", gbp: "0.00" };
    }

    try {
      const eth = parseFloat(ethAmount);
      const usd = eth * rates.USD;
      const eur = eth * rates.EUR;
      const gbp = eth * rates.GBP;

      const format = (value: number) => {
        if (value < 0.01) return "< 0.01";
        return new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      };

      return {
        usd: format(usd),
        eur: format(eur),
        gbp: format(gbp)
      };
    } catch {
      return { usd: "0.00", eur: "0.00", gbp: "0.00" };
    }
  }

  const fiatValues = formatFiatValue(ether);

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Converts between wei, gwei and ether, but also shows the value in USD, EUR and GBP.
        <br />
        Better display for large numbers so that you can always see how many of those damn zeros are there.
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-16 text-sm font-medium">Wei</div>
          <div className="flex-1">
            <div className="flex gap-2">
              <Input
                value={activeField === "wei" ? wei : formatWithSpaces(wei)}
                onChange={(e) => handleWeiChange(e.target.value)}
                onFocus={() => setActiveField("wei")}
                placeholder="Enter wei amount"
              />
              <div className="h-10 w-10 shrink-0 flex items-center justify-center">
                <CopyButton text={wei} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 text-sm font-medium">Gwei</div>
          <div className="flex-1">
            <div className="flex gap-2">
              <Input
                value={activeField === "gwei" ? gwei : formatWithSpaces(gwei)}
                onChange={(e) => handleGweiChange(e.target.value)}
                onFocus={() => setActiveField("gwei")}
                placeholder="Enter gwei amount"
              />
              <div className="h-10 w-10 shrink-0 flex items-center justify-center">
                <CopyButton text={gwei} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 text-sm font-medium">Ether</div>
          <div className="flex-1">
            <div className="flex gap-2">
              <Input
                value={activeField === "ether" ? ether : formatWithSpaces(ether)}
                onChange={(e) => handleEtherChange(e.target.value)}
                onFocus={() => setActiveField("ether")}
                placeholder="Enter ether amount"
              />
              <div className="h-10 w-10 shrink-0 flex items-center justify-center">
                <CopyButton text={ether} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 text-sm font-medium">Value</div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground space-x-4">
              <span>${fiatValues.usd}</span>
              <span>€{fiatValues.eur}</span>
              <span>£{fiatValues.gbp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
