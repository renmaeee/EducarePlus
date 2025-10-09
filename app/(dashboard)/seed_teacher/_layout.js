// src/app/(dashboard)/seed_teacher/_layout.js
import { Stack } from 'expo-router';
import React from 'react';

export default function SeedTeacherLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'SEED Teacher Dashboard' }} />
      <Stack.Screen name="enrollment" options={{ title: 'Enrollment' }} />
      <Stack.Screen name="classlist" options={{ title: 'Class List' }} />
      <Stack.Screen name="reports" options={{ title: 'Reports' }} />
      <Stack.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Stack.Screen name="inbox" options={{ title: 'Inbox' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}