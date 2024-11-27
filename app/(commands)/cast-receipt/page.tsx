import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";
import { Example } from "@/app/components/Example";

export default async function CastToDecPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const output = `blockHash               0xc6455167b00399dfbbc0335ccfe465d789dd17d3ad2e091be7575cd45f5105a0
blockNumber             21027977
contractAddress
cumulativeGasUsed       9740548
effectiveGasPrice       6103491361
from                    0x498098ca1b7447fC5035f95B80be97eE16F82597
gasUsed                 34706
logs                    [{
                          "address":"0x6b175474e89094c44da98b954eedeac495271d0f",
                          "topics": [
                            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                            "0x000000000000000000000000498098ca1b7447fc5035f95b80be97ee16f82597",
                            "0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045"
                          ],
                          "data":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
                          "blockHash":"0xc6455167b00399dfbbc0335ccfe465d789dd17d3ad2e091be7575cd45f5105a0",
                          "blockNumber":"0x140dc89",
                          "blockTimestamp":"0x6718dd53",
                          "transactionHash":"0x96164ff7b1f48641ed2168b18c1213dbe0ce2504f870a1187ed8cd2df576bae1",
                          "transactionIndex":"0x72",
                          "logIndex":"0x10e",
                          "removed":false
                        }]
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000008200000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000010000000000000004000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000002000000000000000000000000000000000000800000000000000000000000000000010000000000000000000000
root
status                  1 (success)
transactionHash         0x96164ff7b1f48641ed2168b18c1213dbe0ce2504f870a1187ed8cd2df576bae1
transactionIndex        114
type                    2
blobGasPrice
blobGasUsed
authorizationList
to                      0x6B175474E89094C44Da98b954EedeAC495271d0F`;

  return (
    <>
      {/* Run command */}
      {/* <div>
      </div> */}

      {/* Examples */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Examples</h2>
        <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
          <div className="space-y-6">
            <Example
              description="Get a receipt by transaction hash. This one is from a transaction on the Ethereum mainnet, sending 1 DAI to vitalik.eth:"
              command="cast receipt 0x96164ff7b1f48641ed2168b18c1213dbe0ce2504f870a1187ed8cd2df576bae1 --rpc-url https://eth.llamarpc.com"
              output={output}
            />
            <Example
              description="Get a specific field from the receipt. In this case, the gasUsed:"
              command="cast receipt 0x96164ff7b1f48641ed2168b18c1213dbe0ce2504f870a1187ed8cd2df576bae1 gasUsed --rpc-url https://eth.llamarpc.com"
              output="34706"
            />
            <Example
              description="Get a block number from the receipt:"
              command="cast receipt 0x96164ff7b1f48641ed2168b18c1213dbe0ce2504f870a1187ed8cd2df576bae1 blockNumber --rpc-url https://eth.llamarpc.com"
              output="21027977"
            />
          </div>
        </section>
      </div>

      {/* Command Documentation */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Documentation</h2>
        <section className="bg-yellow-50 dark:bg-neutral-900 rounded-lg px-4 py-2 border dark:border-neutral-800">
          <div className="prose dark:prose-invert max-w-none">
            <Markdown content={content ?? ""} className="bg-yellow-50" />
          </div>
        </section>
      </div>
    </>
  );
}
