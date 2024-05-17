import Colors from "./../constants/colors";
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface VideoComponentProps {
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
  
const VideoComponent: React.FC<VideoComponentProps> = ({ fileUrl, time, statusRead, from }) => {
    return (
        (from=="admin") ?
            <View
                className="w-fit mt-[20] ml-[100] mr-[20] p-[10] rounded-lg"
                style={{ backgroundColor: Colors.primary3 }}
            >
                <View className="relative">
                    <Image
                        source={{ uri: fileUrl }}
                        style={{ width: 250, height: 250 }}
                    />
                    <View style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: [{ translateX: -25 }, { translateY: -25 }], // Center the container
                            backgroundColor: 'black', // Black background
                            opacity: 0.75, // 75% opacity
                            borderRadius: 50, // Rounded corners, half the size of the icon
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Ionicons 
                            name="caret-forward"
                            size={40}
                            color={Colors.white}
                        ></Ionicons>
                    </View>
                    <Text
                        className="p-1 text-s font-[Roboto] text-white text-right mr-2"
                        style={{
                            position: 'absolute',
                            right: '10%',
                            bottom: '0%',
                        }}>
                        {formatTimeBubbleChat(time)}
                    </Text>
                    {statusRead === "sent" ? (
                        <Image
                            className="w-5 h-5 p-1"
                            source={require("../assets/icons/tick-sent.png")}
                            style={{
                                position: 'absolute',
                                right: '4%',
                                bottom: '2%',
                            }}
                        />
                    ) : statusRead === "delivered" ? (
                        <Image
                            className="w-5 h-5 p-1"
                            source={require("../assets/icons/double-tick-delivered.png")}
                            style={{
                                position: 'absolute',
                                right: '4%',
                                bottom: '2%',
                            }}
                        />
                    ) : (
                        <Image
                            className="w-5 h-5 p-1"
                            source={require("../assets/icons/double-tick-read.png")}
                            style={{
                                position: 'absolute',
                                right: '4%',
                                bottom: '2%',
                            }}
                        />
                    )}
                </View>
            </View>
        :
            <View
                className="w-fit mt-[20] ml-[20] mr-[100] p-[10] rounded-lg"
                style={{ backgroundColor: Colors.white }}
            >
                <View className="relative">
                    <Image
                        source={{ uri: fileUrl }}
                        style={{ width: 250, height: 250 }}
                    />
                    <View style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: [{ translateX: -25 }, { translateY: -25 }], // Center the container
                            backgroundColor: 'black', // Black background
                            opacity: 0.75, // 75% opacity
                            borderRadius: 50, // Rounded corners, half the size of the icon
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Ionicons 
                            name="caret-forward"
                            size={40}
                            color={Colors.white}
                        ></Ionicons>
                    </View>
                    <Text
                        className="p-1 text-s font-[Roboto] text-white text-right mr-2"
                        style={{
                            position: 'absolute',
                            right: '0%',
                            bottom: '0%',
                        }}>
                        {formatTimeBubbleChat(time)}
                    </Text>
                </View>
            </View>
    );
}

export default VideoComponent