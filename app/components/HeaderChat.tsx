import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";

interface HeaderChatProps {
  profilePic: string;
  userName: string;
}

const HeaderChat: React.FC<HeaderChatProps> = ({ profilePic, userName }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleBack = () => {
    setSearchVisible(false);
    setSearchText("");
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);
    // TODO: search
  };

  return (
    <View className="flex-row justify-start items-center px-[24] h-[60] bg-primary-1">
      {!searchVisible && (
        <>
          {profilePic == null || profilePic == "" ? (
            <Image
              source={require("../assets/images/Avatar.png")}
              className="w-[40] h-[40] rounded-full mr-[16]"
            />
          ) : (
            <Image
              source={{ uri: profilePic }}
              className="w-[40] h-[40] rounded-full mr-[16]"
            />
          )}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-xl text-white font-[Roboto] font-bold"
            >
              {userName}
            </Text>
          </ScrollView>
        </>
      )}
      {!searchVisible && (
        <TouchableOpacity onPress={toggleSearch} style={styles.icon}>
          <Ionicons name="search-sharp" size={24} color={Colors.white} />
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

export default HeaderChat;
