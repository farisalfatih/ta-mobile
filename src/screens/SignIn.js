import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Handler untuk navigasi Sign In
  const handleSignIn = () => {
    // Logika autentikasi bisa ditambahkan di sini
    alert(`Email: ${email}, Password: ${password}`);
    navigation.navigate('Home'); // Navigasi ke screen Home
  };

  return (
    <View style={styles.container}>
      {/* Sign In Form */}
      <View style={styles.form}>
        <Text style={styles.title}>Sign In</Text>
      </View>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('/')}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Social Media Links */}
      <Text style={styles.orText}>Or</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com')} style={styles.socialIcon}>
          <Text style={styles.socialText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')} style={styles.socialIcon}>
          <Text style={styles.socialText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:example@mail.com')} style={styles.socialIcon}>
          <Text style={styles.socialText}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don’t have an account yet?{' '}
        <Text
          onPress={() => navigation.navigate('SignUp')} 
          style={styles.signUpLink}
        >
          Sign Up
        </Text>
      </Text>
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
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#000',
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#4e2e1f',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
    marginBottom: 20,
  },
  socialIcon: {
    fontSize: 30,
  },
  socialText: {
    fontSize: 18,
    color: '#000',
  },
  signUpText: {
    fontSize: 16,
    color: '#000',
  },
  signUpLink: {
    color: '#4e2e1f',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
