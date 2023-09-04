"use client";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import NFTTile from "@/components/NFTTile";
import MarketplaceJSON from "@/Marketplace.json";
import { GetIpfsUrlFromPinata } from "@/utils";

export default function Marketplace() {
  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  const [data, setData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: parseInt(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    updateFetched(true);
    setData(items);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div className="flex flex-col place-items-center mt-20">
      <div className="md:text-xl font-bold text-white">Top NFTs</div>
      <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
        {data.map((value, index) => {
          return <NFTTile data={value} key={index} />;
        })}
      </div>
    </div>
  );
}
