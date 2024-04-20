import {
  View,
  Text,
  Image,
} from "react-native";

interface HeaderChatProps {
  userName: string;
}

const HeaderChat: React.FC<HeaderChatProps> = ({ userName }) => {

  return (
    <View className="flex-row justify-start items-center px-[24] h-[60] bg-primary-1">
            <Image
                source={require("../assets/images/Avatar.png")}
                className="w-[40] h-[40] rounded-full mr-[16]"
            />
            <Text className="text-xl text-white font-[Roboto] font-bold">
                {userName}
            </Text>
    </View>
  );
};

export default HeaderChat;
