import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const DeliveryAddress = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>
      
      {/* Address Card */}
      <View style={styles.card}>
        <Text style={styles.addressName}>Prambon</Text>
        <Text style={styles.addressDetail}>Jl. Boboh prambon gg masjid</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Address Button */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBEA',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
  },
  addressName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  addressDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  updateButton: {
    backgroundColor: '#DDE5A7',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: '#E44375',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#E44375',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeliveryAddress;
