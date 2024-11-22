"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
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
        } sm:relative sm:block w-full sm:w-64 h-full overflow-y-auto bg-white dark:bg-[#1F1F1F] border-r dark:border-neutral-800 p-4`}
      >
        <div className="mb-6">
          <Link href="/">
            <img src="/quickcast-logo.svg" alt="QuickCast" className="h-8" />
          </Link>
        </div>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Chain Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-chain-id">
              <code>cast chain-id</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-chain">
              <code>cast chain</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-client">
              <code>cast client</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Transaction Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-publish">
              <code>cast publish</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-receipt">
              <code>cast receipt</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-send">
              <code>cast send</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-call">
              <code>cast call</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-rpc">
              <code>cast rpc</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-tx">
              <code>cast tx</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-run">
              <code>cast run</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-estimate">
              <code>cast estimate</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-access-list">
              <code>cast access-list</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-logs">
              <code>cast logs</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Block Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-find-block">
              <code>cast find-block</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-gas-price">
              <code>cast gas-price</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-block-number">
              <code>cast block-number</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-basefee">
              <code>cast basefee</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-block">
              <code>cast block</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-age">
              <code>cast age</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Account Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-balance">
              <code>cast balance</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-storage">
              <code>cast storage</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-proof">
              <code>cast proof</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-nonce">
              <code>cast nonce</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-code">
              <code>cast code</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-codesize">
              <code>cast codesize</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">ENS Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-lookup-address">
              <code>cast lookup-address</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-resolve-name">
              <code>cast resolve-name</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-namehash">
              <code>cast namehash</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Etherscan Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-etherscan-source">
              <code>cast etherscan-source</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">ABI Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-abi-decode">
              <code>cast abi-decode</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-abi-encode">
              <code>cast abi-encode</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-4byte">
              <code>cast 4byte</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-4byte-decode">
              <code>cast 4byte-decode</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-4byte-event">
              <code>cast 4byte-event</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-calldata">
              <code>cast calldata</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-calldata-decode">
              <code>cast calldata-decode</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-pretty-calldata">
              <code>cast pretty-calldata</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-selectors">
              <code>cast selectors</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-upload-signature">
              <code>cast upload-signature</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Conversion Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-format-bytes32-string">
              <code>cast format-bytes32-string</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-from-bin">
              <code>cast from-bin</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-from-fixed-point">
              <code>cast from-fixed-point</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-from-utf8">
              <code>cast from-utf8</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-from-wei">
              <code>cast from-wei</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-parse-bytes32-address">
              <code>cast parse-bytes32-address</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-parse-bytes32-string">
              <code>cast parse-bytes32-string</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-ascii">
              <code>cast to-ascii</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-base">
              <code>cast to-base</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-bytes32">
              <code>cast to-bytes32</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-dec">
              <code>cast to-dec</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-fixed-point">
              <code>cast to-fixed-point</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-hex">
              <code>cast to-hex</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-hexdata">
              <code>cast to-hexdata</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-int256">
              <code>cast to-int256</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-rlp">
              <code>cast to-rlp</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-uint256">
              <code>cast to-uint256</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-uint">
              <code>cast to-uint</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-wei">
              <code>cast to-wei</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-shl">
              <code>cast shl</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-shr">
              <code>cast shr</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Utility Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-address-zero">
              <code>cast address-zero</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-sig">
              <code>cast sig</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-sig-event">
              <code>cast sig-event</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-keccak">
              <code>cast keccak</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-compute-address">
              <code>cast compute-address</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-create2">
              <code>cast create2</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-interface">
              <code>cast interface</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-index">
              <code>cast index</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-concat-hex">
              <code>cast concat-hex</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-max-int">
              <code>cast max-int</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-min-int">
              <code>cast min-int</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-max-uint">
              <code>cast max-uint</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-to-check-sum-address">
              <code>cast to-check-sum-address</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Wallet Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-wallet">
              <code>cast wallet</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-wallet-new">
              <code>cast wallet new</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-wallet-address">
              <code>cast wallet address</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-wallet-sign">
              <code>cast wallet sign</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-wallet-vanity">
              <code>cast wallet vanity</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-wallet-verify">
              <code>cast wallet verify</code>
            </Link>
          </li>
        </ul>
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">General Commands</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast-help">
              <code>cast help</code>
            </Link>
          </li>
          <li>
            <Link href="/cast-completions">
              <code>cast completions</code>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
