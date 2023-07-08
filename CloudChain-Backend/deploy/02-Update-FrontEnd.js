const fs = require("fs");
const { ethers, network } = require("hardhat");
const { abiPath, addressPath } = require("../helper.hardhat");

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating Frontend....");
    await updateAddress();
  }
};

async function updateAddress() {
  const chainCloud = await ethers.getContract("ChainCloud");
  const currentAddress = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
  if (network.config.chainId.toString() in currentAddress) {
    if (
      !currentAddress[network.config.chainId.toString()].includes(
        await chainCloud.getAddress()
      )
    ) {
      currentAddress[network.config.chainId.toString()].push(
        await chainCloud.getAddress()
      );
    }
  } else {
    currentAddress[network.config.chainId.toString()] = [
      await chainCloud.getAddress(),
    ];
  }

  fs.writeFileSync(addressPath, JSON.stringify(currentAddress));
}

module.exports.tags = ["all", "frontend"];
