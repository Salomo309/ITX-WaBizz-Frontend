import React, { useState } from "react";
import UserList from "../UserList";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DeleteUserPopup from "../DeleteUserPopup";
import AddUserPopup from "../AddUserPopup";

const ManageUsers = () => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleDeleteUser = (user: { name: string; email: string }) => {
    setSelectedUser(user);
    setIsDeletePopupVisible(true);
  };

  const handleAddUser = (email: string) => {
    console.log("Added user:", email);
    setIsAddPopupVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Users</Text>
      </View>
      <UserList onDeleteUser={handleDeleteUser} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddPopupVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add User</Text>
      </TouchableOpacity>
      <DeleteUserPopup
        visible={isDeletePopupVisible}
        user={selectedUser}
        onCancel={() => setIsDeletePopupVisible(false)}
        onDelete={() => {
          console.log("Delete user:", selectedUser);
          setIsDeletePopupVisible(false);
        }}
      />
      <AddUserPopup
        visible={isAddPopupVisible}
        onCancel={() => setIsAddPopupVisible(false)}
        onAdd={handleAddUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { padding: 16, backgroundColor: "#007bff", alignItems: "center" },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  addButton: { backgroundColor: "#007bff", padding: 12, alignItems: "center" },
  addButtonText: { color: "white", fontSize: 16 },
});

export default ManageUsers;
