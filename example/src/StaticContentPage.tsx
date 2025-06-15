import React, { useState } from 'react';
import { StyleSheet, Button, Text, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { getAttest, generateSecureKeys } from 'react-native-ka';
import Clipboard from '@react-native-clipboard/clipboard';

const generateAttestationChallenge = (): string => {
  return 'lVVSRlBKB5TILoZZnJy/ZBhcX69waDpmrGr4RBXsXQc=';
};

export default function StaticContentPage({ navigation }) {
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [attest, setAttest] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);

  const generateKeyPair = async () => {
    const challengeStr = generateAttestationChallenge();
    setChallenge(challengeStr);

    try {
      const generatedPubkey = await generateSecureKeys(challengeStr);
      const generatedAttest = await getAttest(challengeStr);

      setPubkey(generatedPubkey);
      setAttest(
        Array.isArray(generatedAttest)
          ? generatedAttest.join('\n')
          : generatedAttest
      );
    } catch (error) {
      console.error('Error generating keys or attestation:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Static Content</Text>
          <View style={styles.buttonWrapper}>
            <Button title="Generate Keys & Attestation" onPress={generateKeyPair} color="#007AFF" />
          </View>
          {challenge && (
            <>
              <Text style={styles.label}>Challenge:</Text>
              <TouchableOpacity onPress={() => Clipboard.setString(challenge)}>
                <Text style={styles.copyableText}>{challenge}</Text>
              </TouchableOpacity>
            </>
          )}
          {pubkey && (
            <>
              <Text style={styles.label}>Public Key:</Text>
              <TouchableOpacity onPress={() => Clipboard.setString(pubkey)}>
                <Text style={styles.copyableText}>{pubkey}</Text>
              </TouchableOpacity>
            </>
          )}
          {attest && (
            <>
              <Text style={styles.label}>Attestation:</Text>
              <TouchableOpacity onPress={() => Clipboard.setString(attest)}>
                <Text style={styles.copyableText}>{attest}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f7' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    maxWidth: 400,
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, textAlign: 'center', color: '#222' },
  label: { fontWeight: 'bold', marginTop: 20, color: '#444' },
  copyableText: { marginTop: 5, fontSize: 14, color: '#0066cc', textAlign: 'left', textDecorationLine: 'underline' },
  buttonWrapper: { marginVertical: 8 },
});