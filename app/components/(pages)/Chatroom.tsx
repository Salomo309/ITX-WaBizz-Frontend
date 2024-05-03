import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Colors from "./../../constants/colors";
import HeaderChat from "./../HeaderChat";
import AdminChat from "./../AdminChat";
import CustomerChat from "./../CustomerChat";
import DayHolder from "./../DayHolder";
import ApiUrl from "./../../constants/api";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "App";
import {useRoute} from "@react-navigation/native"
import TypeBar from "../TypeBar";

type ChatroomScreenRouteProp = RouteProp<RootStackParamList, 'Chatroom'>;

interface ChatMessageProps {
    user_id: string;
    timendate: string;
    content: string;
    status: string;
    isRead: string;
    messageType: string;
  }

const ChatMessage: React.FC<ChatMessageProps> = ({ timendate, content, status, isRead, messageType }) => {
    return (
      <View>
        <Text>{messageType}</Text>
        <Text>{content}</Text>
        <Text>{status}</Text>
        <Text>{isRead}</Text>
        <Text>{timendate}</Text>
      </View>
    );
  };

interface ChatPreviewProps{
  id: number,
  timendate: string;
  content: string;
  statusRead: string;
  isRead: string;
  messageType: string;
}

const formatTimendate = (timestamp: string | number) => {
  const date = new Date(timestamp);
  const now = new Date();

  const isYesterday = (date: Date) => {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === now.toDateString();
  };

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
};

// dummy data
const dummyChats: ChatPreviewProps[] = [
  {
    id: 1,
    timendate: "2024-04-28 12:14:12",
    content: "Halo?",
    statusRead: "",
    isRead: "",
    messageType: "",
  },
  {
    id: 2,
    timendate: "2024-04-28 12:14:12",
    content: "Selamat siang, Kakak... Ada yang bisa dibanting?",
    statusRead: "",
    isRead: null,
    messageType: "",
  },
  {
    id: 3,
    timendate: "2024-05-03 12:15:29",
    content: "Permisi admin mw nanya",
    statusRead: "delivered",
    isRead: "",
    messageType: "",
  },
  {
    id: 4,
    timendate: "2024-05-03 12:15:29",
    content: "Boleh, Kak",
    statusRead: "delivered",
    isRead: null,
    messageType: "",
  },
];

const Chatroom = () =>{
  const route = useRoute<ChatroomScreenRouteProp>();
  const {chatId, name, profilePic} = route.params;
  const [chats, setChats] = useState([]);
  const [lastDayHolderDate, setLastDayHolderDate] = useState("");
  useEffect(() => {
    const fetchChats = async() => {
      try{
        const response = await fetch(ApiUrl.concat("/chatroom?chatroomID="+chatId), {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok){
          const errorMessage = `Error fetching chats: HTTP status ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Chats data: ", data);

        const chatsData = data.Chats;

        const chats = chatsData.map((chat: any) => (
          {
            id: chat.ChatID,
            timendate: chat.Timendate,
            content: chat.Content,
            statusRead: chat.StatusRead,
            isRead: chat.IsRead,
            messageType: chat.MessageType,
          })
        );
        chats.sort((a, b) => new Date(a.timendate).getTime() - new Date(b.timendate).getTime());

        setChats(chats);
      } catch(error){
        console.error("Error fetching chats: ", error);
      }
    };

    fetchChats();
  }, []);

    const renderChatMessagesByDay = (chatData: ChatPreviewProps[]) => {
      let renderedComponents: JSX.Element[] = [];
      let currentDate = "";
  
      chatData.forEach((chat: ChatPreviewProps) => {
        const chatDate = chat.timendate.split(" ")[0];
        if (chatDate !== currentDate) {
          renderedComponents.push(
            <DayHolder day={formatTimendate(chatDate)}></DayHolder>
          );
          currentDate = chatDate;
        }
  
        if (chat.isRead == null) {
          renderedComponents.push(
            <AdminChat
              key={chat.id}
              content={chat.content}
              time={chat.timendate}
              statusRead={chat.statusRead}
            />
          );
        } else {
          renderedComponents.push(
            <CustomerChat
              key={chat.id}
              content={chat.content}
              time={chat.timendate}
            />
          );
        }
      });
  
      return renderedComponents;
    };

    return(
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar backgroundColor={Colors.primary1} />
        <HeaderChat profilePic={profilePic} userName={name} />
        <ScrollView backgroundColor={Colors.backgroundChat}>
          {/**dummy data */}
          {/* {renderChatMessagesByDay(dummyChats)} */}
          {dummyChats.length > 0 && renderChatMessagesByDay(dummyChats)}
          {dummyChats.length > 0 && renderChatMessagesByDay(chats)}
        </ScrollView>
        <View className="p-[20]" backgroundColor={Colors.backgroundChat}>
          <TypeBar></TypeBar>
        </View>
    </SafeAreaView>
    )
}

export default Chatroom;