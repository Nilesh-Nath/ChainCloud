import { Button, Data } from "web3uikit";
import { ethers } from "ethers";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import axios from "axios";
import contractAddress from "../constants/contractAddress.json";
import { abi } from "../constants/index";
import { useNotification } from "web3uikit";

export default function Upload() {
  const { isWeb3Enabled, account, chainId: chainIdHex, web3 } = useMoralis();
  const [file, setFile] = useState(null);
  const [_url, _setUrl] = useState("");
  const chainId = parseInt(chainIdHex);
  const chainCloudAddress =
    chainId in contractAddress ? contractAddress[chainId]["0"] : null;
  const dispatch = useNotification();

  const { runContractFunction: upload } = useWeb3Contract({
    abi: abi,
    contractAddress: chainCloudAddress,
    functionName: "upload",
    params: {
      _url,
    },
  });

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewSuccess(tx);
  };

  const handleNewSuccess = () => {
    dispatch({
      type: "info",
      message: "Data Uploaded To Blockchain!",
      title: "Transaction Notification!",
      position: "topR",
    });
  };

  useEffect(() => {
    if (_url !== "") {
      (async () => {
        try {
          console.log("Uploading to Blockchain....");

          await upload({
            onSuccess: handleSuccess,
            onError: (e) => {
              // Check if the error is due to user canceling the transaction
              if (e?.code === 4001) {
                console.log("Transaction canceled by the user.");
                return;
              }

              console.error(e);
            },
          });
        } catch (error) {
          console.error(error);
          alert("Unable to upload file to Pinata!");
        }
      })();
    }
  }, [_url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `9a6f7ffb1aa4961146b4`,
            pinata_secret_api_key: `10eb280b8b8387558155120fc955d077edaddc7283f4722fd7e2563961871868`,
            "Content-Type": "multipart/form-data",
          },
        });
        const fileURL = `ipfs://${resFile.data.IpfsHash}`;
        console.log("Uploaded!");
        _setUrl(fileURL);

        console.log("Uploading to Blockchain....");
        console.log(_url);
      } catch (error) {
        console.error(error);
        alert("Unable to upload file to Pinata!");
      }
    }
  };

  const retrieveFile = async (e) => {
    const data = e.target.files[0];
    if (data && data instanceof Blob) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(e.target.files[0]);
      };
      e.preventDefault();
    }
  };

  return isWeb3Enabled ? (
    <div>
      <div className="flex flex-col items-center">
        <form
          // onSubmit={handleSubmit}
          className="flex flex-col w-1/2 h-1/2 m-auto items-center"
        >
          <label
            htmlFor="file-select"
            className="font-medium text-2xl mb-10 h-10 mt-20 "
          >
            Select The File you want to Upload :
          </label>
          <input
            type="file"
            id="file-select"
            onChange={retrieveFile}
            className="rounded-2xl border-2 border-violet-500 mb-10 bg-gray-700 hover:bg-gray-600 cursor-pointer active:bg-gray-700 focus:outline-none focus:ring focus:ring-violet-300"
          />
          <Button text="Upload" theme="primary" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center m-auto min-w-full min-h-screen">
      <h1 className="font-mainFont font-bold text-3xl mb-4">
        Sorry, Web3 Not Enabled! 😟
      </h1>
      <p>Please connect your wallet or install Metamask!</p>
    </div>
  );
}
