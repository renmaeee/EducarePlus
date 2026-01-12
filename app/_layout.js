import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

function ProtectedLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Public website tabs - accessible without login */}
      <Stack.Screen name="Tabs" />
      <Stack.Screen name="login" />
      {/* The (dashboard) group now defines its own layout, which includes the sidebar */}
      <Stack.Screen name="(dashboard)" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}