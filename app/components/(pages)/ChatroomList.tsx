import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../constants/colors';
import Header from '../Header';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tailwind } from 'react-native-tailwindcss';
import axios from 'axios';
import ApiUrl from '../../constants/api';

interface ChatroomPreviewProps {
  id: number;
  profilePic: string;
  name: string;
  messagePreview: string;
  messageType: string; // text, photo, video
  time: string;
  isRead: string;
  statusRead: string;
  countUnread: string;
}

const ChatroomPreview : React.FC<ChatroomPreviewProps> = ({ profilePic, name, messagePreview, messageType, time, isRead, statusRead, countUnread }) => {
  return (
    <View className='w-full h-[50] flex-row align-start justify-center mb-[18]'>
        <View className='h-full justify-center'>
          {profilePic=='' ? (
            <Image source={require('../../assets/images/Avatar.png')} className='w-[40] h-[40] rounded-full' />
            ) : (
              <Image source={{uri: profilePic}} className='w-[40] h-[40] rounded-full' />
              )}
        </View>
        <View className='flex-1 flex-column align-start justify-center ml-[12]'>
            <Text className='w-[85%] font-[Roboto] font-bold text-base text-black mb-[2]' numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
            <View className='flex-1 flex-row items-center'>
              {statusRead=='sent' ? (
                <Ionicons name="checkmark" size={16} color={Colors.gray} style={{marginRight: 5}}/>
              ) : statusRead=='delivered' ? (
                <Image source={require('../../assets/icons/double-tick-delivered.png')} className='w-[15] h-[15] mr-[5]' />
              ) : statusRead=='read' ? (
                <Image source={require('../../assets/icons/double-tick-read.png')} className='w-[15] h-[15] mr-[5]' />
              ) : (<></>)}
              {messageType=='photo' ? (
                <Ionicons name="image-sharp" size={14} color={Colors.gray} style={{marginRight: 5}}/>
              ) : messageType=='video' ? (
                <Ionicons name="videocam-sharp" size={14} color={Colors.gray} style={{marginRight: 5}} />
              ) : (<></>)}
              <Text className='w-[100%] font-[Roboto] font-medium text-sm text-black' numberOfLines={1} ellipsizeMode='tail'>{messagePreview}</Text>
            </View>
        </View>
        {isRead === "null" || isRead === "1" ? (
          <Text className='font-[Roboto] font-medium text-sm text-black'>{formatTime(time)}</Text>
        ) : (
          <View className='w-auto flex-shrink-0 flex-column items-end justify-center'>
            <Text className='font-[Roboto] font-bold text-sm text-primary-1'>{formatTime(time)}</Text>
            <View className='w-6 h-6 rounded-full bg-primary-1 justify-center items-center mt-0.5'>
              <Text className='text-white font-[Roboto] text-xs font-medium'>{countUnread}</Text>
            </View>
          </View>
        )}
    </View>
  )
}

// Format timestamp (if today, only show the time. if yesterday, show yesterday, else show only the date)
const formatTime = (timestamp: string | number) => {
  const date = new Date(timestamp);
  const now = new Date();

  const isYesterday = (date: Date) => {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === now.toDateString();
  };

  if (isToday(date)) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
};

const ChatroomList = () => {
  // const { slug } = useLocalSearchParams();
  // const route = useRouter();
  // const { slug } = route. || {};

  const [chatrooms, setChatrooms] = useState<ChatroomPreviewProps[]>([]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        // const response = await fetch("http://10.0.2.2:8080/api/chatlist", {
        const response = await fetch(ApiUrl.concat("/chatlist"), {
        // const response = await fetch("https://d0ea-36-79-175-119.ngrok-free.app/api/chatlist", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json(); 
        console.log('Chatroom data: ', data);

        const chatList = data.ChatList;
        
        const chatroomsWithId = chatList.map((chatroom: any, index: number) => ({
          id: index + 1,
          profilePic: '',
          name: chatroom.customerName,
          messagePreview: chatroom.content,
          messageType: chatroom.messageType,
          time: chatroom.timendate,
          isRead: chatroom.isRead || false,
          statusRead: chatroom.statusRead,
          countUnread: chatroom.countUnread
        }));
    
        setChatrooms(chatroomsWithId);
      } catch (error) {
        console.error('Error fetching chatrooms: ', error);
      }
    };    

    fetchChatrooms();
  }, []);
  

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar backgroundColor={Colors.primary1} />
      <Header userProfilePic="https://th.bing.com/th/id/OIP.CtpCzACf2_IjRw2YX7n20AHaJ4?rs=1&pid=ImgDetMain" />
      <ScrollView>
        <View className='flex-1 items-start p-[24]'>
          {/** dummy data */}
          <ChatroomPreview 
            id={0}
            profilePic='https://www.gluwee.com/wp-content/uploads/2021/01/olivia-rodrigo_cover.jpg'
            name="Arleen Chrysantha Gunardi (Customer)"
            messagePreview="Terima kasih kak"
            messageType='text'
            time="2024-03-11 11:33:12"
            isRead="null"
            statusRead="sent"
            countUnread="25"
          />
          <ChatroomPreview 
            id={1}
            profilePic='https://0.soompi.io/wp-content/uploads/2019/01/14000832/Soobin1-540x540.jpg'
            name="Go Dillon Audris"
            messagePreview="Baik kak, akan segera kami proses lebih lanjut ya"
            messageType='text'
            time="2024-03-10 13:33:12"
            isRead="null"
            statusRead="read"
            countUnread="25"
          />

          {chatrooms && chatrooms.map((chatroom: ChatroomPreviewProps) => (
            <ChatroomPreview
              id={chatroom.id}
              profilePic={chatroom.profilePic}
              name={chatroom.name}
              messagePreview={chatroom.messagePreview}
              messageType={chatroom.messageType}
              time={chatroom.time}
              isRead={chatroom.isRead}
              statusRead={chatroom.statusRead}
              countUnread={chatroom.countUnread}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default ChatroomList;
