import React from "react";
import { ListRenderItemInfo } from "react-native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Trash2 } from "lucide-react-native";

export interface User {
  id: number;
  name: string;
  email: string;
}

const users = [
  { id: 1, name: "Go Dillon Audris", email: "godillon@example.com" },
  { id: 2, name: "Austin Pardosi", email: "austinpardosi@example.com" },
  { id: 3, name: "Manuella Sianipar", email: "manuella@example.com" },
  { id: 4, name: "Salomo Manalu", email: "salmanalu@example.com" },
];

const renderItem = ({ item }: ListRenderItemInfo<User>) => (
  <View style={styles.userRow}>
    <Text style={styles.userInitial}>{item.name.charAt(0)}</Text>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
    <TouchableOpacity>
      <Trash2 size={20} color="gray" />
    </TouchableOpacity>
  </View>
);

const UserList = () => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userInitial: {
    backgroundColor: "#7c4dff",
    borderRadius: 20,
    padding: 8,
    color: "white",
  },
  userInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 16, fontWeight: "bold" },
  userEmail: { fontSize: 14, color: "gray" },
});

export default UserList;
