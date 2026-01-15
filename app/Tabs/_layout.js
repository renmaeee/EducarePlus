/**
 *  Website Layout
 * 
 * This layout provides the main structure for the  website.
 * It includes a navigation bar that appears on all pages.
 * Anyone can access these pages without logging in.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';

// Navigation bar component with Home, Admission, About, Contact tabs
const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Define navigation items
  const navItems = [
    { label: 'Home', path: '/Tabs' },
    { label: 'Admission', path: '/Tabs/admission' },
    { label: 'About', path: '/Tabs/about' },
    { label: 'Contact', path: '/Tabs/contact' },
  ];

  // Check if current path matches nav item
  const isActive = (path) => {
    if (path === '/Tabs') {
      return pathname === '/Tabs' || pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <View style={styles.navbar}>
      {/* Logos Section */}
      <View style={styles.logosContainer}>
        <Image 
          source={require('../../assets/images/NagaCityLogo.png')} 
          style={styles.nagaCityLogo}
          resizeMode="contain"
        />
        <Image 
          source={require('../../assets/images/EDUCARE-Program.png')} 
          style={styles.educareProgramLogo}
          resizeMode="contain"
        />
        <Image 
          source={require('../../assets/images/SEED-Logo.png')} 
          style={styles.seedLogo}
          resizeMode="contain"
        />
      </View>

      {/* Logo/Brand */}
      {/* <Text style={styles.logo}>NAGA EARLY EDUCATION AND DEVELOPMENT</Text> */}
      <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.logoTitle,
                      {
                        color: "#ffffff",
                      },
                    ]}
                  >
                    EDUCARE Service Program
                  </Text>
                  <Text
                    style={[
                      styles.logoSubtitle,
                      {
                        color: "#fbfcfc",
                      },
                    ]}
                  >
                    NAGA EARLY EDUCATION AND DEVELOPMENT
                  </Text>
                </View>
      
      {/* Navigation Links */}
      <View style={styles.navLinks}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.path}
            style={[styles.navItem, isActive(item.path) && styles.navItemActive]}
            onPress={() => router.push(item.path)}
          >
            <Text style={[styles.navText, isActive(item.path) && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Login Button */}
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main layout component
export default function PublicLayout() {
  return (
    <View style={styles.container}>
      {/* Navigation Bar - appears on all public pages */}
      <NavigationBar />
      
      {/* Page Content - Slot renders the current page */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Slot />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 EducarePlus. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 8,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navText: {
    color: '#e0e7ff',
    fontSize: 16,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  logosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
nagaCityLogo: {
    width: 110,
    height: 110,
    marginRight: -17,
  },
  educareProgramLogo: {
    width: 115,
    height: 115,
    marginRight: -25,
  },
  seedLogo: {
    width: 115,
    height: 115,
    marginRight: 10,
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: -5,
  },
  logoTitle: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Times New Roman",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
    logoSubtitle: {
    fontSize: 16.5,
    fontWeight: "600",
    fontFamily: "Times New Roman",
    letterSpacing: 0.8,
    color: "#1E90FF",
  },
});
