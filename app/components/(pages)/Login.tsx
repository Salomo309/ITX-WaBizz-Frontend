import { Text, TouchableOpacity, View, Image, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const signIn = async () => {
    // console.log("terklik");
    try {
      const response = await fetch(
        "https://ea2e-36-79-175-119.ngrok-free.app/api/login",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);

      if (response.ok) {
        // Pastikan responsnya ok sebelum melanjutkan
        console.log(response);
        const data = await response.json();
        if (data && data.url) {
          Linking.openURL(data.url);
        }
        // console.log("return");
        // console.log(response);

        // const jsonResponse = await response.json(); // Tambahkan `await` untuk menunggu promise selesai
        // console.log("masuk");
        // console.log(jsonResponse);
        // console.log("YEAY DATA", jsonResponse, response.status); // jsonResponse sekarang berisi objek JSON yang diharapkan
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
