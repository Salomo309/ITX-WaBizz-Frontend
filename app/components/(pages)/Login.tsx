import React, { useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StatusBar,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiUrl from "./../../constants/api";
import messaging from "@react-native-firebase/messaging";

GoogleSignin.configure({
    webClientId:
        "224642285117-73ks59ifskuckg0qa1hre3s5fo6cisnf.apps.googleusercontent.com",
});

type loginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

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
    const navigation = useNavigation<loginScreenProp>();

    useEffect(() => {
        requestUserPermission();
        getToken();
    }, []);

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log("Authorization status:", authStatus);
        }
    };

    const getToken = async () => {
        const token = await messaging().getToken();
        console.log("Token =", token);
        setToken(token);
    };

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            await GoogleSignin.signOut();
            const { idToken, user } = await GoogleSignin.signIn();

            if (idToken) {
                const loginResponse = await login(user.email, token);

                if (loginResponse && loginResponse.Message !== undefined) {
                    await AsyncStorage.setItem(
                        "IsAdmin",
                        JSON.stringify(loginResponse.IsAdmin)
                    );
                    await AsyncStorage.setItem(
                        "Email",
                        JSON.stringify(user.email)
                    );
                    console.log("IsAdmin:", loginResponse.IsAdmin);

                    const googleCredential =
                        auth.GoogleAuthProvider.credential(idToken);
                    await auth().signInWithCredential(googleCredential);

                    AsyncStorage.setItem("UserToken", idToken);
                    AsyncStorage.setItem(
                        "@last_login",
                        JSON.stringify(new Date())
                    );

                    console.log("User signed in successfully");
                    navigation.navigate("ChatroomList");
                } else {
                    Alert.alert(
                        "Error",
                        "Email anda tidak terdaftar atau sedang tidak aktif, silahkan kontak admin untuk login"
                    );
                    console.log("Login failed:", loginResponse?.Message);
                }
            }
        } catch (error) {
            console.log("Error during Google Sign-In:", error);
        }
    };

    const login = async (email: string, deviceToken: string) => {
        try {
            const response = await fetch(ApiUrl.concat("/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email: email,
                    DeviceToken: deviceToken,
                }),
            });
            console.log("AAA" + deviceToken);

            const data = await response.json();
            console.log("Login response:", data);
            return data;
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

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
