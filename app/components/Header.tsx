import React, { useState } from "react";
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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";
import Popover from "react-native-popover-view";
import LogoutModal from "./LogoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

interface HeaderProps {
  userProfilePic: string;
}

const Header: React.FC<HeaderProps> = ({ userProfilePic }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleBack = () => {
    setSearchVisible(false);
    // Additional logic can be added here if needed
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

  return (
    <View style={styles.container}>
      {!searchVisible && <Text style={styles.title}>ITX WABizz</Text>}
      {!searchVisible && (
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons
            name="search-sharp"
            size={24}
            color={Colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {searchVisible && (
        <TouchableOpacity onPress={handleBack}>
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
          onChangeText={(text) => setSearchText(text)}
        />
      )}
      <TouchableOpacity onPress={() => setPopoverVisible(true)}>
        {userProfilePic == "" ? (
          <Ionicons
            name="person-circle-sharp"
            size={30}
            color={Colors.white}
            style={styles.icon}
          />
        ) : (
          <Image source={{ uri: userProfilePic }} style={styles.profileImage} />
        )}
      </TouchableOpacity>
      <Popover
        popoverStyle={styles.popoverStyle}
        isVisible={popoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
        from={<View />}
      >
        <View style={styles.popoverContent}>
          <TouchableOpacity style={styles.popoverItem} onPress={handlePress}>
            <Text style={styles.popoverText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popoverItem} onPress={handleLogout}>
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
    marginRight: "auto",
  },
  icon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 15,
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
  },
});

export default Header;
