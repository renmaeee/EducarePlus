// src/app/(dashboard)/parent/index.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ParentDashboardContent() {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const dashboardCards = [
    { title: 'My Children', value: '2', icon: 'happy-outline', color: '#b91c1c' },
    { title: 'Upcoming Events', value: '3', icon: 'calendar-outline', color: '#f59e0b' },
    { title: 'New Messages', value: '5', icon: 'mail-outline', color: '#3b82f6' },
    { title: 'Reports', value: '8', icon: 'document-text-outline', color: '#10b981' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parent Dashboard</Text>
        <Text style={styles.headerSubtitle}>Stay connected with your child's education</Text>
      </View>

      <View style={styles.cardGrid}>
        {dashboardCards.map((card, index) => (
          <TouchableOpacity key={index} style={[styles.card, isMobile && styles.mobileCard]}>
            <View style={[styles.cardIcon, { backgroundColor: card.color }]}>
              <Ionicons name={card.icon} size={24} color="#fff" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardValue}>{card.value}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="happy-outline" size={32} color="#b91c1c" />
            <Text style={styles.actionText}>Child Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="time-outline" size={32} color="#f59e0b" />
            <Text style={styles.actionText}>View Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="mail-outline" size={32} color="#3b82f6" />
            <Text style={styles.actionText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="document-text-outline" size={32} color="#10b981" />
            <Text style={styles.actionText}>Progress Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#b91c1c',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mobileCard: {
    width: '100%',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    color: '#b91c1c',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#991b1b',
    textAlign: 'center',
  },
});