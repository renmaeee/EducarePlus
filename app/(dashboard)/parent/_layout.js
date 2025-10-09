// src/app/(dashboard)/parent/_layout.js
import { Stack } from 'expo-router';
import React from 'react';

export default function ParentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Parent Dashboard' }} />
      <Stack.Screen name="child-info" options={{ title: 'Child Information' }} />
      <Stack.Screen name="schedule" options={{ title: 'Schedule' }} />
      <Stack.Screen name="inbox" options={{ title: 'Inbox' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}