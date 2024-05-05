import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import ImagePicker from "react-native-image-picker";
import Colors from "./../constants/colors";
import { format } from "date-fns";

const TypeBar = () => {
  const [message, setMessage] = useState("");

  const onSendMessage = async (
    content:
      | string
      | ImagePicker.ImagePickerResponse
      | DocumentPickerResponse[],
    messageType = "text"
  ) => {
    const messageData = {
      ChatID: 0,
      Email: "asep@gmail.com",
      ChatroomID: 1,
      Timendate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      IsRead: null,
      StatusRead: "sent",
      Content: content,
      MessageType: messageType,
    };

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

  const sendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Proceed with camera launch as before
        const options: ImagePicker.CameraOptions = {
          mediaType: "photo",
          saveToPhotos: true,
          quality: 0.8,
        };
        ImagePicker.launchCamera(options, (response) => {
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.errorMessage) {
            console.log("ImagePicker Error: ", response.errorMessage);
          } else if (
            response.assets &&
            response.assets.length > 0 &&
            response.assets[0].uri
          ) {
            const { uri } = response.assets[0];
            onSendMessage(uri, "image");
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
    }
  };

  const handleAttachment = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const file = Array.isArray(results) ? results[0] : results;
      if (file && file.uri) {
        onSendMessage(file.uri, "file");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled file picker");
      } else {
        console.error("Error picking document:", err);
      }
    }
  };

  return (
    // <View className="w-[100%] flex-row items-center p-[4] rounded-sm">
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
      <TouchableOpacity onPress={handleAttachment}>
        <Ionicons
          name="attach-sharp"
          size={25}
          color={Colors.gray}
          style={{
            marginRight: 7,
            transform: [{ rotate: "-45deg" }],
          }}
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCamera}>
        <Ionicons
          name="camera-sharp"
          size={22}
          color={Colors.gray}
          style={{ marginRight: 10 }}
        ></Ionicons>
      </TouchableOpacity>
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
