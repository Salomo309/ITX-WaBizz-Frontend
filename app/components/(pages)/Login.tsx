import { Text, TouchableOpacity, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

const LoginPage = () => {
  return (
    <View className="flex w-full h-full items-center justify-center bg-[#cae4f3] space-y-4">
      <Image source={require("../../assets/images/logo.png")} />
      <TouchableOpacity className="flex flex-row justify-center items-center space-x-4 bg-[#005DB4] rounded-lg px-16 py-4">
        <Image source={require("../../assets/icons/google.png")} />
        <Text className="text-white font-bold text-lg">
          Sign in with Google
        </Text>
      </TouchableOpacity>
      <StatusBar hidden={true} />
    </View>
  );
};

export default LoginPage;
