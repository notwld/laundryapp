import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../Header';

export default function Orders(props) {
    const orders = [
        {
            orderID: 1,
            customerName: 'John Doe',
            orderDate: '2023-06-01',
            totalCost: 50.0,
            orderStatus: 'Pending',
        },
        {
            orderID: 2,
            customerName: 'Jane Smith',
            orderDate: '2023-06-02',
            totalCost: 75.0,
            orderStatus: 'Completed',
        },
        // Add more orders as needed
    ];
    const { user } = props.route.params;
    const { token } = props.route.params;
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleEditOrder = (orderID) => {

        console.log('Edit Order:', orderID);
    };

    const handleDeleteOrder = (orderID) => {

        console.log('Delete Order:', orderID);
    };
    return (
        <View style={styles.container}>
            <Header user={user} token={token} />
            <View style={{
                padding: 16,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 31,
                    fontWeight: 'bold',
                    marginBottom: 16,
                }}>
                    Orders
                </Text>
                {orders.map((order) => (
                    <View key={order.orderID} style={styles.card}>
                        <Text style={styles.customerName}>{order.customerName}</Text>
                        <Text style={styles.orderDate}>Order Date: {order.orderDate}</Text>
                        <Text style={styles.totalCost}>Total Cost: {order.totalCost}</Text>
                        <Text style={styles.orderStatus}>Status: {order.orderStatus}</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => handleEditOrder(order.orderID)}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteOrder(order.orderID)}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    orderDate: {
        fontSize: 16,
        marginBottom: 4,
    },
    totalCost: {
        fontSize: 16,
        marginBottom: 4,
    },
    orderStatus: {
        fontSize: 16,
        marginBottom: 4,
    },
    editButton: {
        backgroundColor: '#5134FF',
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
