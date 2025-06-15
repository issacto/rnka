import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SignupSuccessPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signup successful! Please go back and login.</Text>
      <Button title="Back to Login" onPress={() => navigation.navigate('DynamicContent')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
});