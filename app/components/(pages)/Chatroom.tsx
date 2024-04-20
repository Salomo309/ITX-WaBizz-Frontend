import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Colors from "./../../constants/colors";
import HeaderChat from "./../HeaderChat";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "App";
import {useRoute} from "@react-navigation/native"
import TypeBar from "../TypeBar";

type ChatroomScreenRouteProp = RouteProp<RootStackParamList, 'Chatroom'>;

interface ChatMessageProps {
    user_id: string;
    timendate: string;
    content: string;
    status: string;
    isRead: string;
    messageType: string;
  }

const ChatMessage: React.FC<ChatMessageProps> = ({ timendate, content, status, isRead, messageType }) => {
    return (
      <View>
        <Text>{messageType}</Text>
        <Text>{content}</Text>
        <Text>{status}</Text>
        <Text>{isRead}</Text>
        <Text>{timendate}</Text>
      </View>
    );
  };

interface ChatroomProps{
    chatId: number;
    profilePic: string;
    name: string;
}

const ChatroomPreview: React.FC<ChatroomProps> = ({
  chatId,
  profilePic,
  name,
}) => {
  return (
    <View>
      <Text>{chatId}</Text>
      <Text>{profilePic}</Text>
      <Text>{name}</Text>
    </View>
  );
};

const Chatroom = () =>{
  const route = useRoute<ChatroomScreenRouteProp>();
  const {chatId} = route.params;
    return(
      <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor={Colors.primary1} />
      <HeaderChat userName="Profile" />
      <ScrollView backgroundColor={Colors.backgroundChat}>

      </ScrollView>
      <TypeBar></TypeBar>
    </SafeAreaView>
    )
}

export default Chatroom;