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
    <View style={styles.header}>
      <Text style={styles.headerText}>ITX WABizz</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name="search-sharp"
            size={24}
            color={Colors.white}
            style={styles.icon}
          />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 60,
    backgroundColor: Colors.primary1,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "700",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  containerProfilePic: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  popoverStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Header;
