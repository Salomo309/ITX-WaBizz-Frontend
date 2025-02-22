import React from "react";
import { View, Text } from "react-native";
import Colors from "./../constants/colors";

interface CustomerChatProps{
    time: string;
    content: string;
}

const formatTimeBubbleChat = (timestamp: string | number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
};

const CustomerChat: React.FC<CustomerChatProps> = ({time, content}) => {
    return (
        <View className="mt-[20] ml-[20] mr-[60] p-[10] rounded-lg"
            backgroundColor={Colors.white}>
            <Text className="text-lg font-[Roboto] text-black">
                {content}
            </Text>
            <View className="flex-row justify-end items-left">
                <Text className="text-s font-[Roboto] text-gray text-right mr-2">
                    {formatTimeBubbleChat(time)}
                </Text>
            </View>
        </View>
    );
};

export default CustomerChat;