import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Hero from "./component/Hero";
import Footer from "./component/Footer";

const App: React.FC = () => {
  

  return (
 

    <div className=" max-h-screen mt-24  lg:mt-2 w-full flex flex-col items-center justify-center bg-white ">
      <header className="text-center flex flex-col lg:flex-row justify-center items-center ">
        <img
          src="./airdrop1.png"
          alt="Project Illustration"
          className="w-32 mt-4 h-32 rounded-lg animate-bounce delay-150  "
        />
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 ">
            {" "}
            <span className="text-purple-700">Solana</span>Faucet Airdrop
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-600">
            Get free SOL on Devnet for testing and development
          </p>
        </div>
      </header>
      {/* max-w-6xl mx-auto mb-12 space-y-6 md:space-y-0 */}
        <Hero/>
        <Footer/>
    

     
    </div>
  );
};

export default App;
