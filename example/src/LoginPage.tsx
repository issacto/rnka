import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { z } from 'zod';
import { BACKEND_URL } from './constants';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(7, 'Password must be at least 7 characters'),
});

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const result = schema.safeParse({ username, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError('');
    try {
      const url = `${BACKEND_URL}/login`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password }).toString(),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed');
        return;
      }
      const accessToken = response.headers.get('access_token');
      const challenge = response.headers.get('challenge');
      if (!accessToken || !challenge) {
        setError('Missing access token or challenge in response');
        return;
      }
      navigation.navigate('Token', { accessToken, challenge });
    } catch (e) {
      setError('Network error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
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
          <Button title="Enter" onPress={handleLogin} color="#34C759" />
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