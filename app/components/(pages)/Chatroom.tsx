import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import Colors from "./../../constants/colors";
import HeaderChat from "./../HeaderChat";
import AdminChat from "./../AdminChat";
import CustomerChat from "./../CustomerChat";
import DayHolder from "./../DayHolder";
import { API_URL } from "@env";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { useRoute } from "@react-navigation/native";
import TypeBar from "../TypeBar";
import PhotoComponent from "../PhotoComponent";
import VideoComponent from "../VideoComponent";
import UnknownFileComponent from "../UnknownFileComponent";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ChatroomScreenRouteProp = RouteProp<RootStackParamList, "Chatroom">;

interface ChatMessageProps {
    user_id: string;
    timendate: string;
    content: string;
    status: string;
    isRead: string;
    messageType: string;
    file: any;
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
    file: any;
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
        file: null,
    },
    {
        id: 2,
        timendate: "2024-04-28 12:14:12",
        email: "",
        content: "Selamat siang, Kakak... Ada yang bisa dibanting?",
        statusRead: "",
        isRead: null,
        messageType: "",
        file: null,
    },
    {
        id: 3,
        timendate: "2024-05-03 12:15:29",
        email: "",
        content: "Permisi admin mw nanya",
        statusRead: "delivered",
        isRead: "",
        messageType: "",
        file: null,
    },
    {
        id: 4,
        timendate: "2024-05-03 12:15:29",
        email: "",
        content: "Boleh, Kak",
        statusRead: "delivered",
        isRead: null,
        messageType: "",
        file: null,
    },
];

const Chatroom = () => {
    const route = useRoute<ChatroomScreenRouteProp>();
    const { chatId, name, profilePic } = route.params;
    const [chats, setChats] = useState([]);
    const [email, setEmail] = useState("");
    const [chatroomID, setChatroomID] = useState<number>(0);
    const [searchText, setSearchText] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchChats = async () => {
        try {
            setLoading(true);
            const userEmail = await AsyncStorage.getItem("Email");
            if (!userEmail) {
              throw new Error("Email not found in storage");
          }

          const parsedEmail = JSON.parse(userEmail);
            const response = await fetch(
                API_URL.concat("/chatroom?chatroomID=" + chatId),
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${parsedEmail}`,
                    },
                }
            );

            if (!response.ok) {
                const errorMessage = `Error fetching chats: HTTP status ${response.status} - ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Chats data: ", data.Chats);
            console.log("Chat Files data: ", data.Files);

            const chatsData = data.Chats;
            const chatFilesData = data.Files;

            const chats = chatsData.map((chat: any) => ({
                id: chat.ChatID,
                timendate: chat.Timendate,
                email: chat.Email,
                content: chat.Content,
                statusRead: chat.StatusRead,
                isRead: chat.IsRead,
                messageType: chat.MessageType,
                file: chatFilesData[chat.ChatID],
            }));
            chats.sort(
                (a: ChatPreviewProps, b: ChatPreviewProps) =>
                    new Date(a.timendate).getTime() -
                    new Date(b.timendate).getTime()
            );

            setChats(chats);
            setEmail(chatsData[0].Email);
            setChatroomID(chatsData[0].ChatroomID);
        } catch (error) {
            console.error("Error fetching chats: ", error);
        } finally {
          setLoading(false);
        }
    };
    useEffect(() => {
        fetchChats();

        const unsubscribeOnMessage = messaging().onMessage(
            async (remoteMessage) => {
                console.log("Message received in foreground!", remoteMessage);
                await fetchChats();
            }
        );

        const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(
            (token) => {
                console.log("New FCM token:", token);
            }
        );

        return () => {
            unsubscribeOnMessage();
            unsubscribeOnTokenRefresh();
        };
    }, [chats]);

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log("Message handled in the background!", remoteMessage);
            // Fetch chats data and update state
            await fetchChats();
        });
    }, []);

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
                    const parts = chat.content.split(
                        new RegExp(`(${searchText})`, "gi")
                    );
                    highlightedContent = parts.map((part, index) =>
                        part.toLowerCase() === searchText.toLowerCase() ? (
                            <Text
                                key={index}
                                style={{ backgroundColor: "yellow" }}
                            >
                                {part}
                            </Text>
                        ) : (
                            part
                        )
                    );
                } else {
                    const parts = chat.content.split(
                        new RegExp(`(${searchText})`, "gi")
                    );
                    highlightedContent = parts.map((part, index) =>
                        part.toLowerCase() === searchText.toLowerCase() ? (
                            <Text
                                key={index}
                                style={{ backgroundColor: "#D3D3D3" }}
                            >
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
            if (chat.messageType === "photo") {
                renderedComponents.push(
                    <PhotoComponent
                        key={chat.id}
                        fileUrl={chat.file}
                        time={chat.timendate}
                        statusRead={chat.statusRead}
                        from={chat.isRead == null ? "admin" : "customer"}
                    ></PhotoComponent>
                );
            } else if (chat.messageType === "video") {
                renderedComponents.push(
                    <VideoComponent
                        key={chat.id}
                        fileUrl={chat.content}
                        time={chat.timendate}
                        statusRead={chat.statusRead}
                        from={chat.isRead == null ? "admin" : "customer"}
                    ></VideoComponent>
                );
            } else if (chat.messageType === "file") {
                renderedComponents.push(
                    <UnknownFileComponent
                        key={chat.id}
                        fileUrl={chat.content}
                        time={chat.timendate}
                        statusRead={chat.statusRead}
                        from={chat.isRead == null ? "admin" : "customer"}
                    ></UnknownFileComponent>
                );
            } else {
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
                {loading ? (
                  <ActivityIndicator size="large" color={Colors.primary1} style={{ justifyContent: 'center', alignItems: 'center' }} />
                ) : (
                  renderChatMessagesByDay(chats)
                )}
            </ScrollView>
            <View
                className="p-[20]"
                style={{ backgroundColor: Colors.backgroundChat }}
            >
                <TypeBar
                    chatId={chatId}
                    email={email}
                    chatroomId={chatroomID}
                />
            </View>
        </SafeAreaView>
    );
};

export default Chatroom;
