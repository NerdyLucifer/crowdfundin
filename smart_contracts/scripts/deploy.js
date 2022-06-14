const main = async () => {
  const CrowdfundingContracts = await hre.ethers.getContractFactory(
    "Crowdfunding"
  );
  const crowdfundingContracts = await CrowdfundingContracts.deploy();

  await crowdfundingContracts.deployed();

  console.log("NFTContracts deployed to: ", crowdfundingContracts.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
