import { Metadata, Metaplex, Nft } from "@metaplex-foundation/js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import NftDisplay from "../components/NftDisplay"
import PageHeading from "../components/PageHeading"
import { COLLECTION_MINT_ADDRESS } from "../lib/constants"
import image from "./artist.png"
import Image from 'next/image';

export default function Intro() {
 
  return (
    <main className="flex flex-col gap-8">

      <PageHeading> Not a General NFT Gallery</PageHeading>
     
      <div className="flex items-center">
        <div className="mr-4">
          <Image
            src={image}
            alt=""
            width={400} // Set the width of the image (8 times bigger than 50)
            height={400} // Set the height of the image (8 times bigger than 50)
          />
        </div>
        <div className="flex-shrink">
          This is the NFT Collection website that includes masterpieces of many artists, some great arts such as the art of burning CD album covers, in the style of Dutch seascapes, Frank Miller, photos taken with provia, emphasizes emotion over realism, boldly fragmented, wavy, wlop. It's a showcase of diverse and captivating artworks from talented creators around the world.
        </div>
      </div>
    </main>
  )
}