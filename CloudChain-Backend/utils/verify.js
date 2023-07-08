const { run } = require("hardhat");

async function verify(contractAddress, args) {
  try {
    console.log("Verifying....");
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("Already Verified!")) {
      console.log("Already Verified!");
    } else {
      console.error(error);
    }
  }
}

module.exports = {
  verify,
};
