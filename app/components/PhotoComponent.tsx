import Colors from "./../constants/colors";
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
} from "react-native";
import RNFS from 'react-native-fs';

interface PhotoComponentProps {
    key: number;
    fileUrl: any;
    time: string;
    statusRead: string
    from: string;
}

const formatTimeBubbleChat = (timestamp: string | number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const PhotoComponent: React.FC<PhotoComponentProps> = ({ fileUrl, time, statusRead, from }) => {
//     const [imageData, setImageData] = useState<string | null>(null);

//   useEffect(() => {
//     const loadImage = async () => {
//       try {
//         const base64Data = await RNFS.readFile(fileUrl, 'base64');
//         setImageData(`data:image/jpeg;base64,${base64Data}`);
//       } catch (error) {
//         console.error("Error loading image:", error);
//       }
//     };

//     loadImage();
//   }, [fileUrl]);

    return (
        (from=="admin") ?
            <View
                className="w-fit mt-[20] ml-[100] mr-[20] p-[10] rounded-lg"
                style={{ backgroundColor: Colors.primary3 }}
            >
                <View className="relative">
                    <Image
                        source={{ uri: fileUrl }}
                        // source={{ uri: imageData }}
                        style={{ width: 250, height: 250 }}
                    />
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

export default PhotoComponent