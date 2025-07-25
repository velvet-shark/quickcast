import { ReactNode } from "react";
import { Example } from "@/app/components/Example";

// Import run components
import { RunAbiEncode } from "@/app/components/commands/run-abi-encode";
import { RunBytes32 } from "@/app/components/commands/run-bytes32";
import { RunCalldata } from "@/app/components/commands/run-calldata";
import { RunDecodeAbi } from "@/app/components/commands/run-decode-abi";
import { RunDecodeCalldata } from "@/app/components/commands/run-decode-calldata";
import { RunKeccak } from "@/app/components/commands/run-keccak";
import { RunToDec } from "@/app/components/commands/run-to-dec";
import { RunToHex } from "@/app/components/commands/run-to-hex";
import { RunUnit } from "@/app/components/commands/run-unit";

interface CommandCustomization {
  examples?: ReactNode;
  runCommand?: ReactNode;
}

export const commandCustomizations: Record<string, CommandCustomization> = {
  "cast-to-bytes32": {
    examples: (
      <>
        <Example
          description="Just adds zeros to the hex string on the right, until it is 32 bytes (hex can be with or without 0x):"
          command="cast to-bytes32 0x1"
          output="0x1000000000000000000000000000000000000000000000000000000000000000"
        />
        <Example
          description="It needs to be a hex string, it won't work with normal strings, e.g. it will work with '1234abc' but won't work with '1234xyz':"
          command="cast to-bytes32 1234abc"
          output="0x1234abc000000000000000000000000000000000000000000000000000000000"
        />
        <Example
          description="Often used to right pad zeros to addresses, for example when the address needs to be 32 bytes:"
          command="cast to-bytes32 0xbd20e68967fc2a813356bff4754bba48692d8e0d"
          output="0xbd20e68967fc2a813356bff4754bba48692d8e0d000000000000000000000000"
        />
      </>
    ),
    runCommand: <RunBytes32 />
  },
  "cast-keccak": {
    examples: (
      <>
        <Example
          description="Hashes whatever you give it with keccak256:"
          command='cast keccak "I tried auditioning at the foundry, but they said: Sorry, we only cast iron."'
          output="0x83ee1d1103f1f612ae164e30f597409cbebed0c5168f31b12cce1a0fc0f90bf3"
        />
        <Example
          description="Useful for getting the function selector of a function signature. Just pass the function signature as a string and get the first 4 bytes of the hash:"
          command='cast keccak "transfer(address,uint256)"'
          output="0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b"
        />
        <Example
          description="Works with hex values too:"
          command="cast keccak 0x1234"
          output="0x56570de287d73cd1cb6092bb8fdee6173974955fdef345ae579ee9f475ea7432"
        />
      </>
    ),
    runCommand: <RunKeccak />
  },
  "cast-abi-encode": {
    examples: (
      <>
        <Example
          description="ABI encode call data for the transfer function:"
          command='cast abi-encode "transfer(address,uint256)" 0x1234567890123456789012345678901234567890 1234'
          output="0x00000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000000000000004d2"
        />
        <Example
          description="Encode a function with multiple arguments (e.g., ERC20 transferFrom):"
          command='cast abi-encode "transferFrom(address,address,uint256)" 0xFD086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9 0xBe18197dd90175bAe3ee78ADb6304c8e848F4E04 420000000'
          output="0x000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9000000000000000000000000be18197dd90175bae3ee78adb6304c8e848f4e040000000000000000000000000000000000000000000000000000000019254a00"
        />
        <Example
          description="Encode complex types like arrays:"
          command='cast abi-encode "setValues(uint256[])" "[1,2,3]"'
          output="0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003"
        />
      </>
    ),
    runCommand: <RunAbiEncode />
  },
  "cast-calldata": {
    examples: (
      <>
        <Example
          description="Generate calldata for the transfer function:"
          command='cast calldata "transfer(address,uint256)" 0x8dBE1b0900c0bBAdEfCD25aA5618B2CC2430c574 5000'
          output="0xa9059cbb0000000000000000000000008dbe1b0900c0bbadefc25aa5618b2cc2430c5740000000000000000000000000000000000000000000000000000000000001388"
        />
        <Example
          description="The difference between cast calldata and cast abi-encode is that the former includes the function selector:"
          command='cast sig "transfer(address,uint256)"'
          output="0xa9059cbb"
        />
        <Example
          description="To illustrate, here's the same call with cast abi-encode (which only encodes the arguments):"
          command='cast abi-encode "transfer(address,uint256)" 0x8dBE1b0900c0bBAdEfCD25aA5618B2CC2430c574 5000'
          output="0x0000000000000000000000008dbe1b0900c0bbadefc25aa5618b2cc2430c5740000000000000000000000000000000000000000000000000000000000001388"
        />
      </>
    ),
    runCommand: <RunCalldata />
  },
  "cast-decode-abi": {
    examples: (
      <>
        <Example
          description="Decode hex data for ERC20 transfer function:"
          command='cast decode-abi "transfer(address,uint256)" 0x000000000000000000000000c3761eb917cd790b30dad99f6cc5b4ff93c4f9ea0000000000000000000000000000000000000000000000000000000000989680'
          output="0xC3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA\n10000000 [1e7]"
        />
        <Example
          description="Decode data for UniswapV3 exactInputSingle (struct parameters):"
          command='cast decode-abi "exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))" 0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000ad78ebc5ac62000000000000000000000000000000000000000000000000000000000000671b2c970000000000000000000000000000000000000000000000000000000000000000'
          output="(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2, 0x6B175474E89094C44Da98b954EedeAC495271d0F, 500 [5e2], 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 1000000000000000000 [1e18], 3000000000000000000 [3e18], 1733506199 [1.733e9], 0)"
        />
        <Example
          description="Decode complex types like arrays:"
          command='cast decode-abi "setData(uint256[])" 0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000028'
          output="[10, 20, 30, 40]"
        />
      </>
    ),
    runCommand: <RunDecodeAbi />
  },
  "cast-decode-calldata": {
    examples: (
      <>
        <Example
          description="Decode calldata for ERC20 transfer function:"
          command='cast decode-calldata 0xa9059cbb000000000000000000000000c3761eb917cd790b30dad99f6cc5b4ff93c4f9ea0000000000000000000000000000000000000000000000000000000000989680'
          output={`Function: transfer(address,uint256)

Args:
0: 0xC3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA
1: 10000000 [1e7]`}
        />
        <Example
          description="Decode calldata for approve function (will auto-detect function signature):"
          command='cast decode-calldata 0x095ea7b30000000000000000000000009bc8cac79ecf9d254acac8194c2e7bc37c6c6a650000000000000000000000000000000000000000000000000000000005f5e100'
          output={`Function: approve(address,uint256)

Args:
0: 0x9bc8CaC79ECf9D254ACAC8194c2e7bc37c6C6a65
1: 100000000 [1e8]`}
        />
        <Example
          description="You can also supply the function signature directly if auto-detection doesn't work:"
          command='cast decode-calldata --sig "transfer(address,uint256)" 0xa9059cbb000000000000000000000000c3761eb917cd790b30dad99f6cc5b4ff93c4f9ea0000000000000000000000000000000000000000000000000000000000989680'
          output={`Function: transfer(address,uint256)

Args:
0: 0xC3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA
1: 10000000 [1e7]`}
        />
      </>
    ),
    runCommand: <RunDecodeCalldata />
  },
  "cast-from-wei": {
    examples: (
      <>
        <Example
          description="Convert wei to ether:"
          command="cast from-wei 1000000000000000000"
          output="1"
        />
        <Example
          description="Convert wei to gwei:"
          command="cast from-wei 1000000000 gwei"
          output="1"
        />
        <Example
          description="Convert a large amount:"
          command="cast from-wei 2500000000000000000"
          output="2.5"
        />
      </>
    ),
    runCommand: <RunUnit />
  },
  "cast-to-dec": {
    examples: (
      <>
        <Example
          description="Convert hex to decimal:"
          command="cast to-dec 0x64"
          output="100"
        />
        <Example
          description="Convert a large hex value:"
          command="cast to-dec 0x1234567890abcdef"
          output="1311768467294899695"
        />
        <Example
          description="Works with hex values without 0x prefix:"
          command="cast to-dec ff"
          output="255"
        />
      </>
    ),
    runCommand: <RunToDec />
  },
  "cast-to-hex": {
    examples: (
      <>
        <Example
          description="Convert decimal to hex:"
          command="cast to-hex 100"
          output="0x64"
        />
        <Example
          description="Convert a large decimal value:"
          command="cast to-hex 1311768467294899695"
          output="0x1234567890abcdef"
        />
        <Example
          description="Convert zero:"
          command="cast to-hex 0"
          output="0x0"
        />
      </>
    ),
    runCommand: <RunToHex />
  },
  "cast-to-unit": {
    examples: (
      <>
        <Example
          description="Convert ether to wei:"
          command="cast to-unit 1 ether"
          output="1000000000000000000"
        />
        <Example
          description="Convert gwei to wei:"
          command="cast to-unit 1 gwei"
          output="1000000000"
        />
        <Example
          description="Convert 2.5 ether to wei:"
          command="cast to-unit 2.5 ether"
          output="2500000000000000000"
        />
      </>
    ),
    runCommand: <RunUnit />
  },
  "cast-chain-id": {
    examples: (
      <>
        <Example
          description="Get the chain ID of Ethereum mainnet:"
          command="cast chain-id --rpc-url https://eth.llamarpc.com"
          output="1"
        />
        <Example
          description="Get the chain ID of Polygon:"
          command="cast chain-id --rpc-url https://polygon-rpc.com"
          output="137"
        />
        <Example
          description="Get the chain ID of Arbitrum:"
          command="cast chain-id --rpc-url https://arb1.arbitrum.io/rpc"
          output="42161"
        />
      </>
    )
  },
  "cast-chain": {
    examples: (
      <>
        <Example
          description="Get the chain name from mainnet:"
          command="cast chain --rpc-url https://eth.llamarpc.com"
          output="mainnet"
        />
        <Example
          description="Get the chain name from chain ID:"
          command="cast chain 137"
          output="polygon"
        />
        <Example
          description="Get chain info for Arbitrum:"
          command="cast chain 42161"
          output="arbitrum"
        />
      </>
    )
  },
  "cast-client": {
    examples: (
      <>
        <Example
          description="Get the client version of an Ethereum node:"
          command="cast client --rpc-url https://eth.llamarpc.com"
          output="Geth/v1.13.5-stable/linux-amd64/go1.21.4"
        />
        <Example
          description="Get the client version of an Arbitrum node:"
          command="cast client --rpc-url https://arb1.arbitrum.io/rpc"
          output="Nitro/v2.1.1/linux-amd64/go1.21.5"
        />
      </>
    )
  },
  "cast-receipt": {
    examples: (
      <>
        <Example
          description="Get transaction receipt for a successful transaction:"
          command="cast receipt 0x7c6d8e7c34d01dc643b8e12dbfc471501a7b87fce27d6a3fb56e121f327d6e5d --rpc-url https://eth.llamarpc.com"
          output={`Transaction Hash: 0x7c6d8e7c34d01dc643b8e12dbfc471501a7b87fce27d6a3fb56e121f327d6e5d
Transaction Index: 0
From: 0x60a223a1f3dfa19f85e5975dc0f7de4e37a6f2df
To: 0x60a223a1f3dfa19f85e5975dc0f7de4e37a6f2df
Value: 0
Gas Used: 21000
Gas Price: 1000000000
Block Number: 18438823
Block Hash: 0x6f6b66e75da4b41838b6b15e1a8b8b5d7e4f8b3d2a1f0e9c8d7b6a5948372615
Status: 1 (success)`}
        />
      </>
    )
  }
};