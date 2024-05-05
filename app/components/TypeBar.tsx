import Colors from "./../constants/colors";
import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TypeBar: React.FC = () => {
    const onSendMessage = (message: String) =>{
        console.log(message);
    }
    const [message, setMessage] = React.useState("");

    const sendMessage = () => {
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    };
    return (
        // <View className="w-[100%] flex-row items-center p-[4] rounded-sm">
        <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0.1,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 28, // Adjust the radius value as needed
            backgroundColor: 'white', // Add a background color to see the rounded corners
        }}>
            <TextInput className="flex-1 ph-[2] mr-[10] rounded-xl text-black"
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                multiline
                numberOfLines={2}
            />
            <TouchableOpacity onPress={sendMessage}>
            </TouchableOpacity>
            {/* <Image source={require('../assets/icons/attach_file_black_24dp.png')} style={{ width: 24, height: 24, marginLeft: 10 }} /> */}
            {/* <Image source={require('../assets/icons/photo_camera_black_24dp.png')} style={{ width: 24, height: 24, marginLeft: 10 }} /> */}
            <Ionicons name="attach-sharp"
                size={25}
                color={Colors.gray}
                style={{
                    marginRight: 7,
                    transform: [{ rotate: '-45deg' }]
                }}
            ></Ionicons>
            <Ionicons name="camera-sharp"
                size={22}
                color={Colors.gray}
                style={{ marginRight: 10 }}
            ></Ionicons>
            <Ionicons
                name="send-sharp"
                size={25}
                color={Colors.primary1}
                style={{ marginRight: 5 }}>
            </Ionicons>
      </View>
    );
  };
  
  export default TypeBar;
  