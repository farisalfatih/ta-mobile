import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const DeliveryAddress1 = () => {
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

      {/* Address Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex : Home, Office"
          placeholderTextColor="#aaa"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Address Detail Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address Detail</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex : Tower A, Room 22"
          placeholderTextColor="#aaa"
          value={addressDetail}
          onChangeText={setAddressDetail}
        />
      </View>

      {/* Recipient Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipient’s Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex : Cynthia"
          placeholderTextColor="#aaa"
          value={recipientName}
          onChangeText={setRecipientName}
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex : +620-000-000"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Save Address Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e0d1',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
    elevation: 2,
    shadowColor: '#000',
  },
  saveButton: {
    backgroundColor: '#4e2e1f',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryAddress1;
