import React, { useState, useRef } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";
import Colors from "./../../constants/colors";
import Header from "./../Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URL } from "@env";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ChatroomListNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ChatroomList"
>;

export interface ChatroomPreviewProps {
    id: number;
    profilePic: string;
    name: string;
    messagePreview: string;
    messageType: string; // text, photo, video
    time: string;
    isRead: string;
    statusRead: string;
    countUnread: string;
}

const ChatroomPreview: React.FC<ChatroomPreviewProps> = ({
    id,
    profilePic,
    name,
    messagePreview,
    messageType,
    time,
    isRead,
    statusRead,
    countUnread,
}) => {
    return (
        <View className="w-full h-[50] flex-row align-start justify-center mb-[18]">
            <View className="h-full justify-center">
                {profilePic == "" ? (
                    <Image
                        source={require("../../assets/images/Avatar.png")}
                        className="w-[40] h-[40] rounded-full"
                    />
                ) : (
                    <Image
                        source={{ uri: profilePic }}
                        className="w-[40] h-[40] rounded-full"
                    />
                )}
            </View>
            <View className="flex-1 flex-column align-start justify-center ml-[12]">
                <Text
                    className="w-[85%] font-[Roboto] font-bold text-base text-black mb-[2]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <View className="flex-1 flex-row items-center">
                    {statusRead == "sent" ? (
                        <Ionicons
                            name="checkmark"
                            size={16}
                            color={Colors.gray}
                            style={{ marginRight: 5 }}
                        />
                    ) : statusRead == "delivered" ? (
                        <Image
                            source={require("../../assets/icons/double-tick-delivered.png")}
                            className="w-[15] h-[15] mr-[5]"
                        />
                    ) : statusRead == "read" ? (
                        <Image
                            source={require("../../assets/icons/double-tick-read.png")}
                            className="w-[15] h-[15] mr-[5]"
                        />
                    ) : (
                        <></>
                    )}
                    {messageType == "photo" ? (
                        <Ionicons
                            name="image-sharp"
                            size={14}
                            color={Colors.gray}
                            style={{ marginRight: 5 }}
                        />
                    ) : messageType == "video" ? (
                        <Ionicons
                            name="videocam-sharp"
                            size={14}
                            color={Colors.gray}
                            style={{ marginRight: 5 }}
                        />
                    ) : (
                        <></>
                    )}
                    <Text
                        className="w-[100%] font-[Roboto] font-medium text-sm text-black"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {messagePreview}
                    </Text>
                </View>
            </View>
            {isRead === "null" || isRead === "1" ? (
                <Text className="font-[Roboto] font-medium text-sm text-black">
                    {formatTime(time)}
                </Text>
            ) : parseInt(countUnread) > 0 ? (
                <View className="w-auto flex-shrink-0 flex-column items-end justify-center">
                    <Text className="font-[Roboto] font-bold text-sm text-primary-1">
                        {formatTime(time)}
                    </Text>
                    <View className="w-6 h-6 rounded-full bg-primary-1 justify-center items-center mt-0.5">
                        <Text className="text-white font-[Roboto] text-xs font-medium">
                            {countUnread}
                        </Text>
                    </View>
                </View>
            ) : (
                <Text className="font-[Roboto] font-medium text-sm text-black">
                    {formatTime(time)}
                </Text>
            )}
        </View>
    );
};

// Format timestamp (if today, only show the time. if yesterday, show yesterday, else show only the date)
const formatTime = (timestamp: string | number) => {
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
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
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

const ChatroomList = () => {
    const navigation = useNavigation<ChatroomListNavigationProp>();
    const [chatrooms, setChatrooms] = useState<ChatroomPreviewProps[]>([]);
    const prevChatroomsRef = useRef<ChatroomPreviewProps[]>([]);
    const [chatroomsByMessage, setChatroomsByMessage] = useState<ChatroomPreviewProps[]>([]);

    const fetchChatrooms = async () => {
        try {
            const userEmail = await AsyncStorage.getItem("Email");
            if (!userEmail) {
                throw new Error("Email not found in storage");
            }
            const parsedEmail = JSON.parse(userEmail);
            const response = await fetch(API_URL.concat("/chatlist"), {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${parsedEmail}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Chatroom data: ", data);

            const chatList = data.ChatList;

            const chatroomsWithId = chatList.map((chatroom: any, index: number) => ({
                id: index + 1,
                profilePic: "",
                name: chatroom.customerName,
                messagePreview: chatroom.content,
                messageType: chatroom.messageType,
                time: chatroom.timendate,
                isRead: chatroom.isRead || false,
                statusRead: chatroom.statusRead,
                countUnread: chatroom.countUnread,
            }));

            if (JSON.stringify(chatroomsWithId) !== JSON.stringify(prevChatroomsRef.current)) {
                console.log("Updating chatrooms state...");
                setChatrooms(chatroomsWithId);
                prevChatroomsRef.current = chatroomsWithId;
            }
        } catch (error) {
            const userEmail = await AsyncStorage.getItem("Email");
            console.error("EMAIL", userEmail);
            console.error("Error fetching chatrooms: ", error);
            console.error("EMAIL", userEmail);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchChatrooms();
        }, [])
    );
    
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor={Colors.primary1} />
            <Header
                userProfilePic="https://th.bing.com/th/id/OIP.CtpCzACf2_IjRw2YX7n20AHaJ4?rs=1&pid=ImgDetMain"
                setChatrooms={setChatrooms}
                setChatroomsByMessage={setChatroomsByMessage}
            />
            <ScrollView>
                <View className="flex-1 items-start p-[24]">
                    {chatrooms &&
                        chatrooms.map((chatroom: ChatroomPreviewProps) => (
                            <TouchableHighlight
                                underlayColor="#DDDDDD"
                                activeOpacity={0.6}
                                onPress={() =>
                                    navigation.navigate("Chatroom", {
                                        chatId: chatroom.id,
                                        name: chatroom.name,
                                        profilePic: chatroom.profilePic,
                                    })
                                }
                            >
                                <ChatroomPreview
                                    id={chatroom.id}
                                    profilePic={chatroom.profilePic}
                                    name={chatroom.name}
                                    messagePreview={
                                        chatroom.messageType == "text"
                                            ? chatroom.messagePreview
                                            : chatroom.messageType == "photo"
                                            ? "photo"
                                            : chatroom.messageType == "video"
                                            ? "video"
                                            : "file"
                                    }
                                    messageType={chatroom.messageType}
                                    time={chatroom.time}
                                    isRead={chatroom.isRead}
                                    statusRead={chatroom.statusRead}
                                    countUnread={chatroom.countUnread}
                                />
                            </TouchableHighlight>
                        ))}
                    {chatroomsByMessage.length > 0 && (
                        <>
                            <Text style={styles.messagesText}>Messages</Text>
                            {chatroomsByMessage.map((chatroom: ChatroomPreviewProps) => (
                                <TouchableHighlight
                                    key={chatroom.id}
                                    underlayColor="#DDDDDD"
                                    activeOpacity={0.6}
                                    onPress={() =>
                                        navigation.navigate("Chatroom", {
                                            chatId: chatroom.id,
                                            name: chatroom.name,
                                            profilePic: chatroom.profilePic,
                                        })
                                    }
                                >
                                    <ChatroomPreview
                                        id={chatroom.id}
                                        profilePic={chatroom.profilePic}
                                        name={chatroom.name}
                                        messagePreview={
                                            chatroom.messageType == "text"
                                                ? chatroom.messagePreview
                                                : chatroom.messageType == "photo"
                                                ? "photo"
                                                : chatroom.messageType == "video"
                                                ? "video"
                                                : "file"
                                        }
                                        messageType={chatroom.messageType}
                                        time={chatroom.time}
                                        isRead={chatroom.isRead}
                                        statusRead={chatroom.statusRead}
                                        countUnread={chatroom.countUnread}
                                    />
                                </TouchableHighlight>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    messagesText: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 18,
        color: "black",
        marginBottom: 8,
    },
});

export default ChatroomList;
