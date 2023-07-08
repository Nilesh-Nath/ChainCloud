const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const chainId = network.config.chainId;
  const args = [];

  log("Deploying ChainCloud....");
  const chainCloud = await deploy("ChainCloud", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations,
  });

  if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(chainCloud.address, args);
  }
};

module.exports.tags = ["all", "cloudchain"];
