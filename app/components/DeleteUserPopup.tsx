// DeleteUserPopup.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DeleteUserPopupProps {
  visible: boolean;
  user: { name: string; email: string };
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteUserPopup: React.FC<DeleteUserPopupProps> = ({
  visible,
  user,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Delete User</Text>
          <Text style={styles.popupMessage}>
            Are you sure you want to delete {user.name} ({user.email}) from the
            user list?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onClick={onCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onClick={onDelete}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: { backgroundColor: "white", padding: 16, borderRadius: 8 },
  popupTitle: { fontSize: 18, fontWeight: "bold" },
  popupMessage: { marginVertical: 12 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: { padding: 8, backgroundColor: "#ccc", borderRadius: 4 },
  deleteButton: { padding: 8, backgroundColor: "red", borderRadius: 4 },
});

export default DeleteUserPopup;
