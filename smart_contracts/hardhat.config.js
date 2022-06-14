// https://eth-goerli.alchemyapi.io/v2/r-yZDLyRg7qqDw54DHu_2VDKsSknOaPR
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/r-yZDLyRg7qqDw54DHu_2VDKsSknOaPR",
      accounts: ["6085760876a9f958342e4f7bca642db60bac11bcba3bef35f5fb83380cde4459"],
    },
  },
};
