import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const DeliveryAddress = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

       {/* Back and Love Icons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBack}>
                <Icon name="arrow-left" size={30} color="#4e2e1f" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Loved!')} style={styles.iconLove}>
                <Icon name="heart" size={30} color="#4e2e1f" />
              </TouchableOpacity>
            </View>
      
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
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('DeliveryAddress1')} 
      >
        <Text style={styles.createButtonText}>Create Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e0d1',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  iconBack: {
    position: 'absolute',
    left: 0,
  },
  iconLove: {
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    padding: 20,
    marginVertical: 60,
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
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: '#f00',
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
    backgroundColor: '#4e2e1f',
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
