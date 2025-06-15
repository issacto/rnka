import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuPage from './MenuPage';
import StaticContentPage from './StaticContentPage';
import DynamicContentPage from './DynamicContentPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import SignupSuccessPage from './SignupSuccessPage';
import TokenPage from './TokenPage';
import AttestSuccessPage from './AttestSuccessPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Menu"
          component={MenuPage}
          options={{ title: 'Menu', headerBackVisible: false }}
        />
        <Stack.Screen
          name="StaticContent"
          component={StaticContentPage}
          options={{ title: 'Static Content' }}
        />
        <Stack.Screen
          name="DynamicContent"
          component={DynamicContentPage}
          options={{ title: 'Dynamic Content' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ title: 'Signup' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignupSuccess"
          component={SignupSuccessPage}
          options={{ title: 'Signup Success' }}
        />
        <Stack.Screen
          name="Token"
          component={TokenPage}
          options={{ title: 'Token Info' }}
        />
        <Stack.Screen
          name="AttestSuccess"
          component={AttestSuccessPage}
          options={{ title: 'Attestation Success' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
