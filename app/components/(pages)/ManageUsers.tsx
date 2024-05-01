import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import HeaderManageUsers from "../HeaderManageUsers";
import Colors from "./../../constants/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { useState } from "react";

type ManageUsersScreenRouteProp = RouteProp<RootStackParamList, 'ManageUsers'>;

export interface Users {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const User : React.FC<Users> = ({
    id,
    name,
    email,
    isActive
  }) => {
    const [isActiveToggle, setIsActiveToggle] = useState<boolean>(isActive);

    const toggleIsActive = () => {
        setIsActiveToggle(!isActiveToggle);
        // call backend API here
    };

    return (
        <View className="w-full h-[50] flex-row align-start justify-center mb-[18]">
            <View className="w-full h-[50] flex-column align-start justify-center">
                <Text
                    className="w-[85%] font-[Roboto] font-bold text-base text-black mb-[2]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <Text
                    className="w-[85%] font-[Roboto] font-regular text-base text-black mb-[2]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {email}
                </Text>
            </View>
            <Switch value={isActiveToggle} onValueChange={toggleIsActive} />
        </View>
    )
}

const ManageUsers = () => {
    const route = useRoute<ManageUsersScreenRouteProp>();
    /* Dummy data */
    const users = [
        { id: 1, name: 'Dillon Audris', email: 'godillon@example.com', isActive: true },
        { id: 2, name: 'Austin Pardosi', email: 'austinpardosi@example.com', isActive: false },
        { id: 3, name: 'Manuella Sianipar', email: 'manuella@example.com', isActive: true },
        { id: 4, name: 'Salomo Manalu', email: 'salmanalu@example.com', isActive: false },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor={Colors.primary1} />
            <HeaderManageUsers/>
            <Text>List Users</Text>
            <User id={0} name={"name"} email={"13521059@std.stei.itb.ac.id"} isActive={true} />
            <ScrollView>
                <Text>List Users</Text>

                {/* Dummy data  */}
                {users.map((user) => (
                    <User key={user.id} {...user} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ManageUsers;