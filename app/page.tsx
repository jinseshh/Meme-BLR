"use client";

import { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import {
  Avatar,
  Badge,
  List,
  Cell,
  Section,
  ButtonCell,
} from "@telegram-apps/telegram-ui";

const colors = [
  { name: "Light Yellow", hex: "#FFFFE0", rgb: "rgb(255, 255, 224)" },
  { name: "Light Pink", hex: "#FFB6C1", rgb: "rgb(255, 182, 193)" },
  { name: "Light Blue", hex: "#ADD8E6", rgb: "rgb(173, 216, 230)" },
  { name: "Light Green", hex: "#90EE90", rgb: "rgb(144, 238, 144)" },
  { name: "Lavender", hex: "#E6E6FA", rgb: "rgb(230, 230, 250)" },
  { name: "Pale Goldenrod", hex: "#EEE8AA", rgb: "rgb(238, 232, 170)" },
  { name: "Misty Rose", hex: "#FFE4E1", rgb: "rgb(255, 228, 225)" },
  { name: "Peach Puff", hex: "#FFDAB9", rgb: "rgb(255, 218, 185)" },
  { name: "Honeydew", hex: "#F0FFF0", rgb: "rgb(240, 255, 240)" },
  { name: "Light Salmon", hex: "#FFA07A", rgb: "rgb(255, 160, 122)" },
  { name: "SeaShell", hex: "#FFF5EE", rgb: "rgb(255, 245, 238)" },
  { name: "Thistle", hex: "#D8BFD8", rgb: "rgb(216, 191, 216)" },
  { name: "Light Coral", hex: "#F08080", rgb: "rgb(240, 128, 128)" },
  { name: "Pale Turquoise", hex: "#AFEEEE", rgb: "rgb(175, 238, 238)" },
  { name: "Lavender Blush", hex: "#FFF0F5", rgb: "rgb(255, 240, 245)" },
];

const statuses = ["joined", "new", "created"];

const dummyData = [
  {
      id: "1a2b3c4d5e6f7g8h9i",
      title: "Community Governance",
      subtitle: "Participate in community decisions",
      buttonLabel: "Vote Now",
      buttonMode: "primary",
      color: colors[Math.floor(Math.random() * colors.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
      id: "2a3b4c5d6e7f8g9h1j",
      title: "My Wallet",
      subtitle: "Manage your crypto assets and balances",
      buttonLabel: "View Wallet",
      buttonMode: "secondary",
      color: colors[Math.floor(Math.random() * colors.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
      id: "3a4b5c6d7e8f9g1h2k",
      title: "Staking Options",
      subtitle: "Earn rewards by staking your tokens",
      buttonLabel: "Stake Tokens",
      buttonMode: "primary",
      color: colors[Math.floor(Math.random() * colors.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
      id: "4a5b6c7d8e9f1g2h3l",
      title: "Help Center",
      subtitle: "Get support and find answers about Web3",
      buttonLabel: "Visit Help Center",
      buttonMode: "secondary",
      color: colors[Math.floor(Math.random() * colors.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
      id: "5a6b7c8d9e1f2g3h4m",
      title: "Community Events",
      subtitle: "Join upcoming events and meetups",
      buttonLabel: "See Events",
      buttonMode: "primary",
      color: colors[Math.floor(Math.random() * colors.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
      id: "6a7b8c9d1e2f3g4h5n",
      title: "Tokenomics Overview",
      subtitle: "Understand our token distribution and utility",
      buttonLabel: "View Tokenomics",
      buttonMode: "secondary",
      color: colors[Math.floor(Math.random() * colors.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
  }
];

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 20); // Generates a random alphanumeric string of length ~18
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-col items-center justify-center">
      {tonWalletAddress ? (
        <div className="min-h-[40px] bg-blue-800 flex flex-row justify-between px-4">
          <Avatar
            size={28}
            className="my-auto"
            src="https://avatars.githubusercontent.com/u/84640980?v=4"
          />
          <div className="flex flex-row">
            <div className="mt-[10px]">
              <Badge mode="white" type="dot" />
            </div>
            <p className="text-white mt-2">
              {tonWalletAddress ? formatAddress(tonWalletAddress) : "Address"}
            </p>
          </div>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white py-auto px-2 text-sm h-6 mt-2 rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="flex-col items-center justify-center">
        {tonWalletAddress ? ( 
          <div className="mb-6">
            {/* joined */}
          <div>
            <h2 className="mt-4 ml-4 text-lg font-bold -mb-6">
           Joined Communities
            </h2>
            <div className="flex flex-row items-center overflow-x-scroll">
              {dummyData
                .filter((item) => item.status === "joined") 
                .map((item) => (
                  <List
                    key={item.id} 
                    style={{
                      background: item.color.hex,
                      padding: 6,
                    }}
                    className="mt-8 mx-2 w-[60vw]"
                  >
                    <Section>
                      <Cell subtitle={item.subtitle} className="h-[120px]">
                        {item.title}
                      </Cell>
                      <ButtonCell mode={"default"} 
                      Component="a"
                      href="./community"
                      >
                     View
                      </ButtonCell>{" "}
                    </Section>
                  </List>
                ))}
            </div>
          </div>

          {/* created */}
          <div>
            <h2 className="mt-4 ml-4 text-lg font-bold -mb-6">
              Created Communities
            </h2>
            <div className="flex flex-row items-center overflow-x-scroll">
              {dummyData
                .filter((item) => item.status === "created") 
                .map((item) => (
                  <List
                    key={item.id} 
                    style={{
                      background: item.color.hex,
                      padding: 6,
                    }}
                    className="mt-8 mx-2 w-[60vw]"
                  >
                    <Section>
                      <Cell subtitle={item.subtitle} className="h-[120px]">
                        {item.title}
                      </Cell>
                      <ButtonCell mode="default">
                      View 
                      </ButtonCell>{" "}
                    </Section>
                  </List>
                ))}
            </div>
          </div>

          {/* join */}
          <div>
            <h2 className="mt-4 ml-4 text-lg font-bold -mb-6">
              Join Communities
            </h2>
            <div className="flex flex-row items-center overflow-x-scroll">
              {dummyData
                .filter((item) => item.status === "new") 
                .map((item) => (
                  <List
                    key={item.id} 
                    style={{
                      background: item.color.hex,
                      padding: 6,
                    }}
                    className="mt-8 mx-2 w-[60vw]"
                  >
                    <Section>
                      <Cell subtitle={item.subtitle} className="h-[120px]">
                        {item.title}
                      </Cell>
                      <ButtonCell mode="default">
                        Join
                      </ButtonCell>{" "}
                    </Section>
                  </List>
                ))}
            </div>
          </div>

          </div>
        ) : (
          <div className="flex flex-col w-[50%] mx-auto my-[30vh]">
          <button
            onClick={handleWalletAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect TON Wallet
          </button>
          </div>
        )}
      </div>
    </main>
  );
}
