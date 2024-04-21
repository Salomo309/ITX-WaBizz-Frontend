import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Modal,
  TextInput,
  Alert,
  TouchableHighlight,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";
import Popover from "react-native-popover-view";
import LogoutModal from "./LogoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import ApiUrl from "./../constants/api";
import { ChatroomPreviewProps } from "./(pages)/ChatroomList";

interface HeaderProps {
  userProfilePic: string;
  setChatrooms: React.Dispatch<React.SetStateAction<ChatroomPreviewProps[]>>;
}

const Header: React.FC<HeaderProps> = ({ userProfilePic, setChatrooms }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const ellipsisRef = useRef(null);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleBack = () => {
    setSearchVisible(false);
    setSearchText("");
  };

  const handlePress = () => {
    setPopoverVisible(false);
    setModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user_token");
      auth().signOut();
    } catch (err) {
      Alert.alert("Logout Failed", "Unable to logout. Please try again");
    }
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);
    try {
      const response = await fetch(`${ApiUrl}/search/contact?keyword=${text}`);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      const filteredChatrooms = data.ChatList.map(
        (chatroom: any, index: number) => ({
          id: index + 1,
          profilePic: "",
          name: chatroom.customerName,
          messagePreview: chatroom.content,
          messageType: chatroom.messageType,
          time: chatroom.timendate,
          isRead: chatroom.isRead || false,
          statusRead: chatroom.statusRead,
          countUnread: chatroom.countUnread,
        })
      );
      setChatrooms(filteredChatrooms);
    } catch (error) {
      console.error("Error searching chatrooms: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {!searchVisible && <Text style={styles.title}>ITX WABizz</Text>}
      {!searchVisible && (
        <TouchableOpacity onPress={toggleSearch} style={styles.icon}>
          <Ionicons
            name="search-sharp"
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      )}
      {searchVisible && (
        <TouchableOpacity onPress={handleBack} style={styles.icon}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => handleSearch(text)}
        />
      )}
      <TouchableOpacity
        onPress={() => setPopoverVisible(true)}
        ref={ellipsisRef}
      >
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
      <Popover
        popoverStyle={styles.popoverStyle}
        isVisible={popoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
        from={ellipsisRef.current}
      >
        <View style={styles.popoverContent}>
          <TouchableOpacity style={styles.popoverItem}>
            <Text style={styles.popoverText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popoverItem} onPress={handlePress}>
            <Text style={styles.popoverText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Popover>
      <LogoutModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 60,
    backgroundColor: Colors.primary1,
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "bold",
    flexGrow: 100,
  },
  icon: {
    flex: 0,
    marginRight: 15,
  },
  searchInput: {
    flex: 100,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 15,
    color: "black",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: "auto",
  },
  popoverStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  popoverContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  popoverItem: {
    paddingVertical: 10,
  },
  popoverText: {
    fontSize: 16,
    color: "black",
  },
});

export default Header;
