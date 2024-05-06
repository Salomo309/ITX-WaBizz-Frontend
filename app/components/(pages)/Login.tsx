import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiUrl from "./../../constants/api";

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
      const { idToken, user } = await GoogleSignin.signIn();

      // Fetch user active status
      const isActive = await checkUserActive(user.email);
      console.log("BALIK");
      console.log(isActive);
      if (isActive) {
        if (idToken) {
          AsyncStorage.setItem("@user_token", idToken);
          console.log("@user_token:", idToken);
        }
        AsyncStorage.setItem("@last_login", JSON.stringify(new Date()));
        console.log("@last_login:", JSON.stringify(new Date()));
        console.log("GO IN");
        // Autheticating with Firebase Auth
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(
          googleCredential
        );
        console.log("User sign in successfully");
        navigation.navigate("ChatroomList");
      } else {
        console.log("GO OUT");
        AsyncStorage.removeItem("@user_token");
        auth().signOut();
        console.log("FINAL");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function checkUserActive(email: string) {
    try {
      const response = await fetch(ApiUrl.concat("/user/all"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched user data:", data);
      console.log("MASUKKK", email);
      const user = data.Users.find((u: { Email: string }) => u.Email === email);
      console.log("Matching user:", user);
      if (user && user.IsActive) {
        console.log("YES");
        return true;
      }
      console.log("NOO");
      return false;
    } catch (error) {
      console.error("Error fetching user: ", error);
      return false;
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
