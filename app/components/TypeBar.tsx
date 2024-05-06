import Colors from "./../constants/colors";
import React, { useEffect } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";

interface TypeBarProps {
  chatId: number;
  email: string;
  chatroomId: number;
}

const TypeBar: React.FC<TypeBarProps> = ({ chatId, email, chatroomId }) => {
  const onSendMessage = async (message: String) => {
    const messageData = {
      ChatID: 0, // kl ga 0 error
      Email: email,
      ChatroomID: chatroomId,
      Timendate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      IsRead: null,
      StatusRead: "sent",
      Content: message,
      MessageType: "text",
    };
    console.log(message);

    try {
      const response = await fetch(
        "https://golden-worthy-basilisk.ngrok-free.app/api/chatroom/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );
      const responseData = await response.json();
      console.log("Message sent:", responseData);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 0.1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 28, // Adjust the radius value as needed
        backgroundColor: "white", // Add a background color to see the rounded corners
      }}
    >
      <TextInput
        className="flex-1 ph-[2] mr-[10] rounded-xl text-black"
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        multiline
        numberOfLines={2}
      />
      {/* <Image source={require('../assets/icons/attach_file_black_24dp.png')} style={{ width: 24, height: 24, marginLeft: 10 }} /> */}
      {/* <Image source={require('../assets/icons/photo_camera_black_24dp.png')} style={{ width: 24, height: 24, marginLeft: 10 }} /> */}
      <Ionicons
        name="attach-sharp"
        size={25}
        color={Colors.gray}
        style={{
          marginRight: 7,
          transform: [{ rotate: "-45deg" }],
        }}
      ></Ionicons>
      <Ionicons
        name="camera-sharp"
        size={22}
        color={Colors.gray}
        style={{ marginRight: 10 }}
      ></Ionicons>
      <TouchableOpacity onPress={sendMessage}>
        <Ionicons
          name="send-sharp"
          size={25}
          color={Colors.primary1}
          style={{ marginRight: 5 }}
        ></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default TypeBar;
