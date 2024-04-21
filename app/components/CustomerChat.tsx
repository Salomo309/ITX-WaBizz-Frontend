import React from "react";
import { View, Image, Text } from "react-native";
import Colors from "./../constants/colors";

interface CustomerChatProps{
    time: string;
    content: string;
}

const CustomerChat: React.FC<CustomerChatProps> = ({time, content}) => {
    return (
        <View className="mt-[20] ml-[20] mr-[60] p-[10] rounded-lg"
            backgroundColor={Colors.white}>
            <Text className="text-lg font-[Roboto] text-black">
                {content}
            </Text>
            <View className="flex-row justify-end items-left">
                <Text className="text-s font-[Roboto] text-gray text-right mr-2">
                    {time}
                </Text>
            </View>
        </View>
    );
};

export default CustomerChat;