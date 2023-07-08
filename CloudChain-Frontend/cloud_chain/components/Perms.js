import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { Button, useNotification } from "web3uikit";
import { useEffect, useState } from "react";

export default function Perms() {
  const { account, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const chainCloudAddress =
    chainId in contractAddress ? contractAddress[chainId]["0"] : null;
  const [_user, _setUser] = useState("");
  const [revokePermAddress, setRevokePermAddress] = useState("");
  const dispatch = useNotification();

  const { runContractFunction: permsAllow } = useWeb3Contract({
    abi: abi,
    contractAddress: chainCloudAddress,
    functionName: "permsAllow",
    params: {
      _user,
    },
  });

  const { runContractFunction: permsRevoke } = useWeb3Contract({
    abi: abi,
    contractAddress: chainCloudAddress,
    functionName: "permsRevoke",
    params: {
      _user: revokePermAddress,
    },
  });

  useEffect(() => {
    handlePermsFunction();
  }, [_user]);

  useEffect(() => {
    handlePermsRevokeFunction();
  }, [revokePermAddress]);

  async function handlePermsFunction() {
    try {
      if (_user) {
        await permsAllow({
          onSuccess: handlePermsGrantSuccess,
          onError: (e) => {
            console.log(e);
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePermsRevokeFunction() {
    try {
      if (revokePermAddress) {
        await permsRevoke({
          onSuccess: handlePermsRevokeSuccess,
          onError: (e) => {
            console.error(e);
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handlePermsGrantSuccess = async (tx) => {
    await tx.wait(1);
    handleNewPermsGrantSuccess(tx);
  };

  const handleNewPermsGrantSuccess = () => {
    dispatch({
      type: "info",
      message: "Perms Granted!",
      title: "Transaction Notification!",
      position: "topR",
    });
  };

  const handlePermsRevokeSuccess = async (tx) => {
    await tx.wait(1);
    handleNewPermsRevokeSuccess();
  };

  const handleNewPermsRevokeSuccess = () => {
    dispatch({
      type: "info",
      message: "Perms Revoked!",
      title: "Transaction Notification!",
      position: "topR",
    });
  };

  const handlePerms = async () => {
    const address = document.getElementById("address").value;
    _setUser(address);
  };

  const handlePermsRevoke = async () => {
    const revokeAddress = document.getElementById("revokeAddress").value;
    setRevokePermAddress(revokeAddress);
  };

  return (
    <div>
      <div className=" w-full flex items-center justify-center flex-row ">
        <div className="  flex flex-col items-center mt-20 border-r-2 border-purple-200 pr-20">
          <label htmlFor="address" className="font-medium text-2xl mb-10 h-10">
            Grant Permission for your File:
          </label>
          <input
            id="address"
            className="w-96 h-7 rounded-xl p-4 mt-2 mb-8 border-2 border-violet-500 bg-gray-700"
            type="text"
            placeholder="Enter the Address whome you want to grant Permission of your data...."
          />
          <Button text="Grant" theme="primary" onClick={handlePerms} />
        </div>

        <div className="  flex flex-col items-center mt-20  pl-20">
          <label
            htmlFor="revokeAddress"
            className="font-medium text-2xl mb-10 h-10"
          >
            Revoke Permission for your File:
          </label>
          <input
            id="revokeAddress"
            className="w-96 h-7 rounded-xl p-4 mt-2 mb-8 border-2 border-violet-500 bg-gray-700"
            type="text"
            placeholder="Enter the Address whose permission you want to Revoke...."
          />
          <Button text="Revoke" theme="primary" onClick={handlePermsRevoke} />
        </div>
      </div>
    </div>
  );
}
