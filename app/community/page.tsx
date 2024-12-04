"use client";

import { useState } from "react";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";

export default function Home() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prev) => [
        ...prev,
        { user: "1a2b3c4d5e6f7g8h9i" , text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

        <div className="w-full max-w-md">
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
              CommunityX
              </p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-auto px-2 text-sm h-6 mt-2 rounded"
            >
              Disconnect
            </button>
          </div>
          <div className="min-h-[90vh] bg-gray-100 p-4 rounded-lg mt-4">
            <div className="h-[80vh] overflow-y-scroll bg-white rounded-lg p-4 shadow-inner">
              {messages.map((message, index) => (
                <div key={index} className="mb-4 bg-red-200 mx-2 rounded-r-2xl rounded-t-2xl">
                    <div className="flex flex-row pl-2">
                    <Avatar
                    size={28}
                    className="my-auto mr-4"
                    src="https://avatars.githubusercontent.com/u/84640980?v=4"
                    />
                    <div>
                    <p><strong className="text-xs">{message.user}</strong></p>
                    <p>{message.text}</p>
                    </div>
                    </div>
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded-l-lg"
                placeholder="Type a message"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      
    </main>
  );
}
