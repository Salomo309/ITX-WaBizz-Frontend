import React from "react";
import { Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import ApiUrl from "./../constants/api";

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
};

const LogoutModal = ({ isVisible, onClose }: ModalProps) => {
    const handleLogout = async () => {
        try {
            const userEmail = await AsyncStorage.getItem("Email");
            if (!userEmail) {
                throw new Error("Email not found in storage");
            }

            const parsedEmail = JSON.parse(userEmail);
            const response = await fetch(ApiUrl.concat("/logout"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${parsedEmail}`,
                },
                body: JSON.stringify({
                    Email: userEmail,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to logout: ${response.status} ${response.statusText}`);
            }
            await AsyncStorage.removeItem("UserToken");
            await AsyncStorage.removeItem("Email");
            auth().signOut();
        } catch (err) {
            Alert.alert("Logout Failed", "Unable to logout. Please try again");
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal isVisible={isVisible} style={styles.modalView}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Logout</Text>
                    <Text style={styles.modalText}>
                        Are you sure you want to logout?
                    </Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={styles.logoutButton}
                        >
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%", // Set this to whatever width you like
        alignItems: "center",
    },
    modalTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    modalText: {
        fontSize: 16,
        color: "black",
        paddingTop: 16,
        paddingBottom: 16,
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    cancelButton: {
        borderColor: "#6c7179",
        borderWidth: 2,
        padding: 10,
        borderRadius: 4,
        marginRight: 8, // Adjust as needed for your spacing
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#4B5563",
    },
    logoutButton: {
        backgroundColor: "#1663B1",
        borderColor: "#1663B1",
        borderWidth: 2,
        padding: 10,
        borderRadius: 4,
    },
    logoutButtonText: {
        fontSize: 16,
        color: "white",
    },
});

export default LogoutModal;
