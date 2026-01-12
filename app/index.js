// app/index.js - Enhanced landing/dashboard router with role-based redirects
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();
  const { user, loading, getDashboardPath } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && user.role) {
        // Redirect to role-specific dashboard
        const dashboardPath = getDashboardPath(user.role);
        router.replace(dashboardPath);
      } else {
        // No user logged in, redirect to login
        router.replace('/login');
      }
    }
  }, [loading, user, router, getDashboardPath]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  // This should never be reached, but return null as fallback
  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
});