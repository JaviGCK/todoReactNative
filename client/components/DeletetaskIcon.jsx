import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DeleteTaskIcon = ({ onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.deleteButton}>
            <Feather name="trash-2" size={20} color="white" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ef4444',
        borderRadius: 15,
        marginLeft: 10,
    },
});

export default DeleteTaskIcon;
