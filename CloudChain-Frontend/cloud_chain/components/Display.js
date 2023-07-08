import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { Button } from "web3uikit";
import { useState, useEffect } from "react";

export default function Display() {
  const { account, chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const chainCloudAddress =
    chainId in contractAddress ? contractAddress[chainId]["0"] : null;
  const [_owner, _setOwner] = useState(null);
  const [data, setData] = useState("");

  const { runContractFunction: displayData } = useWeb3Contract({
    abi: abi,
    contractAddress: chainCloudAddress,
    functionName: "displayData",
    params: {
      _owner,
    },
  });

  useEffect(() => {
    callDisplay();
  }, [_owner]);

  async function callDisplay() {
    console.log("Fetching....");
    let dataArray;
    if (_owner !== null) {
      try {
        dataArray = await displayData({
          onSuccess: () => {
            console.log("Fetched!");
          },
          onError: (error) => {
            alert(error);
            console.error(error);
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    setData(dataArray);
    console.log(dataArray);
    const images = dataArray?.map((item, i) => {
      return (
        <div>
          <div>
            <a href={item} key={i} target="_blank">
              <img
                className="border-2 border-white rounded-xl m-4"
                key={i}
                src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                alt="Preview not available , Please click here to see data!"
                width={200}
                height={200}
              ></img>
            </a>
          </div>
        </div>
      );
    });
    setData(images);
  }

  const getData = async () => {
    const addressOfData = document.getElementById("address").value;
    _setOwner(addressOfData);
  };

  return isWeb3Enabled ? (
    <div className="h-screen">
      <div className=" w-full flex flex-col items-center">
        <label
          htmlFor="address"
          className="font-medium text-2xl mb-10 h-10 mt-10"
        >
          Retrieve Files
        </label>
        <input
          id="address"
          className="w-96 h-7 rounded-xl p-4 mt-2 mb-8 border-2 border-violet-500 bg-gray-700"
          type="text"
          placeholder="Enter the Address whose data you want to retrieve...."
        />
        <Button text="Retrieve" theme="primary" onClick={getData} />
      </div>
      <h1 className="font-medium text-2xl mb-10 h-10 mt-10 ml-10">
        Your Data :
      </h1>
      {data ? (
        <div className="flex flex-wrap mt-10">{data}</div>
      ) : (
        <div className="dont-bold text-2xl mb-10 h-10 mt-10 ml-10">
          Oops ! No data to show ! 😣
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center m-auto min-w-full min-h-screen">
      <h1 className="font-mainFont font-bold text-3xl mb-4">
        Sorry, Web3 Not Enabled 😟
      </h1>
      <p>Please connect your wallet or install Metamask!</p>
    </div>
  );
}
