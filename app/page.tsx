export default function Home() {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">
          Quick<code className="bg-neutral-100 dark:bg-neutral-900 px-1 rounded">cast</code>.dev
        </h1>

        <h3 className="text-xl font-semibold my-2">General Commands</h3>
        <ul>
          <li>
            <code>cast help</code> Display help information about Cast.
          </li>
          <li>
            <code>cast completions</code> Generate shell autocompletions for Cast.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Chain Commands</h3>
        <ul>
          <li>
            <code>cast chain-id</code> Get the Ethereum chain ID.
          </li>
          <li>
            <code>cast chain</code> Get the symbolic name of the current chain.
          </li>
          <li>
            <code>cast client</code> Get the current client version.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Transaction Commands</h3>
        <ul>
          <li>
            <code>cast publish</code> Publish a raw transaction to the network.
          </li>
          <li>
            <code>cast receipt</code> Get the transaction receipt for a transaction.
          </li>
          <li>
            <code>cast send</code> Sign and publish a transaction.
          </li>
          <li>
            <code>cast call</code> Perform a call on an account without publishing a transaction.
          </li>
          <li>
            <code>cast rpc</code> Perform a raw JSON-RPC request [aliases: rp]
          </li>
          <li>
            <code>cast tx</code> Get information about a transaction.
          </li>
          <li>
            <code>cast run</code> Runs a published transaction in a local environment and prints the trace.
          </li>
          <li>
            <code>cast estimate</code> Estimate the gas cost of a transaction.
          </li>
          <li>
            <code>cast access-list</code> Create an access list for a transaction.
          </li>
          <li>
            <code>cast logs</code> Get logs by signature or topic
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Block Commands</h3>
        <ul>
          <li>
            <code>cast find-block</code> Get the block number closest to the provided timestamp.
          </li>
          <li>
            <code>cast gas-price</code> Get the current gas price.
          </li>
          <li>
            <code>cast block-number</code> Get the latest block number.
          </li>
          <li>
            <code>cast basefee</code> Get the basefee of a block.
          </li>
          <li>
            <code>cast block</code> Get information about a block.
          </li>
          <li>
            <code>cast age</code> Get the timestamp of a block.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Account Commands</h3>
        <ul>
          <li>
            <code>cast balance</code> Get the balance of an account in wei.
          </li>
          <li>
            <code>cast storage</code> Get the raw value of a contract's storage slot.
          </li>
          <li>
            <code>cast proof</code> Generate a storage proof for a given storage slot.
          </li>
          <li>
            <code>cast nonce</code> Get the nonce for an account.
          </li>
          <li>
            <code>cast codesize</code> Get the runtime bytecode size of a contract.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">ENS Commands</h3>
        <ul>
          <li>
            <code>cast lookup-address</code> Perform an ENS reverse lookup.
          </li>
          <li>
            <code>cast resolve-name</code> Perform an ENS lookup.
          </li>
          <li>
            <code>cast namehash</code> Calculate the ENS namehash of a name.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Etherscan Commands</h3>
        <ul>
          <li>
            <code>cast etherscan-source</code> Get the source code of a contract from Etherscan.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">ABI Commands</h3>
        <ul>
          <li>
            <code>cast abi-decode</code> Decode ABI-encoded input or output data.
          </li>
          <li>
            <code>cast abi-encode</code> ABI encode the given function arguments, excluding the selector.
          </li>
          <li>
            <code>cast 4byte</code> Get the function signatures for the given selector from
            https://sig.eth.samczsun.com.
          </li>
          <li>
            <code>cast 4byte-decode</code> Decode ABI-encoded calldata using https://sig.eth.samczsun.com.
          </li>
          <li>
            <code>cast 4byte-event</code> Get the event signature for a given topic 0 from https://sig.eth.samczsun.com.
          </li>
          <li>
            <code>cast calldata</code> ABI-encode a function with arguments.
          </li>
          <li>
            <code>cast calldata-decode</code> Decode ABI-encoded input data.
          </li>
          <li>
            <code>cast pretty-calldata</code> Pretty print calldata.
          </li>
          <li>
            <code>cast selectors</code> Extracts function selectors and arguments from bytecode
          </li>
          <li>
            <code>cast upload-signature</code> Upload the given signatures to https://sig.eth.samczsun.com.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Conversion Commands</h3>
        <ul>
          <li>
            <code>cast format-bytes32-string</code> Formats a string into bytes32 encoding.
          </li>
          <li>
            <code>cast from-bin</code> Convert binary data into hex data.
          </li>
          <li>
            <code>cast from-fixed-point</code> Convert a fixed point number into an integer.
          </li>
          <li>
            <code>cast from-utf8</code> Convert UTF8 to hex.
          </li>
          <li>
            <code>cast from-wei</code> Convert wei into an ETH amount
          </li>
          <li>
            <code>cast parse-bytes32-address</code> Parses a checksummed address from bytes32 encoding.
          </li>
          <li>
            <code>cast parse-bytes32-string</code> Parses a string from bytes32 encoding.
          </li>
          <li>
            <code>cast to-ascii</code> Convert hex data to an ASCII string.
          </li>
          <li>
            <code>cast to-base</code> Convert a number of one base to another.
          </li>
          <li>
            <code>cast to-bytes32</code> Right-pads hex data to 32 bytes.
          </li>
          <li>
            <code>cast to-dec</code> Converts a number of one base to decimal
          </li>
          <li>
            <code>cast to-fixed-point</code> Convert an integer into a fixed point number.
          </li>
          <li>
            <code>cast to-hex</code> Converts a number of one base to another
          </li>
          <li>
            <code>cast to-int256</code> Convert a number to a hex-encoded int256.
          </li>
          <li>
            <code>cast to-rlp</code> RLP encodes hex data, or an array of hex data
          </li>
          <li>
            <code>cast to-uint256</code> Convert a number to a hex-encoded uint256.
          </li>
          <li>
            <code>cast to-wei</code> Convert an ETH amount to wei.
          </li>
          <li>
            <code>cast shl</code> Perform a left shifting operation.
          </li>
          <li>
            <code>cast shr</code> Perform a right shifting operation.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Utility Commands</h3>
        <ul>
          <li>
            <code>cast address-zero</code> Prints the zero address.
          </li>
          <li>
            <code>cast sig</code> Get the selector for a function.
          </li>
          <li>
            <code>cast sig-event</code> Generate event signatures from event string.
          </li>
          <li>
            <code>cast keccak</code> Hash arbitrary data using keccak-256.
          </li>
          <li>
            <code>cast compute-address</code> Compute the contract address from a given nonce and deployer address.
          </li>
          <li>
            <code>cast create2</code> Generate a deterministic contract address using CREATE2
          </li>
          <li>
            <code>cast interface</code> Generate a Solidity interface from a given ABI.
          </li>
          <li>
            <code>cast index</code> Compute the storage slot for an entry in a mapping.
          </li>
          <li>
            <code>cast concat-hex</code> Concatenate hex strings.
          </li>
          <li>
            <code>cast max-int</code> Get the maximum i256 value.
          </li>
          <li>
            <code>cast min-int</code> Get the minimum i256 value.
          </li>
          <li>
            <code>cast max-uint</code> Get the maximum u256 value.
          </li>
          <li>
            <code>cast to-check-sum-address</code> Convert an address to a checksummed format (EIP-55).
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-2">Wallet Commands</h3>
        <ul>
          <li>
            <code>cast wallet</code> Wallet management utilities.
          </li>
          <li>
            <code>cast wallet new</code> Create a new random keypair.
          </li>
          <li>
            <code>cast wallet address</code> Convert a private key to an address.
          </li>
          <li>
            <code>cast wallet sign</code> Sign a message.
          </li>
          <li>
            <code>cast wallet vanity</code> Generate a vanity address.
          </li>
          <li>
            <code>cast wallet verify</code> Verify the signature of a message.
          </li>
        </ul>
      </main>
    </div>
  );
}
