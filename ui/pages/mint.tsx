import { CandyMachineV2, Metaplex, NftWithToken, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import NftDisplay from "../components/NftDisplay";
import PageHeading from "../components/PageHeading";
import { CANDY_MACHINE_ADDRESS } from "../lib/constants";

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachineV2 | undefined>(undefined)
  const [isMinting, setIsMinting] = useState(false)
  const [mintedNft, setMintedNft] = useState<NftWithToken | undefined>(undefined)

  const metaplex = Metaplex
    .make(connection)
    .use(walletAdapterIdentity(wallet))

  const candyMachines = metaplex.candyMachinesV2()

  async function fetchCandyMachine() {
    const fetched = await candyMachines
      .findByAddress({ address: CANDY_MACHINE_ADDRESS })

    console.log("Fetched candy machine!", fetched)
    setCandyMachine(fetched)
  }

  useEffect(() => {
    fetchCandyMachine()
  }, [])

  async function mintOne() {
    setIsMinting(true);

    const mintOutput = await candyMachines
      .mint({ candyMachine } as any); // @ts-ignore

    setIsMinting(false);
    console.log("Minted one!", mintOutput)
    setMintedNft(mintOutput.nft)

    // Fetch the candy machine to update the counts
    await fetchCandyMachine()
  }

  const canMint =
    candyMachine &&
    candyMachine.itemsRemaining.toNumber() > 0 &&
    wallet.publicKey &&
    !isMinting

  return (
    <main className="flex flex-col gap-8">
      <div className="basis-1/4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md cursor-pointer hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canMint}
          onClick={mintOne}
        >
          Mint 1 {candyMachine ? candyMachine.symbol : "NFT"}! <span className={isMinting ? 'animate-spin' : 'animate-none'}>🦖</span>
        </button>
      </div>

      {candyMachine ? (
        <p className="text-white">
          {candyMachine.itemsMinted.toNumber()} / {candyMachine.itemsAvailable.toNumber()} minted!
        </p>
      ) : <p className="text-white">Loading...</p>
      }

      {mintedNft  && candyMachine ? 
        <div className="w-96">
          <h2 className="text-xl font-medium text-white">   {/* @ts-ignore */} You minted a {candyMachine.symbol}! 🎉</h2> 
          <NftDisplay json={mintedNft.json} />  // @ts-ignore
        </div> : null
      }

      <hr />
    </main>
  )
}