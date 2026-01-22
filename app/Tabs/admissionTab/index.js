import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from "react-native";

// ENROLLMENT FORM COMPONENT (for modal use)
export function EnrollmentForm({ visible, onClose }) {

    // Step 1: Date of birth and age validation
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState(null);
  const [isEligible, setIsEligible] = useState(null);

  // Step 2: Student and parent information
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [preferredClass, setPreferredClass] = useState("");

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // AGE CALCULATION FUNCTION
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      ageYears--;
    }
    return ageYears;
  };

  // DATE CHANGE HANDLER
  const handleDateChange = (text) => {
    setDateOfBirth(text);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(text)) {
      const calculatedAge = calculateAge(text);
      setAge(calculatedAge);
      setIsEligible(calculatedAge >= 3 && calculatedAge <= 4);
    } else {
      setAge(null);
      setIsEligible(null);
    }
  };

  // FORM SUBMISSION HANDLER
   const handleSubmit = async () => {
    if (!studentName.trim()) {
      Alert.alert("Error", "Please enter the student name");
      return;
    }
    if (!parentName.trim()) {
      Alert.alert("Error", "Please enter the parent/guardian name");
      return;
    }
    if (!parentContact.trim()) {
      Alert.alert("Error", "Please enter a contact number");
      return;
    }
    if (!preferredClass) {
      Alert.alert("Error", "Please select a preferred class");
      return;
    }

    const enrollmentData = {
      student: { name: studentName.trim(), dateOfBirth, age },
      parent: {
        name: parentName.trim(),
        contactNumber: parentContact.trim(),
        email: parentEmail.trim(),
      },
      enrollment: {
        preferredClass,
        submittedAt: new Date().toISOString(),
        status: "pending",
      },
    };

    setIsSubmitting(true);

    try {
      const API_URL = "https://your-backend-api.com/api/enrollments";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollmentData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Submission Failed",
          errorData.message || "Please try again later.",
        );
      }
    } catch (error) {
      console.log("API Error (demo mode):", error);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // RESET FORM FUNCTION
   const resetForm = () => {
    setDateOfBirth("");
    setAge(null);
    setIsEligible(null);
    setStudentName("");
    setParentName("");
    setParentContact("");
    setParentEmail("");
    setPreferredClass("");
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    if (onClose) onClose(); // Check if onClose exists before calling
  };

  // RENDER COMPONENT
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Enrollment Application</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {submitSuccess ? (
              <View style={styles.successContainer}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successTitle}>Application Submitted!</Text>
                <Text style={styles.successMessage}>
                  Thank you for submitting your enrollment application. We will
                  review your application and contact you soon.
                </Text>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={handleClose}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* STEP 1: DATE OF BIRTH INPUT */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    Step 1: Child's Date of Birth
                  </Text>
                  <Text style={styles.sectionDescription}>
                    Enter your child's date of birth to check eligibility
                  </Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date of Birth *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="YYYY-MM-DD (e.g., 2022-06-15)"
                      value={dateOfBirth}
                      onChangeText={handleDateChange}
                      keyboardType="default"
                    />
                    <Text style={styles.hint}>Format: YYYY-MM-DD</Text>
                  </View>

                  {age !== null && (
                    <View style={styles.ageDisplay}>
                      <Text style={styles.ageLabel}>Calculated Age:</Text>
                      <Text style={styles.ageValue}>{age} years old</Text>
                    </View>
                  )}

                  {isEligible === true && (
                    <View style={[styles.eligibilityBox, styles.eligibleBox]}>
                      <Text style={styles.eligibilityIcon}>✓</Text>
                      <Text style={styles.eligibilityText}>
                        Great! Your child is eligible for enrollment. Please
                        proceed to fill out the form below.
                      </Text>
                    </View>
                  )}

                  {isEligible === false && (
                    <View
                      style={[styles.eligibilityBox, styles.notEligibleBox]}
                    >
                      <Text style={styles.eligibilityIcon}>✗</Text>
                      <Text style={styles.eligibilityText}>
                        Sorry, your child is not eligible for our program. Our
                        ECCD program is for children aged 3-4 years old.
                        {age < 3
                          ? " Your child is too young. Please apply when they turn 3."
                          : " Your child may be eligible for other programs."}
                      </Text>
                    </View>
                  )}
                </View>

                {/* STEP 2: ENROLLMENT FORM */}
                {isEligible === true && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                      Step 2: Student Information
                    </Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Student's Full Name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter child's full name"
                        value={studentName}
                        onChangeText={setStudentName}
                      />
                    </View>

                    <Text style={styles.sectionTitle}>
                      Parent/Guardian Information
                    </Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Parent/Guardian Name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter parent/guardian name"
                        value={parentName}
                        onChangeText={setParentName}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Contact Number *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter contact number"
                        value={parentContact}
                        onChangeText={setParentContact}
                        keyboardType="phone-pad"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email Address</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter email address (optional)"
                        value={parentEmail}
                        onChangeText={setParentEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Preferred Class *</Text>
                      <View style={styles.classOptions}>
                        {["Morning Class", "Afternoon Class"].map(
                          (classOption) => (
                            <TouchableOpacity
                              key={classOption}
                              style={[
                                styles.classOption,
                                preferredClass === classOption &&
                                  styles.classOptionSelected,
                              ]}
                              onPress={() => setPreferredClass(classOption)}
                            >
                              <View
                                style={[
                                  styles.radioOuter,
                                  preferredClass === classOption &&
                                    styles.radioOuterSelected,
                                ]}
                              >
                                {preferredClass === classOption && (
                                  <View style={styles.radioInner} />
                                )}
                              </View>
                              <Text
                                style={[
                                  styles.classOptionText,
                                  preferredClass === classOption &&
                                    styles.classOptionTextSelected,
                                ]}
                              >
                                {classOption}
                              </Text>
                            </TouchableOpacity>
                          ),
                        )}
                      </View>
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
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// DEFAULT EXPORT (for route use), and  Redirects to admission.js
export default function AdmissionTabIndex() {
  const router = useRouter();

  React.useEffect(() => {
    // Redirect to admission.js when accessing /Tabs/admissionTab
    router.replace("/Tabs/admissionTab/admission");
  }, []);

  return null; // Return null while redirecting
}

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 600,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#1e3a5f" },
  closeButton: { padding: 8 },
  closeButtonText: { fontSize: 24, color: "#64748b" },
  formContainer: { padding: 24 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e3a5f",
    marginBottom: 8,
    marginTop: 16,
  },
  sectionDescription: { fontSize: 14, color: "#64748b", marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", color: "#334155", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f8fafc",
  },
  hint: { fontSize: 12, color: "#94a3b8", marginTop: 4 },
  ageDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  ageLabel: { fontSize: 14, color: "#475569", marginRight: 8 },
  ageValue: { fontSize: 16, fontWeight: "600", color: "#2563eb" },
  eligibilityBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  eligibleBox: {
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "#16a34a",
  },
  notEligibleBox: {
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#dc2626",
  },
  eligibilityIcon: { fontSize: 20, marginRight: 12 },
  eligibilityText: { flex: 1, fontSize: 14, color: "#334155", lineHeight: 20 },
  classOptions: { gap: 12 },
  classOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  classOptionSelected: { borderColor: "#2563eb", backgroundColor: "#eff6ff" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: "#2563eb" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563eb",
  },
  classOptionText: { fontSize: 15, color: "#475569" },
  classOptionTextSelected: { color: "#2563eb", fontWeight: "500" },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonDisabled: { backgroundColor: "#94a3b8" },
  submitButtonText: { color: "#ffffff", fontSize: 18, fontWeight: "600" },
  successContainer: { alignItems: "center", padding: 24 },
  successIcon: { fontSize: 64, color: "#16a34a", marginBottom: 16 },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
  },
  doneButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
