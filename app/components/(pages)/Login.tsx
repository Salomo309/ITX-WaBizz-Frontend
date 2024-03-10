import { Text, TouchableOpacity, View, Image, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const LoginPage = () => {
  const [userData, setUserData] = useState(null);
  const redirectUri = makeRedirectUri();

  useEffect(() => {
    // Listen for changes in the URL to handle the OAuth callback
    const subscription = Linking.addEventListener("url", (event) => {
      const { url } = event;
      if (
        url.includes(
          "https://30c9-36-79-175-119.ngrok-free.app/api/auth/google/callback?state=test&code=4%2F0AeaYSHBdVjA6Y_iGBwAYHD7VZW_OAmJhMC4ReYNPE4r0Ki8GJKp8rnNQjeSrn7CRLhaQ-A&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&hd=std.stei.itb.ac.id&prompt=none"
        )
      ) {
        // Your logic to handle the callback and fetch user data
        // Make sure to replace this with your actual logic to process the callback URL
        console.log("OAuth callback URL:", url);
      }
    });

    return () => {
      // Remove the event listener when the component unmounts
      subscription.remove();
    };
  }, []);

  const signIn = async () => {
    try {
      const response = await fetch(
        "https://30c9-36-79-175-119.ngrok-free.app/api/auth/login",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(userData);
        // const jsonResponse = await response.json();

        console.log("HASIL");
        console.log(response.url);
        await WebBrowser.openBrowserAsync(response.url);
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
