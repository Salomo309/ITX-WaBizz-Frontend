import Colors from "./../constants/colors";
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface UnknownFileComponent {
    key: number;
    fileUrl: string;
    time: string;
    statusRead: string;
    from: string;
}

const formatTimeBubbleChat = (timestamp: string | number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
  
const UnknownFileComponent: React.FC<UnknownFileComponent> = ({ fileUrl, time, statusRead, from }) => {
    return (
        (from=='admin') ?
            <View
                className="w-fit mt-[20] ml-[100] mr-[20] p-[10] rounded-lg"
                style={{ backgroundColor: Colors.primary3 }}>
                <View 
                    className="flex-row items-center w-fit rounded-lg p-[10]"
                    style={{ backgroundColor: '#65B8E1' }}>
                    <Ionicons
                        name="document-text-sharp"
                        size={25}
                        color={Colors.black}
                        style={{
                            marginRight: 7,
                        }}
                    ></Ionicons>
                    <Text 
                        className="text-s font-[Roboto] text-black text-left mr-2"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{ flex: 1 }}>
                        {fileUrl}
                    </Text>
                </View>
                <View className="flex-row justify-end items-left mt-2">
                    <Text className="text-s font-[Roboto] text-gray text-right mr-2">
                    {formatTimeBubbleChat(time)}
                    </Text>
                    {statusRead === "sent" ? (
                    <Image
                        className="w-5 h-5"
                        source={require("../assets/icons/tick-sent.png")}
                    />
                    ) : statusRead === "delivered" ? (
                    <Image
                        className="w-5 h-5"
                        source={require("../assets/icons/double-tick-delivered.png")}
                    />
                    ) : (
                    <Image
                        className="w-5 h-5"
                        source={require("../assets/icons/double-tick-read.png")}
                    />
                    )}
                </View>
            </View>
        :
            <View
                className="w-fit mt-[20] ml-[20] mr-[100] p-[10] rounded-lg"
                style={{ backgroundColor: Colors.white }}>
                <View 
                    className="flex-row items-center w-fit rounded-lg p-[10]"
                    style={{ backgroundColor: '#DFE6EF' }}>
                    <Ionicons
                        name="document-text-sharp"
                        size={25}
                        color={Colors.black}
                        style={{
                            marginRight: 7,
                        }}
                    ></Ionicons>
                    <Text 
                        className="text-s font-[Roboto] text-black text-left mr-2"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{ flex: 1 }}>
                        {fileUrl}
                    </Text>
                </View>
                <View className="flex-row justify-end items-left mt-2">
                    <Text className="text-s font-[Roboto] text-gray text-right mr-2">
                    {formatTimeBubbleChat(time)}
                    </Text>
                </View>
            </View>
    );
}

export default UnknownFileComponent