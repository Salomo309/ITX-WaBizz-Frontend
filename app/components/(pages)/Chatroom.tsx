import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import Colors from "./../../constants/colors";
import HeaderChat from "./../HeaderChat";
import AdminChat from "./../AdminChat";
import CustomerChat from "./../CustomerChat";
import DayHolder from "./../DayHolder";
import ApiUrl from "./../../constants/api";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { useRoute } from "@react-navigation/native";
import TypeBar from "../TypeBar";
import PhotoComponent from "../PhotoComponent";
import VideoComponent from "../VideoComponent";
import UnknownFileComponent from "../UnknownFileComponent";
import messaging from '@react-native-firebase/messaging';

type ChatroomScreenRouteProp = RouteProp<RootStackParamList, "Chatroom">;

interface ChatMessageProps {
  user_id: string;
  timendate: string;
  content: string;
  status: string;
  isRead: string;
  messageType: string;
}

interface CustomerChatProps {
  key: React.Key;
  content: React.ReactNode;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  timendate,
  content,
  status,
  isRead,
  messageType,
}) => {
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

export interface ChatPreviewProps {
  id: number;
  timendate: string;
  email: string;
  content: string;
  statusRead: string;
  isRead: string | null;
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
    email: "",
    content: "Halo?",
    statusRead: "",
    isRead: "",
    messageType: "",
  },
  {
    id: 2,
    timendate: "2024-04-28 12:14:12",
    email: "",
    content: "Selamat siang, Kakak... Ada yang bisa dibanting?",
    statusRead: "",
    isRead: null,
    messageType: "",
  },
  {
    id: 3,
    timendate: "2024-05-03 12:15:29",
    email: "",
    content: "Permisi admin mw nanya",
    statusRead: "delivered",
    isRead: "",
    messageType: "",
  },
  {
    id: 4,
    timendate: "2024-05-03 12:15:29",
    email: "",
    content: "Boleh, Kak",
    statusRead: "delivered",
    isRead: null,
    messageType: "",
  },
];

const Chatroom = () => {
  const route = useRoute<ChatroomScreenRouteProp>();
  const { chatId, name, profilePic } = route.params;
  const [chats, setChats] = useState([]);
  const [email, setEmail] = useState("");
  const [chatroomID, setChatroomID] = useState<number>(0);
  const [lastDayHolderDate, setLastDayHolderDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const fetchChats = async () => {
    try {
      const response = await fetch(
        ApiUrl.concat("/chatroom?chatroomID=" + chatId),
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = `Error fetching chats: HTTP status ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Chats data: ", data);

      const chatsData = data.Chats;

      const chats = chatsData.map((chat: any) => ({
        id: chat.ChatID,
        timendate: chat.Timendate,
        email: chat.Email,
        content: chat.Content,
        statusRead: chat.StatusRead,
        isRead: chat.IsRead,
        messageType: chat.MessageType,
      }));
      chats.sort(
        (a: ChatPreviewProps, b: ChatPreviewProps) =>
          new Date(a.timendate).getTime() - new Date(b.timendate).getTime()
      );

      setChats(chats);
      setEmail(chatsData[0].Email);
      setChatroomID(chatsData[0].ChatroomID);
    } catch (error) {
      console.error("Error fetching chats: ", error);
    }
  };
  useEffect(() => {
    fetchChats();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Message received in foreground!', remoteMessage);
      await fetchChats();
    });

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('New FCM token:', token);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnTokenRefresh();
    };
  }, [chatId]);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Fetch chats data and update state
      await fetchChats();
    });
  }, []);

  const checkFileType = (fileUrl: string) => {
    // Regex pattern to match the file extension after the last dot
    const extensionRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;

    // Extract the file extension from the URL
    const match = fileUrl.match(extensionRegex);
    if (match) {
      const extension = match[1].toLowerCase();

      // Check if the extension corresponds to a photo or a video
      if (extension === "jpg" || extension === "jpeg" || extension === "png") {
        return "photo";
      } else if (
        extension === "mp4" ||
        extension === "mov" ||
        extension === "avi"
      ) {
        return "video";
      } else {
        return "unknown"; // If extension is neither photo nor video
      }
    } else {
      return "unknown"; // If no extension found
    }
  };

  const renderChatMessagesByDay = (chatData: ChatPreviewProps[]) => {
    let renderedComponents: JSX.Element[] = [];
    let currentDate = "";

    chatData.forEach((chat: ChatPreviewProps, index) => {
      const chatDate = chat.timendate.split(" ")[0];
      if (chatDate !== currentDate) {
        renderedComponents.push(
          <DayHolder day={formatTimendate(chatDate)} key={chatDate} />
        );
        currentDate = chatDate;
      }

      let highlightedContent: React.ReactNode;
      if (searchText) {
        if (highlightedIndex === index) {
          const parts = chat.content.split(new RegExp(`(${searchText})`, "gi"));
          highlightedContent = parts.map((part, index) =>
            part.toLowerCase() === searchText.toLowerCase() ? (
              <Text key={index} style={{ backgroundColor: "yellow" }}>
                {part}
              </Text>
            ) : (
              part
            )
          );
        } else {
          const parts = chat.content.split(new RegExp(`(${searchText})`, "gi"));
          highlightedContent = parts.map((part, index) =>
            part.toLowerCase() === searchText.toLowerCase() ? (
              <Text key={index} style={{ backgroundColor: "#D3D3D3" }}>
                {part}
              </Text>
            ) : (
              part
            )
          );
        }
      } else {
        highlightedContent = chat.content;
      }

      // Check message type, if it is a file, then render the view depends on the file type
      let content: React.ReactNode;
      if (chat.messageType === "file") {
        const fileType = checkFileType(chat.content);
        // Render different UI based on the file type
        if (fileType === "photo") {
          content = (
            <PhotoComponent key={chat.id} fileUrl={chat.content} time={chat.timendate} statusRead={chat.statusRead} from={(chat.isRead==null) ? "admin" : "customer"} />
          );
        } else if (fileType === "video") {
          content = (
            <VideoComponent key={chat.id} fileUrl={chat.content} time={chat.timendate} statusRead={chat.statusRead} from={(chat.isRead==null) ? "admin" : "customer"}/>
          );
        } else {
          content = (
            <UnknownFileComponent key={chat.id} fileUrl={chat.content} />
          )
        }
      } else {
        content = chat.content;
      }

      if (chat.isRead == null) {
        renderedComponents.push(
          <AdminChat
            key={chat.id}
            content={highlightedContent}
            time={chat.timendate}
            statusRead={chat.statusRead}
          />
        );
      } else {
        renderedComponents.push(
          <CustomerChat
            key={chat.id}
            content={highlightedContent}
            time={chat.timendate}
          />
        );
      }
    });

    return renderedComponents;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary1} />
      <HeaderChat
        profilePic={profilePic}
        userName={name}
        searchText={searchText}
        setSearchText={setSearchText}
        highlightedIndex={highlightedIndex} // Make sure to pass this prop
        setHighlightedIndex={setHighlightedIndex} // Make sure to pass this prop
        chats={chats}
      />
      <ScrollView style={{ backgroundColor: Colors.backgroundChat }}>
        {/**dummy data */}
        {/* {renderChatMessagesByDay(dummyChats)} */}
        {/* {dummyChats.length > 0 && renderChatMessagesByDay(dummyChats)} */}
        {dummyChats.length > 0 && renderChatMessagesByDay(chats)}
        <UnknownFileComponent 
          key={-1} 
          fileUrl="https://www.zenius.net/blog/wp-content/uploads/2015/07/stei-itb.jpg" 
          time={"2024-05-05 19:00:00"} 
          statusRead="read"
          from={"customer"}></UnknownFileComponent>
      </ScrollView>
      <View
        className="p-[20]"
        style={{ backgroundColor: Colors.backgroundChat }}
      >
        <TypeBar chatId={chatId} email={email} chatroomId={chatroomID} />
      </View>
    </SafeAreaView>
  );
};

export default Chatroom;
