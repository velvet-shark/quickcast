export function Navigation() {
    return (
        <nav className="hidden sm:block w-64 h-full border-r dark:border-neutral-800 p-4">
            <div className="mb-6">
                <a href="/">
                    <img src="/quickcast-logo.svg" alt="QuickCast" className="h-8" />
                </a>
            </div>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Chain Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-chain-id">
                        <code>cast chain-id</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-chain">
                        <code>cast chain</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-client">
                        <code>cast client</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Transaction Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-publish">
                        <code>cast publish</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-receipt">
                        <code>cast receipt</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-send">
                        <code>cast send</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-call">
                        <code>cast call</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-rpc">
                        <code>cast rpc</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-tx">
                        <code>cast tx</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-run">
                        <code>cast run</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-estimate">
                        <code>cast estimate</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-access-list">
                        <code>cast access-list</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-logs">
                        <code>cast logs</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Block Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-find-block">
                        <code>cast find-block</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-gas-price">
                        <code>cast gas-price</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-block-number">
                        <code>cast block-number</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-basefee">
                        <code>cast basefee</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-block">
                        <code>cast block</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-age">
                        <code>cast age</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Account Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-balance">
                        <code>cast balance</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-storage">
                        <code>cast storage</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-proof">
                        <code>cast proof</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-nonce">
                        <code>cast nonce</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-codesize">
                        <code>cast codesize</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">ENS Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-lookup-address">
                        <code>cast lookup-address</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-resolve-name">
                        <code>cast resolve-name</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-namehash">
                        <code>cast namehash</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Etherscan Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-etherscan-source">
                        <code>cast etherscan-source</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">ABI Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-abi-decode">
                        <code>cast abi-decode</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-abi-encode">
                        <code>cast abi-encode</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-4byte">
                        <code>cast 4byte</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-4byte-decode">
                        <code>cast 4byte-decode</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-4byte-event">
                        <code>cast 4byte-event</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-calldata">
                        <code>cast calldata</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-calldata-decode">
                        <code>cast calldata-decode</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-pretty-calldata">
                        <code>cast pretty-calldata</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-selectors">
                        <code>cast selectors</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-upload-signature">
                        <code>cast upload-signature</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Conversion Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-format-bytes32-string">
                        <code>cast format-bytes32-string</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-from-bin">
                        <code>cast from-bin</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-from-fixed-point">
                        <code>cast from-fixed-point</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-from-utf8">
                        <code>cast from-utf8</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-from-wei">
                        <code>cast from-wei</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-parse-bytes32-address">
                        <code>cast parse-bytes32-address</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-parse-bytes32-string">
                        <code>cast parse-bytes32-string</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-ascii">
                        <code>cast to-ascii</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-base">
                        <code>cast to-base</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-bytes32">
                        <code>cast to-bytes32</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-dec">
                        <code>cast to-dec</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-fixed-point">
                        <code>cast to-fixed-point</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-hex">
                        <code>cast to-hex</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-int256">
                        <code>cast to-int256</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-rlp">
                        <code>cast to-rlp</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-uint256">
                        <code>cast to-uint256</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-wei">
                        <code>cast to-wei</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-shl">
                        <code>cast shl</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-shr">
                        <code>cast shr</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Utility Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-address-zero">
                        <code>cast address-zero</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-sig">
                        <code>cast sig</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-sig-event">
                        <code>cast sig-event</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-keccak">
                        <code>cast keccak</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-compute-address">
                        <code>cast compute-address</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-create2">
                        <code>cast create2</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-interface">
                        <code>cast interface</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-index">
                        <code>cast index</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-concat-hex">
                        <code>cast concat-hex</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-max-int">
                        <code>cast max-int</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-min-int">
                        <code>cast min-int</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-max-uint">
                        <code>cast max-uint</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-to-check-sum-address">
                        <code>cast to-check-sum-address</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">Wallet Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-wallet">
                        <code>cast wallet</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-wallet-new">
                        <code>cast wallet new</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-wallet-address">
                        <code>cast wallet address</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-wallet-sign">
                        <code>cast wallet sign</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-wallet-vanity">
                        <code>cast wallet vanity</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-wallet-verify">
                        <code>cast wallet verify</code>
                    </a>
                </li>
            </ul>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-1 bg-neutral-100 ">General Commands</h3>
            <ul className="text-sm space-y-1">
                <li>
                    <a href="/commands/cast-help">
                        <code>cast help</code>
                    </a>
                </li>
                <li>
                    <a href="/commands/cast-completions">
                        <code>cast completions</code>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
