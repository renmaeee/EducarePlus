/**
 * About Page
 * 
 * This page provides information about EducarePlus,
 * its mission, vision, and team.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutPage() {
  return (
    <View style={styles.container}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>About Us</Text>
        <Text style={styles.pageSubtitle}>
          Learn more about EducarePlus and our commitment to early childhood education
        </Text>
      </View>

      {/* Mission Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            To provide quality early childhood education that nurtures the whole child – 
            intellectually, emotionally, socially, and physically – preparing them for 
            a lifetime of learning and success.
          </Text>
        </View>
      </View>

      {/* Vision Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            To be the leading early childhood education center in the community, 
            recognized for excellence in nurturing young minds and building strong 
            foundations for future learners.
          </Text>
        </View>
      </View>

      {/* Values Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Core Values</Text>
        <View style={styles.valuesGrid}>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>❤️</Text>
            <Text style={styles.valueTitle}>Care</Text>
            <Text style={styles.valueDescription}>
              Every child is treated with love and respect
            </Text>
          </View>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>⭐</Text>
            <Text style={styles.valueTitle}>Excellence</Text>
            <Text style={styles.valueDescription}>
              We strive for the highest quality in education
            </Text>
          </View>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>🤝</Text>
            <Text style={styles.valueTitle}>Partnership</Text>
            <Text style={styles.valueDescription}>
              We work closely with families and community
            </Text>
          </View>
          <View style={styles.valueCard}>
            <Text style={styles.valueIcon}>🌱</Text>
            <Text style={styles.valueTitle}>Growth</Text>
            <Text style={styles.valueDescription}>
              We foster continuous learning and development
            </Text>
          </View>
        </View>
      </View>

      {/* History Section */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            EducarePlus was founded with a simple yet powerful belief: every child 
            deserves access to quality early childhood education. What started as 
            a small community daycare center has grown into a comprehensive ECCD 
            program serving hundreds of families.
          </Text>
          <Text style={[styles.cardText, { marginTop: 16 }]}>
            Today, we continue to innovate and improve our programs, incorporating 
            the latest research in early childhood development while staying true 
            to our core values of care, excellence, partnership, and growth.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pageHeader: {
    backgroundColor: '#2563eb',
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    maxWidth: 500,
  },
  section: {
    padding: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    width: '100%',
    maxWidth: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    textAlign: 'center',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    maxWidth: 800,
  },
  valueCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    width: 180,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  valueIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  historySection: {
    backgroundColor: '#e0e7ff',
    padding: 40,
    alignItems: 'center',
  },
});
