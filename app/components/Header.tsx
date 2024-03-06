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
    <View className='flex-row justify-between items-center px-[24] h-[60] bg-primary-1'>
      <Text className='text-xl text-white font-[Roboto] font-bold'>ITX WABizz</Text>
      <View className='flex-row items-center'>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search-sharp" size={24} color={Colors.white} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          {userProfilePic=='' ? (
            <Ionicons name="person-circle-sharp" size={30} color={Colors.white} />
          ) : (
            <Image source={{uri: userProfilePic}} className='h-[30] w-[30] rounded-full' />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
