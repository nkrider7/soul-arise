import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook';
import { sellItem } from '~/src/store/slices/inventorySlice';

type InventoryModalProps = {
    visible: boolean;
    onClose: () => void;
};

function InventoryModal({ visible, onClose }: InventoryModalProps) {
    const dispatch = useAppDispatch();
    const inventory = useAppSelector(state => state.inventory.items);

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    {/* Prevent clicks on modal body from closing */}
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalContainer}>

                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Inventory</Text>
                                <View style={styles.headerRight}>
                                    <Text style={styles.headerTotal}>Total: {inventory.length}</Text>
                                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>⌃</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Inventory Grid */}
                            <FlatList
                                data={inventory}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                                columnWrapperStyle={styles.columnWrapper}
                                contentContainerStyle={styles.listContent}
                                renderItem={({ item }) => (
                                    <View style={styles.itemCard}>
                                        {/* Image placeholder */}
                                        <View style={styles.imagePlaceholder} />

                                        {/* Item Details */}
                                        <View style={styles.itemDetails}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemDesc}>{item.description}</Text>
                                            <Text style={styles.itemType}>Type: {item.type}</Text>
                                            <TouchableOpacity onPress={() => dispatch(sellItem(item.id))}>
                                                <Text>Sell</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default InventoryModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)', // transparent black
    },
    modalContainer: {
        backgroundColor: '#1F2937', // gray-800
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTotal: {
        color: 'white',
        marginRight: 8,
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    listContent: {
        paddingBottom: 16,
    },
    itemCard: {
        backgroundColor: '#374151', // gray-700
        borderRadius: 12,
        padding: 10,
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: 48,
        height: 48,
        backgroundColor: '#4B5563', // gray-600
        borderRadius: 8,
        marginRight: 8,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    itemDesc: {
        color: '#D1D5DB', // gray-300
        fontSize: 10,
    },
    itemType: {
        color: '#9CA3AF', // gray-400
        fontSize: 10,
        marginTop: 4,
    },
});
