import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import {
  multiply,
  generateKeys,
  getAttestationCertificates,
  generateIOSKeys,
  getIOSAttest,
} from 'react-native-ka';

const result = multiply(3, 7);

const generateAttestationChallenge = (): string => {
  const challenge: string = 'lVVSRlBKB5TILoZZnJy/ZBhcX69waDpmrGr4RBXsXQc=';
  return challenge;
};

export default function App() {
  const generateKeyPair = async () => {
    try {
      if (Platform.OS === 'android') {
        const challenge = generateAttestationChallenge(); // assuming this function exists
        console.log('challenge', challenge);
        const result = await generateKeys(challenge);
        console.log('Key generation result1:', result);
        const newResult = await getAttestationCertificates();
        console.log('Key generation result:2', newResult);
      } else {
        const challenge = generateAttestationChallenge();
        console.log('challenge', challenge);
        const keyId = await generateIOSKeys();
        console.log('should log', keyId);
        const attest = await getIOSAttest(challenge);
        console.log('Key generation result1:', attest);
      }
    } catch (error) {
      console.error('Error generating keys:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button title={'clieck ma '} onPress={generateKeyPair} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
