import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../constants/colors';
import Header from '../Header';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

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
    <View style={styles.containerChatroom}>
        {profilePic=='' ? (
          <Image source={require('../../assets/images/Avatar.png')} style={styles.containerProfilePic} />
          ) : (
          <Image source={{uri: profilePic}} style={styles.containerProfilePic} />
        )}
        <View style={styles.containerNameMessage}>
            <Text style={styles.previewName}>{name}</Text>
            <View style={styles.containerPreviewMessage}>
              {messageType=='photo' ? (
                <Ionicons name="image-sharp" size={12} color={Colors.gray} style={ styles.messageTypeIcon } />
              ) : messageType=='video' ? (
                <Ionicons name="videocam-sharp" size={12} color={Colors.gray} style={ styles.messageTypeIcon } />
              ) : (<></>)}
              <Text style={styles.previewMessage}>{messagePreview}</Text>
            </View>
        </View>
        {isRead ? (
          <Text style={styles.previewTimeDefault}>{time}</Text>
        ) : (
          <View style={styles.containerTimeBadge}>
            <Text style={styles.previewTimeUnread}>{time}</Text>
            <View style={styles.unreadBadgeCircle}>
              <Text style={styles.unreadBadgeText}>{countUnread}</Text>
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary1} />
      <Header userProfilePic="https://th.bing.com/th/id/OIP.CtpCzACf2_IjRw2YX7n20AHaJ4?rs=1&pid=ImgDetMain" />
      <ScrollView>
        <View style={styles.content}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    // justifyContent: 'top',
    // flexDirection: 'flex-start',
    padding: 24,
    paddingTop: 24,
  },
  containerChatroom: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 24,
  },
  containerProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 25
  },
  containerNameMessage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 12
  },
  previewName: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginBottom: 2,
  },
  containerPreviewMessage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageTypeIcon: {
    marginRight: 5,
  },
  previewMessage: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  containerTimeBadge: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 12,
  },
  previewTimeDefault: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  previewTimeUnread: {
    fontSize: 12,
    color: Colors.primary1,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  unreadBadgeCircle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: Colors.primary1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  unreadBadgeText: {
    color: Colors.white,
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '400',
  },
});

export default ChatroomList;
