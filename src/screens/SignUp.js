import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation(); // Define navigation hook

  const handleSignUp = () => {
    // Handle sign up logic (you can add actual sign up API calls here)
    Alert.alert(
      'Sign Up',
      'Email: ${email}\nPassword: ${password}\nPhone Number: ${phoneNumber}',
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('SignIn') // Navigate to Home screen after sign up
        }
      ]
    );
  };  

  return (
    <View style={styles.container}>
      {/* Sign Up Form */}
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          required
        />

        {/* Phone Number Input */}
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
          required
        />

        {/* Sign Up Button */}
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e0d1',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#4e2e1f',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4e2e1f',
    marginBottom: 15,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#4e2e1f',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignUp;