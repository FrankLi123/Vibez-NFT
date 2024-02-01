import { JsonMetadata } from "@metaplex-foundation/js"
// import * as web3 from '@solana/web3.js';
import { WalletContextState, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Signer, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmRawTransaction, sendAndConfirmTransaction, Connection, clusterApiUrl, Cluster } from "@solana/web3.js";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { transferV1, mplTokenMetadata, TokenStandard, findTokenRecordPda} from '@metaplex-foundation/mpl-token-metadata'
import { Pda, createNoopSigner, createSignerFromKeypair, generateSigner, percentAmount, publicKey, signerIdentity } from '@metaplex-foundation/umi'
import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { nftStorageUploader } from "@metaplex-foundation/umi-uploader-nft-storage";
import { findAssociatedTokenPda } from "@metaplex-foundation/mpl-toolbox";
import { BLOCKCHAIN_RPC_ENDPOINT, CONNECTION_LINK, MINTED_PUBLIC_KEY_MAP, SELLER_PRIVATE_KEY, SELLER_PUBLIC_KEY } from "../lib/constants";

interface NftProps {
  json: JsonMetadata<string>
}
export default function NftDisplay({ json }: NftProps) {
    
    const wallet = useWallet()
    const connection = new Connection(CONNECTION_LINK);
    
    async function purchaseNFT() {

        if (!wallet.publicKey) {
            console.error("Wallet public key is null");
            return;
          }
        

        const buyerPublicKey = wallet.publicKey.toBase58()
        const sellerPublicKey = SELLER_PUBLIC_KEY;
        console.log("buyer's public key:", buyerPublicKey)
        console.log("seller's public key:", sellerPublicKey)


        try{
            const endpoint = BLOCKCHAIN_RPC_ENDPOINT;
            const umi = createUmi(endpoint)
            .use(walletAdapterIdentity(wallet))
            .use(mplTokenMetadata());

            if(json.name == undefined){
                console.error("json.name is null");
                return;

            }

            // Get the mint Public Key
            const mintPubkey = MINTED_PUBLIC_KEY_MAP[json.name]
            console.log("Json name is", json.name)
            console.log("the mintPubkey is ", mintPubkey)

            const bs58 = require('bs58');
            const privateKeyString = SELLER_PRIVATE_KEY;
            const privateKeyBytes = new Uint8Array(bs58.decode(privateKeyString));

            const newKeypair = {
                publicKey: publicKey(sellerPublicKey),
                secretKey: privateKeyBytes
            };

            console.log("newKeyPair is:", newKeypair)
            const KeypairSigner = createSignerFromKeypair(umi,newKeypair)
            const pda = findAssociatedTokenPda(umi, {mint: publicKey(mintPubkey), owner: publicKey(sellerPublicKey) })
            const pda2 = findAssociatedTokenPda(umi, {mint: publicKey(mintPubkey), owner: publicKey(buyerPublicKey) })

            await transferV1(umi, {
                mint:  publicKey(mintPubkey),
                authority: KeypairSigner,
                token: pda,
                tokenOwner:  publicKey(sellerPublicKey),
                destinationToken:pda2,
                destinationOwner: publicKey(buyerPublicKey),
                tokenStandard: TokenStandard.NonFungible,
              }).sendAndConfirm(umi) //, {send: {skipPreflight: true}})

            console.log("transferV1 completed successfully")
        }catch(error){
            console.log(error)
        }
    }

    const armsAttribute = json.attributes?.find((a) => a.trait_type === "arms");
    const arms = armsAttribute?.value;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-black">{json.name}</h3>
      <img src={json.image} alt={json.name} />
      <p className="text-sm text-white"><span className="font-bold">Arms: </span>{arms}</p>
       <button className="bg-gray-200 text-black" onClick={purchaseNFT}>Buy</button>
    </div>
  )
}