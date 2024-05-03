// AddUserPopup.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface AddUserPopupProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (email: string) => void;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({
  visible,
  onCancel,
  onAdd,
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Add User</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onClick={onCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onClick={() => onAdd(email)}
            >
              <Text>Add</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginVertical: 12,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: { padding: 8, backgroundColor: "#ccc", borderRadius: 4 },
  addButton: {
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 4,
    color: "white",
  },
});

export default AddUserPopup;
