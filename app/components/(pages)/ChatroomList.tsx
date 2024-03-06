import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../constants/colors';
import Header from '../Header';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tailwind } from 'react-native-tailwindcss';

interface ChatroomPreviewProps {
  profilePic: string;
  name: string;
  messagePreview: string;
  messageType: string; // text, photo, video
  time: string;
  isRead: boolean;
  countUnread: string;
}

const ChatroomPreview : React.FC<ChatroomPreviewProps> = ({ profilePic, name, messagePreview, messageType, time, isRead, countUnread }) => {
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
            <Text className='font-[Roboto] font-bold text-base text-black mb-[2]' numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
            <View className='flex-1 flex-row items-center'>
              {messageType=='photo' ? (
                <Ionicons name="image-sharp" size={12} color={Colors.gray} style={{marginRight: 5}}/>
              ) : messageType=='video' ? (
                <Ionicons name="videocam-sharp" size={12} color={Colors.gray} style={{marginRight: 5}} />
              ) : (<></>)}
              <Text className='font-[Roboto] font-medium text-sm text-black' numberOfLines={1} ellipsizeMode='tail'>{messagePreview}</Text>
            </View>
        </View>
        {isRead ? (
          <Text className='font-[Roboto] font-medium text-sm text-black'>{time}</Text>
        ) : (
          <View className='w-auto flex-shrink-0 flex-column items-end justify-center'>
            <Text className='font-[Roboto] font-bold text-sm text-primary-1' >{time}</Text>
            <View className='w-6 h-6 rounded-full bg-primary-1 justify-center items-center mt-0.5'>
              <Text className='text-white font-[Roboto] text-xs font-medium'>{countUnread}</Text>
            </View>
          </View>
        )}
    </View>
  )
}

const ChatroomList = () => {
  // const { slug } = useLocalSearchParams();
  // const route = useRouter();
  // const { slug } = route. || {};

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar backgroundColor={Colors.primary1} />
      <Header userProfilePic="https://th.bing.com/th/id/OIP.CtpCzACf2_IjRw2YX7n20AHaJ4?rs=1&pid=ImgDetMain" />
      <ScrollView>
        <View className='flex-1 items-start p-[24]'>
        <ChatroomPreview 
          profilePic=''
          name="Go Dillon Audris"
          messagePreview="Baik, terima kasih infonya"
          messageType='text'
          time="08:21"
          isRead={false}
          countUnread="25"
        />
        <ChatroomPreview 
          profilePic='https://raptv.com/wp-content/uploads/taylor-swift-variety-facetime-768x432.jpg'
          name="Arleen"
          messagePreview="Sama2..."
          messageType='photo'
          time="Yesterday"
          isRead={true}
          countUnread="0"
        />
        <ChatroomPreview 
          profilePic='https://www.gluwee.com/wp-content/uploads/2021/01/olivia-rodrigo_cover.jpg'
          name="Margaretha Olivia"
          messagePreview="Ini videonya kak"
          messageType='video'
          time="25/02/2024"
          isRead={false}
          countUnread="2"
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default ChatroomList;
