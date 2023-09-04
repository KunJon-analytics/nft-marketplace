import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `${BASE_URL}/upload-json`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, { headers: { "Content-Type": "application/json" } })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadFileToIPFS = async (file) => {
  const url = `${BASE_URL}/upload-file`;
  //making axios POST request to Pinata ⬇️

  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
    .then(function (response) {
      console.log("response: ", response);
      console.log("image uploaded", response.data.pinataURL);
      if (!response.data.success) {
        return {
          success: false,
          message: error.message,
        };
      }
      return response.data;
    });
};
