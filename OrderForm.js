import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const OrderForm = ({ navigation, route }) => {
  const [customerName, setCustomerName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handleSave = async () => {
    try {
      const newOrder = { customer_name: customerName, total_price: parseFloat(totalPrice) };
      await axios.post('http:// 172.20.10.4/coffee_shop/api.php?op=create', newOrder);
      Alert.alert('Success', 'Order saved');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save order');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text style={styles.label}>Total Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={totalPrice}
        onChangeText={setTotalPrice}
      />
      <Button title="Save Order" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default OrderForm;
