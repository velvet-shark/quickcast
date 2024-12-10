"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Command features configuration
const commandFeatures: Record<string, { hasExamples?: boolean; hasOnlineExecution?: boolean }> = {
  "/cast-chain-id": { hasExamples: true, hasOnlineExecution: false },
  "/cast-chain": { hasExamples: true },
  "/cast-client": { hasExamples: true, hasOnlineExecution: false },
  "/cast-abi-decode": { hasExamples: true, hasOnlineExecution: true },
  "/cast-abi-encode": { hasExamples: true, hasOnlineExecution: true },
  "/cast-4byte": { hasExamples: false },
  "/cast-4byte-decode": { hasExamples: false },
  "/cast-4byte-event": { hasExamples: false },
  "/cast-calldata": { hasExamples: true, hasOnlineExecution: true },
  "/cast-calldata-decode": { hasExamples: false },
  "/cast-pretty-calldata": { hasExamples: false },
  "/cast-selectors": { hasExamples: false },
  "/cast-upload-signature": { hasExamples: false },
  "/cast-format-bytes32-string": { hasExamples: false },
  "/cast-from-bin": { hasExamples: false },
  "/cast-from-fixed-point": { hasExamples: false },
  "/cast-from-utf8": { hasExamples: false },
  "/cast-from-wei": { hasExamples: false },
  "/cast-parse-bytes32-address": { hasExamples: false },
  "/cast-parse-bytes32-string": { hasExamples: false },
  "/cast-to-ascii": { hasExamples: false },
  "/cast-to-base": { hasExamples: false },
  "/cast-to-bytes32": { hasExamples: true, hasOnlineExecution: true },
  "/cast-to-dec": { hasExamples: false },
  "/cast-to-fixed-point": { hasExamples: false },
  "/cast-to-hex": { hasExamples: false },
  "/cast-to-hexdata": { hasExamples: false },
  "/cast-to-int256": { hasExamples: false },
  "/cast-to-rlp": { hasExamples: false },
  "/cast-to-uint256": { hasExamples: false },
  "/cast-to-unit": { hasExamples: true, hasOnlineExecution: true },
  "/cast-to-wei": { hasExamples: false },
  "/cast-shl": { hasExamples: false },
  "/cast-shr": { hasExamples: false },
  "/cast-publish": { hasExamples: false },
  "/cast-receipt": { hasExamples: true },
  "/cast-send": { hasExamples: false, hasOnlineExecution: false },
  "/cast-call": { hasExamples: false, hasOnlineExecution: false },
  "/cast-rpc": { hasExamples: false, hasOnlineExecution: false },
  "/cast-tx": { hasExamples: false, hasOnlineExecution: false },
  "/cast-run": { hasExamples: false, hasOnlineExecution: false },
  "/cast-estimate": { hasExamples: false, hasOnlineExecution: false },
  "/cast-access-list": { hasExamples: false, hasOnlineExecution: false },
  "/cast-logs": { hasExamples: false },
  "/cast-find-block": { hasExamples: false },
  "/cast-gas-price": { hasExamples: false },
  "/cast-block-number": { hasExamples: false },
  "/cast-basefee": { hasExamples: false },
  "/cast-block": { hasExamples: false },
  "/cast-age": { hasExamples: false },
  "/cast-balance": { hasExamples: false },
  "/cast-storage": { hasExamples: false },
  "/cast-proof": { hasExamples: false },
  "/cast-nonce": { hasExamples: false },
  "/cast-code": { hasExamples: false },
  "/cast-codesize": { hasExamples: false },
  "/cast-lookup-address": { hasExamples: false },
  "/cast-resolve-name": { hasExamples: false },
  "/cast-namehash": { hasExamples: false },
  "/cast-etherscan-source": { hasExamples: false },
  "/cast-address-zero": { hasExamples: false },
  "/cast-sig": { hasExamples: false },
  "/cast-sig-event": { hasExamples: false },
  "/cast-keccak": { hasExamples: true, hasOnlineExecution: true },
  "/cast-compute-address": { hasExamples: false },
  "/cast-create2": { hasExamples: false },
  "/cast-interface": { hasExamples: false },
  "/cast-index": { hasExamples: false },
  "/cast-concat-hex": { hasExamples: false },
  "/cast-max-int": { hasExamples: false },
  "/cast-min-int": { hasExamples: false },
  "/cast-max-uint": { hasExamples: false },
  "/cast-to-check-sum-address": { hasExamples: false },
  "/cast-wallet": { hasExamples: false },
  "/cast-wallet-new": { hasExamples: false },
  "/cast-wallet-address": { hasExamples: false },
  "/cast-wallet-sign": { hasExamples: false },
  "/cast-wallet-vanity": { hasExamples: false },
  "/cast-wallet-verify": { hasExamples: false },
  "/cast-help": { hasExamples: false },
  "/cast-completions": { hasExamples: false }
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const features = commandFeatures[href];

    return (
      <Link href={href} className="group flex items-center justify-between py-0.5">
        <code>{children}</code>
        <span className="flex gap-1.5 ml-2">
          {features?.hasExamples && (
            <div className="relative flex items-center group/tooltip">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <div className="absolute right-0 top-0 -mt-8 px-2 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Extra examples
              </div>
            </div>
          )}
          {features?.hasOnlineExecution && (
            <div className="relative flex items-center group/tooltip">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="absolute right-0 top-0 -mt-8 px-2 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Run the command online
              </div>
            </div>
          )}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-neutral-100"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Navigation sidebar */}
      <nav
        className={`${
          isOpen ? "fixed inset-0 z-40" : "hidden"
        } sm:relative sm:block w-full sm:w-64 h-full overflow-y-auto bg-white border-r p-4`}
      >
        <div className="mb-4">
          <Link href="/">
            <Image src="/quickcast-logo.png" alt="QuickCast" width={300} height={45} priority />
          </Link>
        </div>

        <div className="mb-4 mt-2 text-sm text-neutral-500 space-y-1">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>Extra examples</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Run the command online</span>
          </div>
        </div>

        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">ABI Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-abi-decode">cast abi-decode</NavLink>
          </li>
          <li>
            <NavLink href="/cast-abi-encode">cast abi-encode</NavLink>
          </li>
          <li>
            <NavLink href="/cast-4byte">cast 4byte</NavLink>
          </li>
          <li>
            <NavLink href="/cast-4byte-decode">cast 4byte-decode</NavLink>
          </li>
          <li>
            <NavLink href="/cast-4byte-event">cast 4byte-event</NavLink>
          </li>
          <li>
            <NavLink href="/cast-calldata">cast calldata</NavLink>
          </li>
          <li>
            <NavLink href="/cast-calldata-decode">cast calldata-decode</NavLink>
          </li>
          <li>
            <NavLink href="/cast-pretty-calldata">cast pretty-calldata</NavLink>
          </li>
          <li>
            <NavLink href="/cast-selectors">cast selectors</NavLink>
          </li>
          <li>
            <NavLink href="/cast-upload-signature">cast upload-signature</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Conversion Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-format-bytes32-string">cast format-bytes32-string</NavLink>
          </li>
          <li>
            <NavLink href="/cast-from-bin">cast from-bin</NavLink>
          </li>
          <li>
            <NavLink href="/cast-from-fixed-point">cast from-fixed-point</NavLink>
          </li>
          <li>
            <NavLink href="/cast-from-utf8">cast from-utf8</NavLink>
          </li>
          <li>
            <NavLink href="/cast-from-wei">cast from-wei</NavLink>
          </li>
          <li>
            <NavLink href="/cast-parse-bytes32-address">cast parse-bytes32-address</NavLink>
          </li>
          <li>
            <NavLink href="/cast-parse-bytes32-string">cast parse-bytes32-string</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-ascii">cast to-ascii</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-base">cast to-base</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-bytes32">cast to-bytes32</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-dec">cast to-dec</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-fixed-point">cast to-fixed-point</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-hex">cast to-hex</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-hexdata">cast to-hexdata</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-int256">cast to-int256</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-rlp">cast to-rlp</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-uint256">cast to-uint256</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-unit">cast to-unit</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-wei">cast to-wei</NavLink>
          </li>
          <li>
            <NavLink href="/cast-shl">cast shl</NavLink>
          </li>
          <li>
            <NavLink href="/cast-shr">cast shr</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Utility Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-address-zero">cast address-zero</NavLink>
          </li>
          <li>
            <NavLink href="/cast-sig">cast sig</NavLink>
          </li>
          <li>
            <NavLink href="/cast-sig-event">cast sig-event</NavLink>
          </li>
          <li>
            <NavLink href="/cast-keccak">cast keccak</NavLink>
          </li>
          <li>
            <NavLink href="/cast-compute-address">cast compute-address</NavLink>
          </li>
          <li>
            <NavLink href="/cast-create2">cast create2</NavLink>
          </li>
          <li>
            <NavLink href="/cast-interface">cast interface</NavLink>
          </li>
          <li>
            <NavLink href="/cast-index">cast index</NavLink>
          </li>
          <li>
            <NavLink href="/cast-concat-hex">cast concat-hex</NavLink>
          </li>
          <li>
            <NavLink href="/cast-max-int">cast max-int</NavLink>
          </li>
          <li>
            <NavLink href="/cast-min-int">cast min-int</NavLink>
          </li>
          <li>
            <NavLink href="/cast-max-uint">cast max-uint</NavLink>
          </li>
          <li>
            <NavLink href="/cast-to-check-sum-address">cast to-check-sum-address</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Chain Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-chain-id">cast chain-id</NavLink>
          </li>
          <li>
            <NavLink href="/cast-chain">cast chain</NavLink>
          </li>
          <li>
            <NavLink href="/cast-client">cast client</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Transaction Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-publish">cast publish</NavLink>
          </li>
          <li>
            <NavLink href="/cast-receipt">cast receipt</NavLink>
          </li>
          <li>
            <NavLink href="/cast-send">cast send</NavLink>
          </li>
          <li>
            <NavLink href="/cast-call">cast call</NavLink>
          </li>
          <li>
            <NavLink href="/cast-rpc">cast rpc</NavLink>
          </li>
          <li>
            <NavLink href="/cast-tx">cast tx</NavLink>
          </li>
          <li>
            <NavLink href="/cast-run">cast run</NavLink>
          </li>
          <li>
            <NavLink href="/cast-estimate">cast estimate</NavLink>
          </li>
          <li>
            <NavLink href="/cast-access-list">cast access-list</NavLink>
          </li>
          <li>
            <NavLink href="/cast-logs">cast logs</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Block Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-find-block">cast find-block</NavLink>
          </li>
          <li>
            <NavLink href="/cast-gas-price">cast gas-price</NavLink>
          </li>
          <li>
            <NavLink href="/cast-block-number">cast block-number</NavLink>
          </li>
          <li>
            <NavLink href="/cast-basefee">cast basefee</NavLink>
          </li>
          <li>
            <NavLink href="/cast-block">cast block</NavLink>
          </li>
          <li>
            <NavLink href="/cast-age">cast age</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Account Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-balance">cast balance</NavLink>
          </li>
          <li>
            <NavLink href="/cast-storage">cast storage</NavLink>
          </li>
          <li>
            <NavLink href="/cast-proof">cast proof</NavLink>
          </li>
          <li>
            <NavLink href="/cast-nonce">cast nonce</NavLink>
          </li>
          <li>
            <NavLink href="/cast-code">cast code</NavLink>
          </li>
          <li>
            <NavLink href="/cast-codesize">cast codesize</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">ENS Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-lookup-address">cast lookup-address</NavLink>
          </li>
          <li>
            <NavLink href="/cast-resolve-name">cast resolve-name</NavLink>
          </li>
          <li>
            <NavLink href="/cast-namehash">cast namehash</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Etherscan Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-etherscan-source">cast etherscan-source</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Wallet Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-wallet">cast wallet</NavLink>
          </li>
          <li>
            <NavLink href="/cast-wallet-new">cast wallet new</NavLink>
          </li>
          <li>
            <NavLink href="/cast-wallet-address">cast wallet address</NavLink>
          </li>
          <li>
            <NavLink href="/cast-wallet-sign">cast wallet sign</NavLink>
          </li>
          <li>
            <NavLink href="/cast-wallet-vanity">cast wallet vanity</NavLink>
          </li>
          <li>
            <NavLink href="/cast-wallet-verify">cast wallet verify</NavLink>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">General Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <NavLink href="/cast-help">cast help</NavLink>
          </li>
          <li>
            <NavLink href="/cast-completions">cast completions</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
