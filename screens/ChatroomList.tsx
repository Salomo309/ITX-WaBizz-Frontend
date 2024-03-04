import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../constants/colors';
import Header from './Header';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const ChatroomPreview = () => {
  return (
    <View style={styles.containerChatroom}>
        <Image source={require('../assets/images/Avatar.png')} style={{ width: 40, height: 40 }} />
        <View style={styles.containerNameMessage}>
            <Text style={styles.previewName}>Go Dillon Audris</Text>
            <Text style={styles.previewMessage}>Baik, terima kasih infonya</Text>
        </View>
        <View>
          <Text style={styles.previewTime}>08:21</Text>
        </View>
    </View>
  )
}

const ChatroomList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary1} />
      <Header title="ITX WA" />
      <ScrollView>
        <View style={styles.content}>
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
          <ChatroomPreview />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    alignItems: 'center',
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
    marginBottom: 24,
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
  previewMessage: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  previewTime: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
});

export default ChatroomList;
