import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { Button } from "web3uikit";
import { useEffect, useState } from "react";

export default function DisplayPerms() {
  const { account, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const chainCloudAddress =
    chainId in contractAddress ? contractAddress[chainId]["0"] : null;
  const [addressWithPerms, setAddressWithPerms] = useState([]);
  const [data, setData] = useState("");

  const { runContractFunction: showAccess } = useWeb3Contract({
    abi: abi,
    contractAddress: chainCloudAddress,
    functionName: "showAccess",
    params: {},
  });

  useEffect(() => {
    updateUi();
  }, [addressWithPerms]);

  async function updateUi() {
    const address = addressWithPerms?.map((entry, index) => {
      const userAddress = entry[0];
      let hasAccess = entry[1].toString();
      hasAccess == "true" ? (hasAccess = "Yes") : (hasAccess = "No");
      console.log(hasAccess);

      return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between mb-4">
            <div>Users</div>
            <div>Has Access</div>
          </div>
          <div key={index} className="mb-5">
            <li className="list-disc">
              {userAddress} | {hasAccess}
            </li>
          </div>
        </div>
      );
    });
    console.log(address);
    setData(address);
  }

  const getAccessedUser = async () => {
    let addresses;
    try {
      addresses = await showAccess({
        onSuccess: () => {
          console.log("Success!");
        },
        onError: (e) => {
          console.error(e);
        },
      });
    } catch (error) {
      console.log(error);
    }

    setAddressWithPerms(addresses);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="font-medium text-2xl mb-10 h-10 mt-20">
          Get Users that have permission over your data:
        </h1>
        <Button
          theme="primary"
          text="Access"
          onClick={getAccessedUser}
        ></Button>
        <div className="mb-20"></div>
        <div>{data}</div>
      </div>
    </div>
  );
}
