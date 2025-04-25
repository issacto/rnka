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
  const challenge: string = '2A8Jc94cmW4d3jSQwvxJywwLENHBA+B6JYrG3vf141o=';
  return challenge;
};

export default function App() {
  const generateKeyPair = async () => {
    try {
      if (Platform.OS === 'android') {
        const challenge = generateAttestationChallenge(); // assuming this function exists
        const result = generateKeys(challenge);
        console.log('Key generation result1:', result);
        const newResult = await getAttestationCertificates();
        console.log('Key generation result:2', newResult);
      } else {
        const x = await generateIOSKeys();
        console.log('should log', x);
        // console.log('Key generation result23456y:');
        const attest = await getIOSAttest();
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
