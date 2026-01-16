/**
 * Home Page
 *
 * This is the landing page of the website.
 * It welcomes visitors and provides quick access to key features.
 */

import React, { useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  // Refs for scrolling to sections
  const scrollViewRef = useRef(null);
  const infoRef = useRef(null);
  const whychooseusRef = useRef(null);
  const programsRef = useRef(null);

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
      let targetRef = null;
      switch (section) {
        case "programs":
          targetRef = programsRef;
          break;
        case "whychooseus":
          targetRef = whychooseusRef;
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
  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      {/* Hero Section */}
      <View ref={infoRef} style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to EducarePlus</Text>
        <Text style={styles.heroSubtitle}>
          Nurturing young minds through quality early childhood education
        </Text>

        {/* Call to Action Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push("/Tabs/admission")}
        >
          <Text style={styles.ctaButtonText}>Enroll Your Child Today</Text>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View ref={whychooseusRef} style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>

        <View style={styles.featuresGrid}>
          {/* Feature 1 */}
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureTitle}>Quality Education</Text>
            <Text style={styles.featureDescription}>
              Curriculum designed for early childhood development
            </Text>
          </View>

          {/* Feature 2 */}
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>👩‍🏫</Text>
            <Text style={styles.featureTitle}>Expert Teachers</Text>
            <Text style={styles.featureDescription}>
              Trained and caring educators for your child
            </Text>
          </View>

          {/* Feature 3 */}
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🏫</Text>
            <Text style={styles.featureTitle}>Safe Environment</Text>
            <Text style={styles.featureDescription}>
              Secure and nurturing learning spaces
            </Text>
          </View>

          {/* Feature 4 */}
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎨</Text>
            <Text style={styles.featureTitle}>Fun Activities</Text>
            <Text style={styles.featureDescription}>
              Engaging activities for holistic development
            </Text>
          </View>
        </View>
      </View>

      {/* Programs Section */}
      <View style={styles.programsSection}>
        <View ref={programsRef} style={styles.featuresSection}></View>
        <Text style={styles.sectionTitle}>Our Programs</Text>

        <View style={styles.programCard}>
          <Text style={styles.programTitle}>ECCD Program</Text>
          <Text style={styles.programAge}>Ages 3-4 years</Text>
          <Text style={styles.programDescription}>
            Early Childhood Care and Development program focusing on
            foundational skills through play-based learning and structured
            activities.
          </Text>
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
  heroSection: {
    backgroundColor: "#2563eb",
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#e0e7ff",
    textAlign: "center",
    marginBottom: 32,
    maxWidth: 600,
  },
  ctaButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  featuresSection: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 32,
    textAlign: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
    maxWidth: 900,
  },
  featureCard: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e3a5f",
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
  programsSection: {
    backgroundColor: "#e0e7ff",
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  programCard: {
    backgroundColor: "#ffffff",
    padding: 32,
    borderRadius: 16,
    maxWidth: 600,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  programTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },
  programAge: {
    fontSize: 16,
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: 16,
  },
  programDescription: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
});
