import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckMark } from './CheckMark';
import { deleteTodo, fetchData } from '../api/todos';

export const Task = ({ id, title, completed, clearTodo, toggleTodo }) => {
    const [isDeleteActive, setIsDeleteActive] = useState(false);

    const handleDelete = async () => {
        await deleteTodo(id, clearTodo);
    };

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

            {isDeleteActive && (
                <Pressable onPress={handleDelete} style={styles.deleteButton}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
                </Pressable>
            )}
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
