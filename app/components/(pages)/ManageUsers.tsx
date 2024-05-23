import {
    Text,
    TextInput,
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Switch,
    TouchableOpacity,
} from "react-native";
import HeaderManageUsers from "../HeaderManageUsers";
import Colors from "./../../constants/colors";
import { API_URL } from "@env";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ManageUsersScreenRouteProp = RouteProp<RootStackParamList, "ManageUsers">;

export interface Users {
    name: string;
    email: string;
    isActive: boolean;
}

const User: React.FC<Users> = ({ name, email, isActive }) => {
    const [isActiveToggle, setIsActiveToggle] = useState<boolean>(isActive);

    useEffect(() => {
        const fetchActivation = async () => {
            try {
                const userEmail = await AsyncStorage.getItem("Email");
                if (!userEmail) {
                    throw new Error("Email not found in storage");
                }

                const parsedEmail = JSON.parse(userEmail);
                const API_URL = isActiveToggle
                    ? "/user/active"
                    : "/user/inactive";
                const response = await fetch(
                    API_URL.concat(API_URL + "?email=" + email),
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${parsedEmail}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("User: ", data);
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        fetchActivation();
    }, [isActiveToggle]);

    const toggleIsActive = () => {
        setIsActiveToggle(!isActiveToggle);
    };

    return (
        <View className="w-[100%] h-[50] flex-row align-center justify-center mb-[18] pl-10 pr-10">
            <View className="w-[85%] h-[50] flex-column align-start justify-center">
                <Text
                    className="w-[85%] font-[Roboto] font-bold text-base text-black mb-[2]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <Text
                    className="w-[85%] font-[Roboto] font-regular text-sm text-black"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {email}
                </Text>
            </View>
            <Switch
                value={isActiveToggle}
                onValueChange={toggleIsActive}
                trackColor={{ false: "#767577", true: Colors.primary1 }}
                thumbColor={isActiveToggle ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
        </View>
    );
};

const ManageUsers = () => {
    const route = useRoute<ManageUsersScreenRouteProp>();
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        const fecthUsers = async () => {
            try {
                const userEmail = await AsyncStorage.getItem("Email");
                if (!userEmail) {
                  throw new Error("Email not found in storage");
              }

              const parsedEmail = JSON.parse(userEmail);
                const response = await fetch(API_URL.concat("/user/all"), {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${parsedEmail}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Users: ", data);

                const usersData = data.Users;

                const users = usersData.map((user: any) => ({
                    name: user.Email,
                    email: user.Email,
                    isActive: user.IsActive,
                }));

                setUsers(users);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fecthUsers();
    }, []);

    const [newUserEmail, setNewUserEmail] = useState("");
    const [showTextInput, setShowTextInput] = useState(false);

    const handleAddUser = () => {
        if (newUserEmail.trim() === "") {
            return;
        }
        const fetchAdd = async () => {
            try {
                const userEmail = await AsyncStorage.getItem("Email");
                if (!userEmail) {
                  throw new Error("Email not found in storage");
              }

              const parsedEmail = JSON.parse(userEmail);
                const response = await fetch(API_URL.concat("/user/insert"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${parsedEmail}`,
                    },
                    body: JSON.stringify({
                        email: newUserEmail,
                        is_active: true,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("User:", data);
            } catch (error) {
                console.error("Error adding user:", error);
            }
        };

        fetchAdd();
        setUsers([
            ...users,
            { name: newUserEmail, email: newUserEmail, isActive: true },
        ]);
        setNewUserEmail("");
        setShowTextInput(false);
    };

    const handleShowTextInput = () => {
        setShowTextInput(true);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar backgroundColor={Colors.primary1} />
                <HeaderManageUsers />
                <Text style={styles.titleText}>List Users</Text>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        {/* Dummy data */}
                        {users.map((user) => (
                            <User key={user.email} {...user} />
                        ))}
                    </ScrollView>
                    {/* Bottom container for adding new user */}
                    <View style={styles.bottomContainer}>
                        {!showTextInput && (
                            <View style={styles.addButtonContainer}>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleShowTextInput}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {/* Input field for new user */}
                        {showTextInput && (
                            <View style={styles.inputContainer}>
                                <TouchableOpacity
                                    onPress={() => setShowTextInput(false)}
                                    style={styles.backButton}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={20}
                                        color={Colors.black}
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    value={newUserEmail}
                                    onChangeText={setNewUserEmail}
                                    placeholder="Enter email"
                                />
                                <TouchableOpacity
                                    style={styles.addUserButton}
                                    onPress={handleAddUser}
                                >
                                    <Text style={styles.addUserButtonText}>
                                        Add User
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },

    scrollViewContainer: {
        flex: 1,
        paddingBottom: 70,
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "lightgray",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    backButton: {
        padding: 5,
    },
    titleText: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#5F6368",
        fontSize: 16,
        textAlign: "left",
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 25,
        paddingBottom: 20,
    },
    addButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        marginLeft: 10,
    },
    input: {
        flex: 1,
        color: "black",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: Colors.primary1,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 10,
    },
    addUserButton: {
        backgroundColor: Colors.primary1,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 10,
        minWidth: 100,
    },
    buttonText: {
        color: "white",
        fontSize: 30,
    },
    addUserButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ManageUsers;
