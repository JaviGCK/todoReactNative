import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckMark } from './CheckMark';
import { Feather } from "@expo/vector-icons";
import { deleteTodo, fetchData } from '../api/todos';
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SharedTodoModalContent } from './SharedToDoModalContent';
import { TodoModalContent } from './ToDoModalContent';

export const Task = ({ id, title, shared_with_id, completed, clearTodo, toggleTodo }) => {
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const [shareIcon, setShareIcon] = useState('share'); // Estado para controlar qué icono mostrar

    const bottomSheetModalRef = React.useRef(null);
    const sharedBottomSheetRef = React.useRef(null);
    const snapPoints = ["25%", "48%", "75%"];
    const snapPointsShared = ["40%"];

    const handlePresentModal = () => {
        bottomSheetModalRef.current?.present();
    }

    const handlePresentShared = () => {
        sharedBottomSheetRef.current?.present();
    }

    const handleDelete = async (id) => {
        await deleteTodo(id, clearTodo);
    };

    // Utilizar useEffect para actualizar el estado del icono cuando cambie shared_with_id
    useEffect(() => {
        if (shared_with_id !== null) {
            setShareIcon('users');
        } else {
            setShareIcon('share');
        }
        fetchData()
    }, [shared_with_id]);

    return (
        <TouchableOpacity
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
            style={styles.container}
        >
            <View style={styles.containerTextCheckBox}>
                <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
                <Text style={styles.text}>{title}</Text>
            </View>

            {/* Utilizar el estado shareIcon para decidir qué icono mostrar */}
            <Feather
                onPress={shared_with_id !== null ? handlePresentShared : handlePresentModal}
                name={shareIcon}
                size={20}
                color="#383839"
            />

            {isDeleteActive && (
                <Pressable onPress={() => handleDelete(id)} style={styles.deleteButton}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
                </Pressable>
            )}

            {/* shared todos info */}
            <BottomSheetModal
                ref={sharedBottomSheetRef}
                snapPoints={snapPointsShared}
                backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
                <SharedTodoModalContent
                    id={id}
                    title={title}
                    shared_with_id={shared_with_id}
                    completed={completed}
                />
            </BottomSheetModal>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={2}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
                <TodoModalContent id={id} title={title} />
            </BottomSheetModal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 14,
        borderRadius: 21,
        marginBottom: 10,
        backgroundColor: "white",
    },
    containerTextCheckBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        color: "#383839",
        letterSpacing: -0.011 * 16,
        flexShrink: 1,
        marginHorizontal: 8,
    },
    deleteButton: {
        position: "absolute",
        right: 0,
        top: -6,
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ef4444",
        borderRadius: 10,
    },
});
