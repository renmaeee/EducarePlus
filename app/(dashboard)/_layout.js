// app/(dashboard)/_layout.js
import { Slot, Redirect } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import Sidebar from '../../src/components/Sidebar';
import { useAuth } from '../../src/context/AuthContext';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  if (!user || !user.role) {
    return <Redirect href="/login" />;
  }

  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <View style={styles.container}>
      {!isMobile && <Sidebar />}
      <View style={styles.contentContainer}>
        <Slot />
      </View>
      {isMobile && <Sidebar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
});