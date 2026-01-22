import React, { useState, useRef, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { EnrollmentForm } from "./index"; 

export default function AdmissionPage() {
  // State to control enrollment form visibility
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  // Refs for scrolling to sections
  const scrollViewRef = useRef(null);
  const enrollmentRef = useRef(null);
  const howToRef = useRef(null);
  const requirementsRef = useRef(null);

  // Get URL params for section navigation
  const params = useLocalSearchParams();
  const section = params.section;

  // Scroll to top when no section parameter
  useEffect(() => {
    if (!section && Platform.OS === "web") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [section]);

  // Scroll to section when section param changes
  useEffect(() => {
    if (section) {
      let targetRef = null;
      switch (section) {
        case "enrollment":
          targetRef = enrollmentRef;
          break;
        case "how-to":
          targetRef = howToRef;
          break;
        case "requirements":
          targetRef = requirementsRef;
          break;
      }

      if (targetRef?.current) {
        const node = targetRef.current;
        const scrollNode = scrollViewRef.current;

        if (Platform.OS === "web" && node.scrollIntoView) {
          node.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          node.measureLayout(scrollNode, (x, y) => {
            scrollNode.scrollTo({ y: y - 20, animated: false });
          });
        }
      }
    } else if (Platform.OS === "web") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [section]);

  // authomatically open the age checking form.(still needed to fix (the param name) this.)
  useEffect(() => {
    if (section === "setShowEnrollmentForm") {
      setShowEnrollmentForm(true);
    }
  }, [section]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Admission</Text>
        <Text style={styles.pageSubtitle}>
          Join our ECCD program and give your child the best start in education
        </Text>
      </View>

      {/* Enrollment Process & Ready to Enroll Side by Side */}
      <View style={styles.rowSection}>
        {/* Enrollment Process Section */}
        <View ref={enrollmentRef} style={[styles.infoSection, styles.flexItem]}>
          <Text style={styles.infoTitle}>Enrollment Process</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>📝 Step-by-Step Guide</Text>
            <Text style={styles.infoCardText}>
              1. Review the requirements below
            </Text>
            <Text style={styles.infoCardText}>
              2. Prepare all necessary documents
            </Text>
            <Text style={styles.infoCardText}>
              3. Click "Start Enrollment" button
            </Text>
            <Text style={styles.infoCardText}>
              4. Fill out the enrollment form
            </Text>
            <Text style={styles.infoCardText}>
              5. Submit and wait for confirmation
            </Text>
          </View>
        </View>

        {/* Ready to Enroll Section */}
        <View style={[styles.enrollSection, styles.flexItem]}>
          <Text style={styles.enrollTitle}>Ready to Enroll?</Text>
          <Text style={styles.enrollDescription}>
            Start the enrollment process now.
          </Text>
          <TouchableOpacity
            style={styles.startEnrollButton}
            onPress={() => setShowEnrollmentForm(true)}
          >
            <Text style={styles.startEnrollButtonText}>Start Enrollment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* How to Enroll Section */}
      <View ref={howToRef} style={styles.infoSection}>
        <Text style={styles.infoTitle}>How to Enroll</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>🎯 Quick Start</Text>
          <Text style={styles.infoCardText}>
            Enrolling is easy! Simply scroll down to find the "Start Enrollment"
            button. Click it to open the enrollment form where you can enter
            your child's information. No login or account is required - you can
            start the process immediately!
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📅 School Year</Text>
          <Text style={styles.infoCardText}>Classes begin: June 2026</Text>
          <Text style={styles.infoCardText}>Enrollment period: Open now</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>⏰ Class Schedules</Text>
          <Text style={styles.infoCardText}>
            Morning Class: 8:00 AM - 11:00 AM
          </Text>
          <Text style={styles.infoCardText}>
            Afternoon Class: 1:00 PM - 4:00 PM
          </Text>
        </View>
      </View>

      {/* Requirements Section */}
      <View ref={requirementsRef} style={styles.infoSection}>
        <Text style={styles.infoTitle}>Requirements to Enroll</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📋 Required Documents</Text>
          <Text style={styles.infoCardText}>• Child must be 3-4 years old</Text>
          <Text style={styles.infoCardText}>
            • Birth certificate (Original and photocopy)
          </Text>
          <Text style={styles.infoCardText}>
            • Immunization records (Must be up to date)
          </Text>
          <Text style={styles.infoCardText}>
            • 2 passport-size photos (Recent, white background)
          </Text>
          <Text style={styles.infoCardText}>
            • Proof of residence (Barangay certificate or utility bill)
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>
            👨‍👩‍👧 Parent/Guardian Information
          </Text>
          <Text style={styles.infoCardText}>• Valid ID of parent/guardian</Text>
          <Text style={styles.infoCardText}>
            • Contact information (Mobile and email)
          </Text>
          <Text style={styles.infoCardText}>• Emergency contact details</Text>
        </View>
      </View>

      {/* Enrollment Form Modal */}
      <EnrollmentForm
        visible={showEnrollmentForm}
        onClose={() => setShowEnrollmentForm(false)}
      />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
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
    maxWidth: 500,
  },
  infoSection: { padding: 24, alignItems: "center" },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    maxWidth: 500,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 12,
  },
  infoCardText: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 6,
    lineHeight: 22,
  },
  rowSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 24,
    flexWrap: "wrap", // Allows stacking on small screens
    marginTop: 24,
    marginBottom: 24,
  },
  flexItem: {
    flex: 1,
    minWidth: 300,
    maxWidth: 500,
  },
  enrollSection: {
    backgroundColor: "#e0e7ff",
    padding: 40,
    alignItems: "center",
    marginTop: 0, // Remove marginTop so it aligns with Enrollment Process
  },
  enrollTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 12,
  },
  enrollDescription: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 24,
    textAlign: "center",
  },
  startEnrollButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startEnrollButtonText: { color: "#ffffff", fontSize: 20, fontWeight: "600" },
});
