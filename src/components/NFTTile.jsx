import Link from "next/link";
import Image from "next/image";

import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile({ data }) {
  const newTo = {
    pathname: "/nftPage/" + data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.image);

  return (
    <Link href={newTo}>
      <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
        <Image
          src={IPFSUrl}
          alt={data.name}
          width={72}
          height={80}
          className="w-72 h-80 rounded-lg object-cover"
        />
        <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
          <strong className="text-xl">{data.name}</strong>
          <p className="display-inline">{data.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default NFTTile;
