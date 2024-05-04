import React from "react";
import { View, Image, Text } from "react-native";
import Colors from "./../constants/colors";

interface AdminChatProps{
    time: string;
    content: string;
    statusRead: string;
}

const formatTimeBubbleChat = (timestamp: string | number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
};

const AdminChat: React.FC<AdminChatProps> = ({time, content, statusRead}) => {
    return (
        <View className="mt-[20] ml-[60] mr-[20] p-[10] rounded-lg"
            backgroundColor={Colors.primary3}>
            <Text className="text-lg font-[Roboto] text-black">
                {content}
            </Text>
            <View className="flex-row justify-end items-left">
                <Text className="text-s font-[Roboto] text-gray text-right mr-2">
                    {formatTimeBubbleChat(time)}
                </Text>
                {statusRead === "sent" ? (
                    <Image className="w-5 h-5"
                    source={require("../assets/icons/tick-sent.png")}
                    />) :
                statusRead === "delivered" ? (
                    <Image className="w-5 h-5"
                    source={require("../assets/icons/double-tick-delivered.png")}
                    />) : (
                    <Image className="w-5 h-5"
                    source={require("../assets/icons/double-tick-read.png")}
                    />)
                }
            </View>
        </View>
    );
};

export default AdminChat;