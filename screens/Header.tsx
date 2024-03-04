import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../constants/colors';

interface HeaderProps {
  userProfilePic: string;
}

const Header: React.FC<HeaderProps> = ({ userProfilePic }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>ITX WABizz</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search-sharp" size={24} color={Colors.white} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          {userProfilePic=='' ? (
            <Ionicons name="person-circle-sharp" size={30} color={Colors.white} />
          ) : (
            <Image source={{uri: userProfilePic}} style={styles.containerProfilePic} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 60,
    backgroundColor: Colors.primary1,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  containerProfilePic: {
    height: 30,
    width: 30,
    borderRadius: 25,
  }
});

export default Header;
