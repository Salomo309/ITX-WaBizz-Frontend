import { Link } from "expo-router";
import { View } from "react-native";
import ChatroomList from "./components/(pages)/ChatroomList";
import LoginPage from "./components/(pages)/Login";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    // Try to login
    setLoggedIn(true);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoggedIn) {
    return <ChatroomList />;
  } else {
    return <LoginPage />;
  }
};

export default Index;
