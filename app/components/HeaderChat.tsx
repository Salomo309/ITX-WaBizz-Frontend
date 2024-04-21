import {
  View,
  Text,
  Image,
  ScrollView
} from "react-native";

interface HeaderChatProps {
  profilePic: string;
  userName: string;
}

const HeaderChat: React.FC<HeaderChatProps> = ({ profilePic, userName }) => {
  return (
    <View className="flex-row justify-start items-center px-[24] h-[60] bg-primary-1">
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
    </View>
  );
};

export default HeaderChat;
