"use client";

import echo from "@/lib/echo";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth-context";
import { MessageType } from "@/app/(views)/chats/[id]/page";
import { usePathname } from "next/navigation";

type MessageRecordType = {
  login_id: number;
  last_message: string;
  message_count: number;
};

type ChatContextType = {
  messageRecords: MessageRecordType[];
  setMessageRecords: Dispatch<SetStateAction<MessageRecordType[]>>;
  messageReceivedCount: number;
  setMessageReceivedCount: Dispatch<SetStateAction<number>>;
  newMessage: MessageType | null;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messageRecords, setMessageRecords] = useState<MessageRecordType[]>([]);
  const [messageReceivedCount, setMessageReceivedCount] = useState<number>(0);
  const [newMessage, setNewMessage] = useState<MessageType | null>(null);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (!echo || !user) return;
    const channelName = `chats.${user?.login_id}`;

    echo.private(channelName).listen("ChatEvent", (e: any) => {
      setNewMessage(e.message);

      setMessageRecords((prev) => {
        const id = e.message.sender_id;

        const existingItem = prev.findIndex((record) => record.login_id === id);

        if (existingItem !== -1) {
          return prev.map((record, index) =>
            index === existingItem
              ? {
                  ...record,
                  message_count: record.message_count + 1,
                  last_message: e.message.body,
                }
              : record,
          );
        }

        return [
          ...prev,
          {
            login_id: id,
            last_message: e.message.body,
            message_count: 1,
          },
        ];
      });

      if (!pathname.startsWith("/chats")) {
        setMessageReceivedCount((prev) => prev + 1);
      }
    });

    return () => {
      echo.leave(`private-${channelName}`);
    };
  }, [echo, user, pathname]);

  return (
    <ChatContext.Provider
      value={{
        messageRecords,
        setMessageRecords,
        messageReceivedCount,
        setMessageReceivedCount,
        newMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextType {
  const ctx = useContext(ChatContext);

  if (!ctx) {
    throw new Error("useChat must be within ChatProvider");
  }

  return ctx;
}
