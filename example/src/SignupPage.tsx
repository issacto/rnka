import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { z } from 'zod';
import { BACKEND_URL } from './constants';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(7, 'Password must be at least 7 characters'),
});

export default function SignupPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    const result = schema.safeParse({ username, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError('');
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Signup failed');
        return;
      }
      navigation.navigate('SignupSuccess');
    } catch (e) {
      setError('Network error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.title}>Signup</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#888"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.buttonWrapper}>
          <Button title="Enter" onPress={handleSignup} color="#007AFF" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Back" onPress={() => navigation.goBack()} color="#8e8e93" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f7', justifyContent: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    margin: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#222' },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#222',
  },
  error: { color: 'red', marginBottom: 10 },
  buttonWrapper: { width: '100%', marginVertical: 8 },
});