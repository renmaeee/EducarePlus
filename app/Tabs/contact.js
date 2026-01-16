/**
 * Contact Page
 *
 * This page provides contact information and a contact form
 * for visitors to reach out to EducarePlus.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";

export default function ContactPage() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for scrolling to sections
  const scrollViewRef = useRef(null);
  const infoRef = useRef(null);
  const messageRef = useRef(null);
  const locationRef = useRef(null);

  // Get URL params for section navigation
  const params = useLocalSearchParams();
  const section = params.section;

  // Scroll to top only when there's no section parameter
  useEffect(() => {
    if (!section && Platform.OS === "web") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [section]);

  // Scroll to section when section param changes
  useEffect(() => {
    if (section) {
      // Small delay to ensure DOM is ready
      let targetRef = null;
      switch (section) {
        case "info":
          targetRef = infoRef;
          break;
        case "message":
          targetRef = messageRef;
          break;
        case "location":
          targetRef = locationRef;
          break;
      }

      if (targetRef?.current) {
        // Works on web & native
        const node = targetRef.current;
        const scrollNode = scrollViewRef.current;

        // If running on web, use DOM scrollIntoView with instant behavior
        if (Platform.OS === "web" && node.scrollIntoView) {
          node.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          // Fallback for native: use measureLayout
          node.measureLayout(scrollNode, (x, y) => {
            scrollNode.scrollTo({ y: y - 20, animated: false });
          });
        }
      }
    } else if (Platform.OS === "web") {
      // Only scroll to top if no section
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [section]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        "Message Sent!",
        "Thank you for contacting us. We will get back to you soon.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setName("");
              setEmail("");
              setSubject("");
              setMessage("");
            },
          },
        ]
      );
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Contact Us</Text>
        <Text style={styles.pageSubtitle}>
          We'd love to hear from you. Reach out with any questions!
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Contact Information */}
        <View ref={infoRef} style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>📍</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactText}>
                123 Education Street{"\n"}
                Barangay Sample, City Name{"\n"}
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
              <Text style={styles.contactText}>
                Monday - Friday: 7:00 AM - 5:00 PM
              </Text>
              <Text style={styles.contactText}>
                Saturday: 8:00 AM - 12:00 PM
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View ref={messageRef} style={styles.formSection}>
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
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Section */}
        <View ref={locationRef} style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Our Location</Text>
          <View style={styles.locationCard}>
            <Text style={styles.locationIcon}>🗺️</Text>
            <Text style={styles.locationTitle}>Visit Us</Text>
            <Text style={styles.locationText}>
              We're located in the heart of the city, easily accessible by
              public transportation.
            </Text>
            <Text style={styles.locationAddress}>
              📍 123 Education Street{"\n"}
              Barangay Sample, City Name{"\n"}
              Province, 1234
            </Text>
            <Text style={styles.locationHours}>
              🕐 Office Hours:{"\n"}
              Monday - Friday: 7:00 AM - 5:00 PM{"\n"}
              Saturday: 8:00 AM - 12:00 PM
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pageHeader: {
    backgroundColor: "#2563eb",
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#e0e7ff",
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
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
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
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
    fontWeight: "500",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f8fafc",
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#94a3b8",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  locationSection: {
    width: "100%",
    marginTop: 24,
  },
  locationCard: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  locationAddress: {
    fontSize: 16,
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  locationHours: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
});
