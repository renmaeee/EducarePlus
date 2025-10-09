import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, Dimensions, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../app/context/AuthContext";

const { width, height } = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Error states for validation
  const [errors, setErrors] = useState({
    role: '',
    username: '',
    password: ''
  });

  // Modal state for credentials error
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Clear specific error when user starts typing/selecting
  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      role: '',
      username: '',
      password: ''
    };

    let isValid = true;

    // Validate role selection
    if (!selectedRole) {
      newErrors.role = 'Please select your role';
      isValid = false;
    }

    // Validate username
    if (!username.trim()) {
      newErrors.username = 'Please enter your username';
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = () => {
    // Clear previous errors
    setErrors({ role: '', username: '', password: '' });

    // Validate form
    if (!validateForm()) {
      return;
    }

    console.log('Attempting login with:', { selectedRole, username, password });

    // Mock authentication with correct credentials
    const validCredentials = {
      'eccd_office': { username: 'eccdadmin', password: 'password123' },
      'seed_teacher': { username: 'seedteacher', password: 'password123' },
      'educare_teacher': { username: 'educareteacher', password: 'password123' },
      'parent': { username: 'parentuser', password: 'password123' },
    };

    const roleCredentials = validCredentials[selectedRole];
    
    if (roleCredentials && 
        username.trim() === roleCredentials.username && 
        password.trim() === roleCredentials.password) {
      login(username.trim(), selectedRole);
    } else {
      // Show error modal instead of inline error
      setShowErrorModal(true);
    }
  };

  const getPasswordIcon = () => {
    if (password.length === 0) {
      return "lock-closed-outline";
    }
    // When password has content, only show eye icon (no duplicates)
    return showPassword ? "eye-outline" : "eye-off-outline";
  };

  // Error Modal Component
  const ErrorModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showErrorModal}
      onRequestClose={() => setShowErrorModal(false)}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.iconContainer}>
            <Ionicons name="alert-circle" size={50} color="#ef4444" />
          </View>
          <Text style={modalStyles.modalTitle}>Login Failed</Text>
          <Text style={modalStyles.modalMessage}>
            Invalid username or password for the selected role. Please check your credentials and try again.
          </Text>
          <TouchableOpacity
            style={modalStyles.okButton}
            onPress={() => setShowErrorModal(false)}
            activeOpacity={0.8}
          >
            <Text style={modalStyles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (isMobile) {
    return (
      <View style={mobileStyles.container}>
        {/* Logo Section */}
        <View style={mobileStyles.logoSection}>
          <View style={mobileStyles.logoContainer}>
            <Image
              source={require('../assets/5.png')} // Ensure you have this asset
              style={mobileStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={mobileStyles.brandName}>educare<Text style={mobileStyles.plusSign}>+</Text></Text>
        </View>

        <View style={mobileStyles.formSection}>
          <Text style={mobileStyles.formTitle}>Sign in</Text>

          <View style={mobileStyles.inputGroup}>
            <Text style={mobileStyles.label}>Please select your role</Text>
            <View style={[
              mobileStyles.pickerContainer,
              errors.role && mobileStyles.inputError
            ]}>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(value) => {
                  setSelectedRole(value);
                  clearError('role');
                }}
                style={mobileStyles.picker}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="ECCD Office-in-charge" value="eccd_office" />
                <Picker.Item label="SEED Teacher" value="seed_teacher" />
                <Picker.Item label="Educare Teacher" value="educare_teacher" />
                <Picker.Item label="Parent" value="parent" />
              </Picker>
            </View>
            {errors.role ? <Text style={mobileStyles.errorText}>{errors.role}</Text> : null}
          </View>

          <View style={mobileStyles.inputGroup}>
            <Text style={mobileStyles.label}>Username</Text>
            <View style={mobileStyles.inputContainer}>
              <TextInput
                placeholder="username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  clearError('username');
                }}
                style={[
                  mobileStyles.inputWithIcon,
                  errors.username && mobileStyles.inputErrorBorder
                ]}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              <View style={mobileStyles.inputIcon}>
                <Ionicons name="person-outline" size={20} color="#666" />
              </View>
            </View>
            {errors.username ? <Text style={mobileStyles.errorText}>{errors.username}</Text> : null}
          </View>

          <View style={mobileStyles.inputGroup}>
            <Text style={mobileStyles.label}>Password</Text>
            <View style={mobileStyles.inputContainer}>
              <TextInput
                placeholder="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError('password');
                }}
                style={[
                  mobileStyles.inputWithIcon,
                  errors.password && mobileStyles.inputErrorBorder
                ]}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={mobileStyles.inputIcon}
                onPress={() => {
                  if (password.length > 0) {
                    setShowPassword(!showPassword);
                  }
                }}
                activeOpacity={password.length > 0 ? 0.7 : 1}
              >
                <Ionicons
                  key={getPasswordIcon()}
                  name={getPasswordIcon()}
                  size={20}
                  color={password.length > 0 ? "#666" : "#999"}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={mobileStyles.errorText}>{errors.password}</Text> : null}
          </View>

          <TouchableOpacity style={mobileStyles.forgotPassword} activeOpacity={0.7}>
            <Text style={mobileStyles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={mobileStyles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={mobileStyles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Error Modal */}
        <ErrorModal />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftSide}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/5.png')} // Ensure you have this asset
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>educare<Text style={styles.plusSign}>+</Text></Text>
        </View>

        <View style={styles.rightSide}>
          <Text style={styles.formTitle}>Sign In</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Please select your role</Text>
            <View style={[
              styles.pickerContainer,
              errors.role && styles.inputError
            ]}>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(value) => {
                  setSelectedRole(value);
                  clearError('role');
                }}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="ECCD Office-in-charge" value="eccd_office" />
                <Picker.Item label="SEED Teacher" value="seed_teacher" />
                <Picker.Item label="Educare Teacher" value="educare_teacher" />
                <Picker.Item label="Parent" value="parent" />
              </Picker>
            </View>
            {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  clearError('username');
                }}
                style={[
                  styles.inputWithIcon,
                  errors.username && styles.inputErrorBorder
                ]}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              <View style={styles.inputIcon}>
                <Ionicons name="person-outline" size={20} color="#666" />
              </View>
            </View>
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError('password');
                }}
                style={[
                  styles.inputWithIcon,
                  errors.password && styles.inputErrorBorder
                ]}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => {
                  if (password.length > 0) {
                    setShowPassword(!showPassword);
                  }
                }}
                activeOpacity={password.length > 0 ? 0.7 : 1}
              >
                <Ionicons
                  key={getPasswordIcon()}
                  name={getPasswordIcon()}
                  size={20}
                  color={password.length > 0 ? "#666" : "#999"}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Modal */}
      <ErrorModal />
    </View>
  );
}

// Modal Styles
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  iconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  okButton: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minWidth: 100,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Mobile Styles (Original design with error handling)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e40af',
    letterSpacing: 1,
    textAlign: 'center',
  },
  plusSign: {
    color: '#1e40af',
    fontWeight: 'normal',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 28,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  picker: {
    height: 50,
    color: '#374151',
  },
  inputContainer: {
    position: 'relative',
  },
  inputWithIcon: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 45,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#374151',
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    top: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 28,
  },
  forgotPasswordText: {
    color: '#1e40af',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#1e40af',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Error styling
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  inputErrorBorder: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

// Web Styles (Original design with error handling)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 0,
    width: '95%',
    maxWidth: 1000,
    height: 'auto',
    minHeight: 600,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  brandName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e40af',
    letterSpacing: 2,
    textAlign: 'center',
  },
  plusSign: {
    color: '#1e40af',
    fontWeight: 'normal',
  },
  rightSide: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  picker: {
    height: 50,
    color: '#374151',
  },
  inputContainer: {
    position: 'relative',
  },
  inputWithIcon: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 45,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#374151',
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    top: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#1e40af',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#1e40af',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Error styling
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  inputErrorBorder: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});