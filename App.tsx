import ChatroomList from "./app/components/(pages)/ChatroomList";
import LoginPage from "./app/components/(pages)/Login";
import Chatroom from "./app/components/(pages)/Chatroom";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ChatroomList: undefined;
  Login: undefined;
  Chatroom: { chatId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    // Try to login
    setLoggedIn(true);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isLoggedIn ? (
          <>
            <Stack.Screen name="ChatroomList" component={ChatroomList} options={{ headerShown: false }} />
            <Stack.Screen name="Chatroom" component={Chatroom} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
