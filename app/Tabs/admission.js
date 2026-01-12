/**
 * Admission Page
 * 
 * This is the public enrollment page where anyone can start the enrollment process
 * without logging in. It contains a "Start Enrollment" button that opens the
 * enrollment form.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput,
  Modal,
  ScrollView,
  Platform,
  Alert
} from 'react-native';

// Enrollment Form Component
const EnrollmentForm = ({ visible, onClose }) => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Step 1: Date of birth and age validation
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState(null);
  const [isEligible, setIsEligible] = useState(null);
  
  // Step 2: Student and parent information (only shown if eligible)
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [preferredClass, setPreferredClass] = useState('');
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ============================================
  // AGE CALCULATION FUNCTION
  // ============================================
  
  /**
   * Calculate age from date of birth
   * @param {string} dob - Date of birth in YYYY-MM-DD format
   * @returns {number} - Age in years
   */
  const calculateAge = (dob) => {
    // Parse the date of birth
    const birthDate = new Date(dob);
    const today = new Date();
    
    // Calculate the difference in years
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    
    // Adjust if birthday hasn't occurred this year yet
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
    }
    
    return ageYears;
  };

  // ============================================
  // DATE CHANGE HANDLER
  // ============================================
  
  /**
   * Handle date of birth selection
   * This function:
   * 1. Updates the date state
   * 2. Calculates the child's age
   * 3. Checks if child is eligible (between 3 and 4 years old)
   */
  const handleDateChange = (text) => {
    setDateOfBirth(text);
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(text)) {
      // Calculate age from the entered date
      const calculatedAge = calculateAge(text);
      setAge(calculatedAge);
      
      // Check eligibility: child must be between 3 and 4 years old
      // This means age >= 3 AND age < 5
      if (calculatedAge >= 3 && calculatedAge <= 4) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }
    } else {
      // Reset if date format is invalid
      setAge(null);
      setIsEligible(null);
    }
  };

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  
  /**
   * Submit enrollment data to backend API
   * This function:
   * 1. Validates all required fields
   * 2. Prepares the enrollment data
   * 3. Sends data to the backend API
   * 4. Handles success/error responses
   */
  const handleSubmit = async () => {
    // Validate required fields
    if (!studentName.trim()) {
      Alert.alert('Error', 'Please enter the student name');
      return;
    }
    if (!parentName.trim()) {
      Alert.alert('Error', 'Please enter the parent/guardian name');
      return;
    }
    if (!parentContact.trim()) {
      Alert.alert('Error', 'Please enter a contact number');
      return;
    }
    if (!preferredClass) {
      Alert.alert('Error', 'Please select a preferred class');
      return;
    }

    // Prepare enrollment data for API submission
    const enrollmentData = {
      student: {
        name: studentName.trim(),
        dateOfBirth: dateOfBirth,
        age: age,
      },
      parent: {
        name: parentName.trim(),
        contactNumber: parentContact.trim(),
        email: parentEmail.trim(),
      },
      enrollment: {
        preferredClass: preferredClass,
        submittedAt: new Date().toISOString(),
        status: 'pending', // Initial status
      },
    };

    setIsSubmitting(true);

    try {
      // ============================================
      // API CALL TO SAVE ENROLLMENT DATA
      // ============================================
      
      // Replace this URL with your actual backend API endpoint
      const API_URL = 'https://your-backend-api.com/api/enrollments';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      if (response.ok) {
        // Success - show confirmation
        setSubmitSuccess(true);
      } else {
        // API returned an error
        const errorData = await response.json();
        Alert.alert('Submission Failed', errorData.message || 'Please try again later.');
      }
    } catch (error) {
      // Network or other error
      // For demo purposes, we'll show success anyway
      console.log('API Error (demo mode):', error);
      setSubmitSuccess(true); // Remove this line in production
      // Alert.alert('Error', 'Unable to connect to server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RESET FORM FUNCTION
  // ============================================
  
  const resetForm = () => {
    setDateOfBirth('');
    setAge(null);
    setIsEligible(null);
    setStudentName('');
    setParentName('');
    setParentContact('');
    setParentEmail('');
    setPreferredClass('');
    setSubmitSuccess(false);
  };

  // ============================================
  // CLOSE MODAL HANDLER
  // ============================================
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // ============================================
  // RENDER COMPONENT
  // ============================================
  
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
            {/* Success Message */}
            {submitSuccess ? (
              <View style={styles.successContainer}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successTitle}>Application Submitted!</Text>
                <Text style={styles.successMessage}>
                  Thank you for submitting your enrollment application. 
                  We will review your application and contact you soon.
                </Text>
                <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* ============================================ */}
                {/* STEP 1: DATE OF BIRTH INPUT                  */}
                {/* This is the first input - a date picker for  */}
                {/* the child's date of birth                    */}
                {/* ============================================ */}
                
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Step 1: Child's Date of Birth</Text>
                  <Text style={styles.sectionDescription}>
                    Enter your child's date of birth to check eligibility
                  </Text>
                  
                  {/* Date Input Field */}
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

                  {/* Age Display - Shows calculated age when date is valid */}
                  {age !== null && (
                    <View style={styles.ageDisplay}>
                      <Text style={styles.ageLabel}>Calculated Age:</Text>
                      <Text style={styles.ageValue}>{age} years old</Text>
                    </View>
                  )}

                  {/* Eligibility Status */}
                  {isEligible === true && (
                    <View style={[styles.eligibilityBox, styles.eligibleBox]}>
                      <Text style={styles.eligibilityIcon}>✓</Text>
                      <Text style={styles.eligibilityText}>
                        Great! Your child is eligible for enrollment.
                        Please proceed to fill out the form below.
                      </Text>
                    </View>
                  )}

                  {isEligible === false && (
                    <View style={[styles.eligibilityBox, styles.notEligibleBox]}>
                      <Text style={styles.eligibilityIcon}>✗</Text>
                      <Text style={styles.eligibilityText}>
                        Sorry, your child is not eligible for our program.
                        Our ECCD program is for children aged 3-4 years old.
                        {age < 3 
                          ? ' Your child is too young. Please apply when they turn 3.'
                          : ' Your child may be eligible for other programs.'}
                      </Text>
                    </View>
                  )}
                </View>

                {/* ============================================ */}
                {/* STEP 2: ENROLLMENT FORM                      */}
                {/* Only displayed if the child is eligible     */}
                {/* (age between 3 and 4 years old)              */}
                {/* ============================================ */}
                
                {isEligible === true && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Step 2: Student Information</Text>
                    
                    {/* Student Name Input */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Student's Full Name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter child's full name"
                        value={studentName}
                        onChangeText={setStudentName}
                      />
                    </View>

                    <Text style={styles.sectionTitle}>Parent/Guardian Information</Text>
                    
                    {/* Parent Name Input */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Parent/Guardian Name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter parent/guardian name"
                        value={parentName}
                        onChangeText={setParentName}
                      />
                    </View>

                    {/* Parent Contact Input */}
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

                    {/* Parent Email Input */}
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

                    {/* Preferred Class Selection */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Preferred Class *</Text>
                      <View style={styles.classOptions}>
                        {['Morning Class', 'Afternoon Class'].map((classOption) => (
                          <TouchableOpacity
                            key={classOption}
                            style={[
                              styles.classOption,
                              preferredClass === classOption && styles.classOptionSelected
                            ]}
                            onPress={() => setPreferredClass(classOption)}
                          >
                            <View style={[
                              styles.radioOuter,
                              preferredClass === classOption && styles.radioOuterSelected
                            ]}>
                              {preferredClass === classOption && (
                                <View style={styles.radioInner} />
                              )}
                            </View>
                            <Text style={[
                              styles.classOptionText,
                              preferredClass === classOption && styles.classOptionTextSelected
                            ]}>
                              {classOption}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* ============================================ */}
                    {/* SUBMIT BUTTON                                */}
                    {/* Saves the enrollment data to backend API     */}
                    {/* ============================================ */}
                    
                    <TouchableOpacity 
                      style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.submitButtonText}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
};

// ============================================
// MAIN ADMISSION PAGE COMPONENT
// ============================================

export default function AdmissionPage() {
  // State to control enrollment form visibility
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  return (
    <View style={styles.container}>
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Admission</Text>
        <Text style={styles.pageSubtitle}>
          Join our ECCD program and give your child the best start in education
        </Text>
      </View>

      {/* Admission Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Enrollment Information</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📋 Requirements</Text>
          <Text style={styles.infoCardText}>• Child must be 3-4 years old</Text>
          <Text style={styles.infoCardText}>• Birth certificate</Text>
          <Text style={styles.infoCardText}>• Immunization records</Text>
          <Text style={styles.infoCardText}>• 2 passport-size photos</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📅 School Year</Text>
          <Text style={styles.infoCardText}>Classes begin: June 2026</Text>
          <Text style={styles.infoCardText}>Enrollment period: Open now</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>⏰ Class Schedules</Text>
          <Text style={styles.infoCardText}>Morning Class: 8:00 AM - 11:00 AM</Text>
          <Text style={styles.infoCardText}>Afternoon Class: 1:00 PM - 4:00 PM</Text>
        </View>
      </View>

      {/* ============================================ */}
      {/* START ENROLLMENT BUTTON                     */}
      {/* This button opens the enrollment form modal */}
      {/* Anyone can click this without logging in    */}
      {/* ============================================ */}
      
      <View style={styles.enrollSection}>
        <Text style={styles.enrollTitle}>Ready to Enroll?</Text>
        <Text style={styles.enrollDescription}>
          Start the enrollment process now. No account needed!
        </Text>
        
        <TouchableOpacity 
          style={styles.startEnrollButton}
          onPress={() => setShowEnrollmentForm(true)}
        >
          <Text style={styles.startEnrollButtonText}>Start Enrollment</Text>
        </TouchableOpacity>
      </View>

      {/* Enrollment Form Modal */}
      <EnrollmentForm 
        visible={showEnrollmentForm}
        onClose={() => setShowEnrollmentForm(false)}
      />
    </View>
  );
}

// ============================================
// STYLES
// ============================================

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
  infoSection: {
    padding: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 12,
  },
  infoCardText: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 6,
    lineHeight: 22,
  },
  enrollSection: {
    backgroundColor: '#e0e7ff',
    padding: 40,
    alignItems: 'center',
    marginTop: 16,
  },
  enrollTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 12,
  },
  enrollDescription: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
    textAlign: 'center',
  },
  startEnrollButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startEnrollButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#64748b',
  },
  formContainer: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 8,
    marginTop: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
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
  hint: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  ageDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  ageLabel: {
    fontSize: 14,
    color: '#475569',
    marginRight: 8,
  },
  ageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  eligibilityBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  eligibleBox: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  notEligibleBox: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  eligibilityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  eligibilityText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  classOptions: {
    gap: 12,
  },
  classOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  classOptionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#2563eb',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  classOptionText: {
    fontSize: 15,
    color: '#475569',
  },
  classOptionTextSelected: {
    color: '#2563eb',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Success styles
  successContainer: {
    alignItems: 'center',
    padding: 24,
  },
  successIcon: {
    fontSize: 64,
    color: '#16a34a',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
