
import axios from "axios";
import React, { useEffect, useState } from "react";



const Hero = () => {
    const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [message, setmessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAirdropRequest = async () => {
    // Placeholder for API call
    setmessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/airdrop", {
        wallet_address: walletAddress,
        amount: amount,
      });

      setmessage(
        `Airdrop successful! TxHash: ${response.data.transaction_hash}`
      );
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setmessage("Airdrop failed. Please try again later.");
      }
    }
  };
  return (
    <>
     <div className=" container mx-auto flex flex-col md:gap-20 md:flex-row w-full text-justify ">
        {/* Left Side: Project Description */}
        <div className="flex-1 rounded-lg m-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            About This Project
          </h2>
          <p className="mb-4 text-gray-600">
            This Solana Faucet allows users to request free SOL tokens for
            testing on the Devnet. It's simple, fast, and available for
            developers building on Solana.
          </p>

          <ul className="list-disc ml-6 text-gray-800">
            <li className="mb-2">
              <span className="font-semibold">Wallet Address Input:</span> Users
              can provide their Solana wallet address to request an airdrop.
            </li>
            <li className="mb-2">
              <span className="font-semibold">Airdrop SOL on Devnet:</span> The
              app interacts with the Solana Devnet to transfer SOL to the given
              address.
            </li>
            <li className="mb-2">
      <span className="font-semibold">Request Limit:</span> Each user is limited to a maximum of 2 requests per hour to prevent abuse.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Real-Time Feedback:</span> Success or error messages are shown to users after each airdrop request.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Transaction Hash Display:</span> After a successful airdrop, the transaction hash is displayed for reference.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Backend Validation:</span> The backend ensures requests are valid and throttles users exceeding the allowed limit.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Built with Go and MongoDB:</span> The backend API is developed using Go, and MongoDB is used to track requests and limits.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Frontend with React and Tailwind CSS:</span> The frontend is created using React and styled with Tailwind CSS for a modern, responsive design.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Cross-Platform:</span> The app is accessible from both desktop and mobile devices, ensuring a seamless experience.
    </li>
    <li className="mb-2">
      <span className="font-semibold">Development Purpose Only:</span> This faucet is for testing on the Solana Devnet, not for distributing mainnet SOL.
    </li>
          </ul>
        </div>
    
    
        {/* Right Side: Airdrop Request Form */}
        <div className="flex-1  bg-gray-800 p-4 rounded-lg shadow-lg m-2 text-white ">
          <h2 className="text-2xl font-semibold mb-4">Request Airdrop</h2>
          <p className="text-sm mb-4">Maximum of 2 requests per hour</p>

          <div className="mb-4">
            <label htmlFor="walletAddress" className="block mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full p-2 text-black rounded"
              placeholder="Enter your wallet address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 text-black rounded"
              placeholder="Enter amount of SOL"
            />
          </div>

          <button
            onClick={handleAirdropRequest}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-bold mt-4"
          >
            Confirm Airdrop
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
          {message && (
            <p className="text-green-500 text-center text-center mt-4">
              Airdrop successful!
            </p>
          )}

        <div className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-2">Unlock a Higher Airdrop Limit</h2>
        <p className="mb-4">Sign in with your GitHub account to unlock a higher airdrop limit</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-bold">
          Connect your Github
        </button>
      </div>


        </div>
     
    </div>
    </>
  )
}

export default Hero