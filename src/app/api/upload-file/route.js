import axios from "axios";
import { NextResponse } from "next/server";

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

export async function POST(request) {
  const JSONBody = await request.formData();
  // console.log(JSONBody);
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  try {
    const res = await axios.post(url, JSONBody, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${JSONBody._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    });
    console.log("image uploaded", res.data.IpfsHash);
    const data = {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
