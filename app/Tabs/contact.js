/**
 * Contact Page
 * 
 * This page provides contact information and a contact form
 * for visitors to reach out to EducarePlus.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Alert 
} from 'react-native';

export default function ContactPage() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We will get back to you soon.',
        [{ text: 'OK', onPress: () => {
          // Reset form
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        }}]
      );
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Contact Us</Text>
        <Text style={styles.pageSubtitle}>
          We'd love to hear from you. Reach out with any questions!
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Contact Information */}
        <View style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          
          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>📍</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactText}>
                123 Education Street{'\n'}
                Barangay Sample, City Name{'\n'}
                Province, 1234
              </Text>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>📞</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactText}>(02) 1234-5678</Text>
              <Text style={styles.contactText}>+63 912 345 6789</Text>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>✉️</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactText}>info@educareplus.com</Text>
              <Text style={styles.contactText}>admissions@educareplus.com</Text>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>🕐</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Office Hours</Text>
              <Text style={styles.contactText}>Monday - Friday: 7:00 AM - 5:00 PM</Text>
              <Text style={styles.contactText}>Saturday: 8:00 AM - 12:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Send Us a Message</Text>
          
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="What is this about?"
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Your message..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Text>
            </TouchableOpacity>
          </View>
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
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 24,
    gap: 32,
  },
  contactInfoSection: {
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
  },
  formSection: {
    flex: 1,
    minWidth: 300,
    maxWidth: 500,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
