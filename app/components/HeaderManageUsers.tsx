import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Colors from "./../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface HeaderChatProps {
  profilePic: string;
  userName: string;
}

const HeaderManageUsers: React.FC = ({ }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <View className="flex-row justify-start items-center px-[24] h-[60] bg-primary-1">
      <TouchableOpacity onPress={handleBack} style={styles.icon}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      <Text style={styles.title}>Manage Users</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flex: 0,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "bold",
    flexGrow: 100,
  },
})

export default HeaderManageUsers;
