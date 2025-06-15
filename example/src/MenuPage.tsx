import React from 'react';
import { View, Button, StyleSheet, Text, SafeAreaView } from 'react-native';

export default function MenuPage({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="Static Content"
            onPress={() => navigation.navigate('StaticContent')}
            color="#007AFF"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Dynamic Content"
            onPress={() => navigation.navigate('DynamicContent')}
            color="#34C759"
          />
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32, color: '#222' },
  buttonWrapper: { width: '100%', marginVertical: 10 },
});
