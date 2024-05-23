import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";
import DocumentPicker, { types } from 'react-native-document-picker';
import Colors from "./../constants/colors";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TypeBarProps {
  chatId: number;
  email: string;
  chatroomId: number;
}

const TypeBar: React.FC<TypeBarProps> = ({ chatId, email, chatroomId }) => {
  const [message, setMessage] = useState("");

  const onSendMessage = async (message: string, file, messageType: string) => {
    const messageData = {
      ChatID: 0, // kl ga 0 error
      Email: email,
      ChatroomID: chatroomId,
      Timendate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      IsRead: null,
      StatusRead: "sent",
      Content: message,
      MessageType: messageType,
    };
    console.log(messageData);
  
    try {
      const formData = new FormData();
      formData.append('chatJSON', JSON.stringify(messageData));
      
      if (messageType !== 'text') {
        formData.append('file', file);
      }
  
      const userEmail = await AsyncStorage.getItem("Email");
      if (!userEmail) {
        throw new Error("Email not found in storage");
    }

    const parsedEmail = JSON.parse(userEmail);

      const response = await fetch(API_URL.concat("/chatroom/send"),
        {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': `Bearer ${parsedEmail}`,
          }
        }
      );
      
  
      const responseData = await response.json();
      console.log("Message sent:", responseData);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };  

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message, null, "text");
      setMessage("");
    }
  };

  const handleAttachPressFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      res.forEach(file => {
        console.log('Selected file URI:', file.uri);
        onSendMessage(file.uri, file, file.type?.startsWith("image/") ? "photo" : file.type?.startsWith("video/") ? "video" : "file");
      });
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.error('Unknown error: ', err);
      }
    }
  };

  const handleAttachPressPhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
  
      res.forEach(file => {
        console.log('Selected file URI:', file.uri);
        onSendMessage(file.uri, file, file.type?.startsWith("image/") ? "photo" : file.type?.startsWith("video/") ? "video" : "file");
      });
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.error('Unknown error: ', err);
      }
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
        borderRadius: 28,
        backgroundColor: "white",
      }}
    >
      <TextInput
        style={{ flex: 1, paddingHorizontal: 2, marginRight: 10, borderRadius: 15, padding: 8, color: 'black' }}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        multiline
        numberOfLines={2}
      />
      <TouchableOpacity onPress={handleAttachPressFile}>
        <Ionicons
          name="attach-sharp"
          size={25}
          color={Colors.gray}
          style={{
            marginRight: 7,
            transform: [{ rotate: "-45deg" }],
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAttachPressPhoto}>
        <Ionicons
          name="camera-sharp"
          size={22}
          color={Colors.gray}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={sendMessage}>
        <Ionicons
          name="send-sharp"
          size={25}
          color={Colors.primary1}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TypeBar;
