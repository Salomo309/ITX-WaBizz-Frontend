import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  const signIn = async () => {
    try {
      const response = await fetch(
        "https://golden-worthy-basilisk.ngrok-free.app/api/auth/login",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("HASIL");
        console.log(response.url);
        console.log("HASIL TOKEN");
        console.log(response.url.token);
        let result = await WebBrowser.openAuthSessionAsync(response.url);
        router.replace("/components/ChatroomList")  
        // console.log("RESULT");
        // console.log(result);
      } else {
        console.log("Gagal mengambil data, status:", response.status);
      }
    } catch (error) {
      console.log("ADA ERROR", error);
    }
  };

  return (
    <View className="flex w-full h-full items-center justify-center bg-[#cae4f3] space-y-4">
      <Image source={require("../../assets/images/logo.png")} />
      <TouchableOpacity
        onPress={signIn}
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
