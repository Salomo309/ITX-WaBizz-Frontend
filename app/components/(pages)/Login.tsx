import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

GoogleSignin.configure({
  webClientId:
    "224642285117-73ks59ifskuckg0qa1hre3s5fo6cisnf.apps.googleusercontent.com",
});

type loginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

// WebBrowser.maybeCompleteAuthSession();

interface UserData {
  google_id: string;
  token: string;
  email: string;
  name: string;
  picture: string;
  admin: boolean;
}

const LoginPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation<loginScreenProp>();

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      console.log("User sign in successfully");

      if (idToken) {
        AsyncStorage.setItem("@user_token", idToken);
        console.log("@user_token:", idToken);
      }
      AsyncStorage.setItem("@last_login", JSON.stringify(new Date()));
      console.log("@last_login:", JSON.stringify(new Date()));
      navigation.navigate("ChatroomList");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View className="flex w-full h-full items-center justify-center bg-[#cae4f3] space-y-4">
      <Image source={require("../../assets/images/logo.png")} />
      <TouchableOpacity
        onPress={onGoogleButtonPress}
        className="flex flex-row justify-center items-center space-x-4 bg-[#005DB4] rounded-lg px-16 py-4"
      >
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
