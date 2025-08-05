import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SimpleWelcomeScreen() {
  console.log('SimpleWelcomeScreen rendered');
  
  const handleTestPress = () => {
    console.log('handleTestPress called');
    Alert.alert('Success!', 'Touch is working!');
  };

  const handleSignIn = () => {
    console.log('Sign In button pressed');
    router.push('/auth/login');
  };

  const handleCreateAccount = () => {
    console.log('Create Account button pressed');
    router.push('/auth/register');
  };

  return (
    <SafeAreaView 
      style={styles.container}
      onTouchStart={() => console.log('SafeAreaView touched')}
    >
      <View 
        style={styles.content}
        onTouchStart={() => console.log('Content view touched')}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>M</Text>
          </View>
          
          <Text style={styles.title}>Welcome to MzigoEgo</Text>
          <Text style={styles.subtitle}>
            Fast, reliable delivery service at your fingertips. Send packages anywhere, anytime.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Test Button */}
          <TouchableOpacity style={styles.testButton} onPress={handleTestPress}>
            <Text style={styles.buttonText}>Test Touch</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          {/* Create Account Button */}
          <TouchableOpacity style={styles.secondaryButton} onPress={handleCreateAccount}>
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 160,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FF7010',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#171717',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  buttonContainer: {
    gap: 16,
  },
  testButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF7010',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF7010',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#FF7010',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 24,
  },
  termsText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
});
