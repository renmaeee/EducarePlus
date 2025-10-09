// src/app/(dashboard)/eccd_office/index.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ECCDDashboardContent() {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const dashboardCards = [
    { title: 'Total Teachers', value: '24', icon: 'people-outline', color: '#3b82f6' },
    { title: 'Active Classes', value: '12', icon: 'school-outline', color: '#10b981' },
    { title: 'Total Students', value: '240', icon: 'happy-outline', color: '#f59e0b' },
    { title: 'Pending Reports', value: '5', icon: 'document-text-outline', color: '#ef4444' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ECCD Office Dashboard</Text>
        <Text style={styles.headerSubtitle}>Manage your educational programs and staff</Text>
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
            <Ionicons name="eye-outline" size={32} color="#3b82f6" />
            <Text style={styles.actionText}>Classroom Observation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="people-outline" size={32} color="#10b981" />
            <Text style={styles.actionText}>Manage Employees</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="document-text-outline" size={32} color="#f59e0b" />
            <Text style={styles.actionText}>Generate Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="calendar-outline" size={32} color="#8b5cf6" />
            <Text style={styles.actionText}>View Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    color: '#1e293b',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
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
    color: '#1e293b',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
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
    color: '#1e293b',
    textAlign: 'center',
  },
});