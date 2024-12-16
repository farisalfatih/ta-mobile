import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetails = ({ route }) => {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text>Order ID: {order.order_id}</Text>
      <Text>Customer Name: {order.customer_name}</Text>
      <Text>Total Price: ${order.total_price}</Text>
      <Text>Order Status: {order.status}</Text>
      <Text>Items:</Text>
      {order.items.map((item, index) => (
        <Text key={index}>- {item.item_name} x{item.quantity}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default OrderDetails;
