import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Link, router } from "expo-router";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const LogoutModal = ({ isVisible, onClose }: ModalProps) => {
  const logOut = async () => {
    // console.log("terklik");
    try {
      const response = await fetch("https://30c9-36-79-175-119.ngrok-free.app/api/auth/logout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("masuk");
      console.log("YEAY DATA", response);
      router.replace("/components/Login");
    } catch (error) {
      console.log("ADA ERROR", error);
    }
  };
  return (
    <View className="flex items-center justify-center">
      <Modal
        isVisible={isVisible}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-white p-5 rounded-xl">
          <Text className="text-xl font-bold">Logout</Text>
          <Text className="text-base text-gray-400 py-4">
            Are you sure you want to logout?
          </Text>
          <View className="flex-row justify-end">
            <View className="flex px-2">
              <TouchableOpacity
                onPress={onClose}
                className="border-[#6c7179]  px-4 py-2 rounded-md border-2"
              >
                <Text className="text-base text-[#4B5563]">Cancel</Text>
              </TouchableOpacity>
              {/* <Button title="Cancel" onPress={onClose} color="#4B5563" /> */}
            </View>
            <View className="flex px-2">
              {/* <Link href={"/components/Login"} asChild> */}
              <TouchableOpacity
                onPress={logOut}
                className="bg-[#1663B1] border-[#1663B1] border-2 px-4 py-2 rounded-md"
              >
                <Text className="text-base text-white">Logout</Text>
              </TouchableOpacity>
              {/* </Link> */}
              {/* <Button title="Logout" onPress={() => {}} color="#2563EB" /> */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogoutModal;
