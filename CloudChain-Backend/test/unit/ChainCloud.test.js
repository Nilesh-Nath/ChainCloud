const { network, ethers, deployments } = require("hardhat");
const { expect, assert } = require("chai");
const chainId = network.config.chainId;

chainId == 31337
  ? describe("CloudChain", () => {
      let deployer, chainCloud, user, user1, userConnectedChainCloud;
      const url = "ipfs://exampleURL";
      beforeEach(async () => {
        const accounts = await ethers.getSigners();
        deployer = accounts[0].address;
        user = accounts[1].address;
        user1 = accounts[2].address;
        await deployments.fixture(["all"]);
        chainCloud = await ethers.getContract("ChainCloud", deployer);
        userConnectedChainCloud = await ethers.getContract("ChainCloud", user);
      });

      describe("Upload", () => {
        it("It throws an error if the url is empty!", async () => {
          await expect(chainCloud.upload("")).to.be.revertedWithCustomError(
            chainCloud,
            "ChainCloud__EmptyURL()"
          );
        });

        it("It should push the url of the file to the Array!", async () => {
          const tx = await chainCloud.upload(url);
          await tx.wait(1);
          const data = await chainCloud.displayData(deployer);
          expect(data).to.have.lengthOf(1);
          assert.equal(url, data);
        });

        it("It should emit an event after the URL is pushed !", async () => {
          await expect(chainCloud.upload(url)).to.emit(
            chainCloud,
            "DataUploaded"
          );
        });
      });

      describe("PermsAllow", () => {
        it("It should grant the permission to access data !", async () => {
          const tx = await chainCloud.permsAllow(user);
          await tx.wait(1);

          const accessList = await chainCloud.showAccess();
          expect(accessList).to.have.lengthOf(1);
          assert.equal(accessList[0].user, user);
          assert.equal(accessList[0].access, true);
        });

        it("It should emit an event after the permission is granted!", async () => {
          await expect(chainCloud.permsAllow(user)).to.emit(
            chainCloud,
            "PermsGranted"
          );
        });
      });

      describe("PermsRevoke", () => {
        it("It should revoke the access !", async () => {
          await chainCloud.permsAllow(user);
          const tx = await chainCloud.permsRevoke(user);
          await tx.wait(1);
          const accessList = await chainCloud.showAccess();
          assert.equal(accessList[0].user, user);
          assert.equal(accessList[0].access, false);
        });

        it("It should emit an event after the access is Revoked!", async () => {
          await expect(chainCloud.permsRevoke(user)).to.emit(
            chainCloud,
            "PermsRevoked"
          );
        });
      });

      describe("displayData", () => {
        it("It should allow owner to access there data!", async () => {
          const tx = await chainCloud.upload(url);
          await tx.wait(1);
          const data = await chainCloud.displayData(deployer);
          assert.equal(data[0], url);
        });

        it("It should allow allowed users to access data!", async () => {
          const tx = await chainCloud.upload(url);
          await tx.wait(1);
          await chainCloud.permsAllow(user);
          const data = await userConnectedChainCloud.displayData(deployer);
          assert.equal(data[0], url);
        });

        it("It should not allow user without permission to access owner's data!", async () => {
          const tx = await chainCloud.upload(url);
          await tx.wait(1);
          await expect(
            userConnectedChainCloud.displayData(deployer)
          ).to.be.revertedWith(
            "Sorry!You Don't Have Permission to Access Data :( !"
          );
        });

        it("It should not allowed user to access another 3rd person's data whose perms are not granted!", async () => {
          const tx = await chainCloud.upload(url);
          await tx.wait(1);
          await chainCloud.permsAllow(user);
          await expect(
            userConnectedChainCloud.displayData(user1)
          ).to.be.revertedWith(
            "Sorry!You Don't Have Permission to Access Data :( !"
          );
        });
      });
    })
  : describe.skip;
