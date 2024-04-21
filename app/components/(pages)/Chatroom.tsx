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
        setChats(chats);
      } catch(error){
        console.error("Error fetching chats: ", error);
      }
    };

    fetchChats();
  }, []);

    const showDayHolderModal = (date: string) => {
      setLastDayHolderDate(date);
      return <DayHolder day={date}></DayHolder>;
    };
    return(
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar backgroundColor={Colors.primary1} />
        <HeaderChat profilePic={profilePic} userName={name} />
        <ScrollView backgroundColor={Colors.backgroundChat}>
          {chats && 
            chats.map((chat: ChatPreviewProps) => (
              chat.timendate.split(" ")[0] !== lastDayHolderDate && showDayHolderModal(chat.timendate.split(" ")[0]),
              chat.isRead == null ? (
                <AdminChat
                  key={chat.id}
                  content={chat.content}
                  time={chat.timendate}
                  statusRead={chat.statusRead}>
                </AdminChat>
              ) : (
                <CustomerChat
                  key={chat.id}
                  content={chat.content}
                  time={chat.timendate}>
                </CustomerChat>
              )))}
        </ScrollView>
      <TypeBar></TypeBar>
    </SafeAreaView>
    )
}

export default Chatroom;