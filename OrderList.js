import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const OrderList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http:// 172.20.10.4/coffee_shop/api.php?op=get_orders');
      setOrders(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http:// 172.20.10.4/coffee_shop/api.php?op=delete&order_id=${orderId}`);
      Alert.alert('Success', 'Order deleted');
      fetchOrders(); // Refresh orders
    } catch (error) {
      Alert.alert('Error', 'Failed to delete order');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderText}>Order ID: {item.order_id}</Text>
      <Text style={styles.orderText}>Customer: {item.customer_name}</Text>
      <Text style={styles.orderText}>Total: ${item.total_price}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { order: item })}>
        <Text style={styles.link}>View Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteOrder(item.order_id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('OrderForm')}
      >
        <Text style={styles.addButtonText}>+ Add Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  orderCard: { padding: 10, marginVertical: 5, backgroundColor: '#f9f9f9', borderRadius: 5 },
  orderText: { fontSize: 16 },
  link: { color: 'blue', marginTop: 5 },
  delete: { color: 'red', marginTop: 5 },
  addButton: { backgroundColor: '#4e2e1f', padding: 10, borderRadius: 5, position: 'absolute', bottom: 20, right: 20 },
  addButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default OrderList;
