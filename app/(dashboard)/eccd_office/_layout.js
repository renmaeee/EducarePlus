// src/app/(dashboard)/eccd_office/_layout.js
import { Stack } from 'expo-router';
import React from 'react';

export default function EccdOfficeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="classroom" />
      <Stack.Screen name="inbox" />
      <Stack.Screen name="employee" />
      <Stack.Screen name="reports" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}