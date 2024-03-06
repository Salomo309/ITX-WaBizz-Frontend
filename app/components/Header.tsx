import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Modal,
} from "react-native";
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from "../constants/colors";
import Popover from "react-native-popover-view";
import LogoutModal from "./LogoutModal";

interface HeaderProps {
  userProfilePic: string;
}

const Header: React.FC<HeaderProps> = ({ userProfilePic }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePress = () => {
    setPopoverVisible(false);
    setModalVisible(true);
  };

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
        <Popover
          popoverStyle={styles.popoverStyle}
          isVisible={popoverVisible}
          onRequestClose={() => setPopoverVisible(false)}
          from={
            <TouchableOpacity onPress={() => setPopoverVisible(true)}>
              {userProfilePic == "" ? (
                <Ionicons
                  name="person-circle-sharp"
                  size={30}
                  color={Colors.white}
                />
              ) : (
                <Image
                  source={{ uri: userProfilePic }}
                  style={styles.containerProfilePic}
                />
              )}
            </TouchableOpacity>
          }
        >
          <View className="w-48 px-4 py-4">
            <TouchableOpacity className="flex flwx-row justify-center">
              <Text className="text-base">Manage Users</Text>
            </TouchableOpacity>
            <View className="py-4" />
            <TouchableOpacity
              onPress={handlePress}
              className="flex flwx-row justify-center"
            >
              <Text className="text-base">Logout</Text>
            </TouchableOpacity>
          </View>
        </Popover>
        <LogoutModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default Header;
