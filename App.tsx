import Chatroom from "./app/components/(pages)/Chatroom";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatroomList from "./app/components/(pages)/ChatroomList";
import LoginPage from "./app/components/(pages)/Login";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  ChatroomList: undefined;
  Login: undefined;
  Chatroom: { chatId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const lastLoginString = await AsyncStorage.getItem("@last_login");
    if (lastLoginString) {
      const lastLogin = new Date(JSON.parse(lastLoginString));
      const now = new Date();
      const diff = now.getTime() - lastLogin.getTime();
      const hoursDiff = diff / (1000 * 60 * 60);
      if (hoursDiff > 24) {
        setLoggedIn(false);
        auth().signOut();
      }
    }

    auth().onAuthStateChanged((user) => {
      const userIsLoggedIn = !!user;
      setLoggedIn(userIsLoggedIn);
      if (userIsLoggedIn) {
        AsyncStorage.setItem("@last_login", JSON.stringify(new Date()));
      }
    });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isLoggedIn ? (
          <Stack.Screen name="ChatroomList" component={ChatroomList} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
