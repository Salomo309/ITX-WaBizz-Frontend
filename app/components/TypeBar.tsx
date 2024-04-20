import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";

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
        <View className="flex-row items-center p-[4] rounded-sm">
            <TextInput className="flex-1 ph-[10] mr-[10] rounded-xl"
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                multiline
            />
            <TouchableOpacity onPress={sendMessage}>
            </TouchableOpacity>
            <Image source={require('../assets/icons/attach_file_black_24dp.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
            <Image source={require('../assets/icons/photo_camera_black_24dp.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
      </View>
    );
  };
  
  export default TypeBar;
  