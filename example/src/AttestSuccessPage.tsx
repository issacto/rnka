import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

export default function AttestSuccessPage({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.text}>
          You are now logged in and the backend is confident that this request is sent from a device whose key is stored in secure storage.
        </Text>
        <Button title="Back to Menu" onPress={() => navigation.navigate('Menu')} color="#007AFF" />
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
  text: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
});