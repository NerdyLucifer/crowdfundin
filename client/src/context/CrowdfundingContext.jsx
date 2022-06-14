import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";

export const CrowdfundingContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const CrowfundingContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return CrowfundingContract;
};

export const CrowdfundingProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [initiatives, setInitiatives] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    target: "",
    description: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts connected");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };
  const uploadInitiative = async () => {
    try {
      if (ethereum) {
        const { title, target, description } = formData;
        const CFContract = getEthereumContract();
        const parsedTarget = ethers.utils.parseEther(target);
        const gifKey = title.toLowerCase().replace(/ /g, "+");
        var gifUrl;
        setIsUploading(true);
        var gif = await fetch(
          `http://api.giphy.com/v1/gifs/search?q=${gifKey}&api_key=GgExkPaV3Ij51MjRCtgScyMRCW5DhHA0&limit=1`
        ).then((response) => response.json());
        if (gif.data[0]) {
          gifUrl = gif.data[0].images.original.url;
        }
        if (!gif.data[0]) {
          gif = await fetch(
            `http://api.giphy.com/v1/gifs/random?api_key=GgExkPaV3Ij51MjRCtgScyMRCW5DhHA0&limit=1`
          ).then((response) => response.json());
          gifUrl = gif.data.images.original.url;
        }
        const uploadHash = await CFContract.uploadInitiative(
          gifUrl,
          title,
          parsedTarget,
          description
        );
        await uploadHash.wait();
        setIsUploading(false);
        setFormData({});
        getInitiatives();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
      throw new Error("No ethereum object");
    }
  };

  const getInitiatives = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const CFContract = getEthereumContract();
      const allInitiatives = await CFContract.getAllInitiatives();
      const structuredInitiatives = allInitiatives.map((nft) => ({
        id: nft.id.toNumber(),
        owner: nft.owner.toLowerCase(),
        poster: nft.poster,
        description: nft.description,
        title: nft.title,
        target: parseInt(nft.target._hex) / 10 ** 18,
        collected: parseInt(nft.collected._hex) / 10 ** 18,
        transactions: nft.transactionsIds,
        isActive: nft.isActive,
      }));
      setInitiatives(structuredInitiatives);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };
  const deleteInitiative = async (id) => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const CFContract = getEthereumContract();
      const deleteHash = await CFContract.deleteInitiative(id);
      await deleteHash.wait();
      getInitiatives();
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const changeTarget = async (id, newTarget) => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const parsedAmount = ethers.utils.parseEther(newTarget);
      const CFContract = getEthereumContract();
      const changeTargethash = await CFContract.changeTarget(id, parsedAmount);
      await changeTargethash.wait();
      getInitiatives();
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const transfer = async (id, amount, message) => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      // console.log(typeof id);
      const CFContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: initiatives[id].owner,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await CFContract.donate(
        id,
        parsedAmount,
        message
      );
      await transactionHash.wait();
      getInitiatives();
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async (id) => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const CFContract = getEthereumContract();
      const transaction = await CFContract.getTransaction(id);
      return {
        id: transaction.transaction_id,
        from: transaction.sender,
        time: new Date(
          transaction.timestamp.toNumber() * 1000
        ).toLocaleString(),
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
        message: transaction.message,
      };
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getInitiatives();
  }, []);

  return (
    <CrowdfundingContext.Provider
      value={{
        currentAccount,
        connectWallet,
        formData,
        isUploading,
        uploadInitiative,
        handleChange,
        initiatives,
        transfer,
        getTransaction,
        deleteInitiative,
        changeTarget,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};
