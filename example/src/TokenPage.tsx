import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { generateSecureKeys, getAttest } from 'react-native-ka';
import { BACKEND_URL } from './constants';

export default function TokenPage({ route, navigation }) {
  const { accessToken, challenge } = route.params;
  const [attestationCreated, setAttestationCreated] = useState<string | null>(
    null
  );
  const [attestation, setAttestation] = useState<any>(null);

  const endpoint =
    Platform.OS === 'android'
      ? `${BACKEND_URL}/android_attestation/verify`
      : `${BACKEND_URL}/ios_attestation/verify`;

  const handleSendAttestation = async () => {
    if (!attestation) {
      Alert.alert('Please generate attestation first.');
      return;
    }

    try {
      const url = endpoint;
      const options = {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ attestationCertificate: attestation }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Attestation failed', JSON.stringify(data));
        return;
      }
      navigation.navigate('AttestSuccess');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send attestation');
    }
  };

  const handleGenerateAttestation = async () => {
    try {
      const generatedPubkey = await generateSecureKeys(challenge);
      if (generatedPubkey) {
        const generatedAttest = await getAttest(generatedPubkey);
        setAttestation(
          Array.isArray(generatedAttest) ? generatedAttest : [generatedAttest]
        );
        setAttestationCreated('yes');
        return;
      }
      setAttestationCreated('no');
    } catch (error) {
      setAttestationCreated('no');
      console.error('Error generating keys or attestation:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.info}>
            If you are using a simulator, key attestation won't work.
          </Text>
          <Text style={styles.title}>Token Info</Text>
          <Text style={styles.label}>Access Token:</Text>
          <Text style={styles.value}>{accessToken}</Text>
          <Text style={styles.label}>Challenge:</Text>
          <Text style={styles.value}>{challenge}</Text>
          <View style={styles.buttonGroup}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Generate Attestation"
                onPress={handleGenerateAttestation}
                color="#007AFF"
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Send Attestation"
                onPress={handleSendAttestation}
                color="#34C759"
              />
            </View>
          </View>
          {attestationCreated && (
            <Text style={styles.result}>
              Attestation created: {attestationCreated}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
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
  info: {
    color: 'orange',
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#222',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    color: '#444',
  },
  value: {
    marginBottom: 10,
    color: '#333',
    fontSize: 15,
    wordBreak: 'break-all',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
});
