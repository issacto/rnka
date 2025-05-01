import { useState } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { getAttest, generateSecureKeys } from 'react-native-ka';
import Clipboard from '@react-native-clipboard/clipboard';
import { TouchableOpacity } from 'react-native';

const generateAttestationChallenge = (): string => {
  return 'lVVSRlBKB5TILoZZnJy/ZBhcX69waDpmrGr4RBXsXQc=';
};

export default function App() {
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

      console.log('Challenge:', challengeStr);
      console.log('Public Key:', generatedPubkey);
      console.log('Attestation:', generatedAttest);
    } catch (error) {
      console.error('Error generating keys or attestation:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Button title="Generate Keys & Attestation" onPress={generateKeyPair} />
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  copyableText: {
    marginTop: 5,
    fontSize: 14,
    color: '#0066cc',
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'flex-start',
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
});
