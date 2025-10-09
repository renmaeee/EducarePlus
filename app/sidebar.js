// app/sidebar.js - Enhanced with complete role-based navigation
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Get role-specific navigation configuration
  const getNavigationConfig = () => {
    switch (user?.role) {
      case 'eccd_office':
        return {
          basePath: '/eccd_office', // Corrected: this is the direct URL path
          roleTitle: 'ECCD OFFICE',
          mainLinks: [
            { label: 'Dashboard', route: '/eccd_office', icon: 'home-outline' },
            { label: 'Inbox', route: '/eccd_office/inbox', icon: 'mail-outline' },
            { label: 'Employee', route: '/eccd_office/employee', icon: 'people-outline' },
            { label: 'Reports', route: '/eccd_office/reports', icon: 'document-text-outline' },
            { label: 'Calendar', route: '/eccd_office/calendar', icon: 'calendar-outline' },
            { label: 'Observation', route: '/eccd_office/classroom', icon: 'eye-outline' },
          ],
          userLinks: [
            { label: 'Profile', route: '/eccd_office/profile', icon: 'person-circle-outline' },
            { label: 'Settings', route: '/eccd_office/settings', icon: 'settings-outline' },
          ]
        };

      case 'seed_teacher':
        return {
          basePath: '/seed_teacher', // Corrected
          roleTitle: 'SEED TEACHER',
          mainLinks: [
            { label: 'Dashboard', route: '/seed_teacher', icon: 'home-outline' },
            { label: 'Enrollment', route: '/seed_teacher/enrollment', icon: 'person-add-outline' },
            { label: 'Class List', route: '/seed_teacher/classlist', icon: 'list-outline' },
            { label: 'Reports', route: '/seed_teacher/reports', icon: 'document-text-outline' },
            { label: 'Calendar', route: '/seed_teacher/calendar', icon: 'calendar-outline' },
            { label: 'Inbox', route: '/seed_teacher/inbox', icon: 'mail-outline' },
          ],
          userLinks: [
            { label: 'Profile', route: '/seed_teacher/profile', icon: 'person-circle-outline' },
            { label: 'Settings', route: '/seed_teacher/settings', icon: 'settings-outline' },
          ]
        };

      case 'educare_teacher':
        return {
          basePath: '/educare_teacher', // Corrected
          roleTitle: 'EDUCARE TEACHER',
          mainLinks: [
            { label: 'Dashboard', route: '/educare_teacher', icon: 'home-outline' },
            { label: 'Enrollment', route: '/educare_teacher/enrollment', icon: 'person-add-outline' },
            { label: 'Class List', route: '/educare_teacher/classlist', icon: 'list-outline' },
            { label: 'Reports', route: '/educare_teacher/reports', icon: 'document-text-outline' },
            { label: 'Calendar', route: '/educare_teacher/calendar', icon: 'calendar-outline' },
            { label: 'Inbox', route: '/educare_teacher/inbox', icon: 'mail-outline' },
          ],
          userLinks: [
            { label: 'Profile', route: '/educare_teacher/profile', icon: 'person-circle-outline' },
            { label: 'Settings', route: '/educare_teacher/settings', icon: 'settings-outline' },
          ]
        };

      case 'parent':
        return {
          basePath: '/parent', // Corrected
          roleTitle: 'PARENT',
          mainLinks: [
            { label: 'Dashboard', route: '/parent', icon: 'home-outline' },
            { label: 'Child Info', route: '/parent/child-info', icon: 'happy-outline' },
            { label: 'Schedule', route: '/parent/schedule', icon: 'time-outline' },
            { label: 'Inbox', route: '/parent/inbox', icon: 'mail-outline' },
          ],
          userLinks: [
            { label: 'Profile', route: '/parent/profile', icon: 'person-circle-outline' },
            { label: 'Settings', route: '/parent/settings', icon: 'settings-outline' },
          ]
        };

      default:
        return {
          basePath: '/login',
          roleTitle: 'USER',
          mainLinks: [],
          userLinks: []
        };
    }
  };

  const config = getNavigationConfig();
  const { mainLinks, userLinks, roleTitle } = config;

  const isActiveRoute = (route) => {
    if (route === config.basePath) {
      return pathname === route || pathname === `${route}/`;
    }
    return pathname.startsWith(route);
  };

  if (isMobile) {
    return (
      <View style={mobileStyles.bottomNav}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={mobileStyles.navContent}
        >
          {mainLinks.map(link => (
            <TouchableOpacity
              key={link.route}
              onPress={() => router.push(link.route)}
              style={[
                mobileStyles.navItem,
                isActiveRoute(link.route) && mobileStyles.activeNavItem
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={link.icon}
                size={20}
                color={isActiveRoute(link.route) ? '#fff' : '#8B9DC3'}
              />
              <Text style={[
                mobileStyles.navText,
                isActiveRoute(link.route) && mobileStyles.activeNavText
              ]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}

          {userLinks.map(link => (
            <TouchableOpacity
              key={link.route}
              onPress={() => router.push(link.route)}
              style={[
                mobileStyles.navItem,
                isActiveRoute(link.route) && mobileStyles.activeNavItem
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={link.icon}
                size={20}
                color={isActiveRoute(link.route) ? '#fff' : '#8B9DC3'}
              />
              <Text style={[
                mobileStyles.navText,
                isActiveRoute(link.route) && mobileStyles.activeNavText
              ]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={logout}
            style={mobileStyles.logoutItem}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={mobileStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={webStyles.sidebar}>
      <View style={webStyles.logoSection}>
        <Image
          source={require('../assets/4.png')} // Ensure you have this asset
          style={webStyles.logo}
          resizeMode="contain"
        />
        <Text style={webStyles.roleText}>{roleTitle}</Text>
      </View>

      <View style={webStyles.section}>
        <Text style={webStyles.sectionTitle}>MAIN</Text>
        <View style={webStyles.divider} />
        {mainLinks.map(link => (
          <TouchableOpacity
            key={link.route}
            onPress={() => router.push(link.route)}
            style={[webStyles.link, isActiveRoute(link.route) && webStyles.activeLink]}
          >
            <Ionicons
              name={link.icon}
              size={20}
              color={isActiveRoute(link.route) ? '#fff' : '#d1d5db'}
              style={webStyles.icon}
            />
            <Text style={[webStyles.linkText, isActiveRoute(link.route) && webStyles.activeText]}>
              {link.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={webStyles.section}>
        <Text style={webStyles.sectionTitle}>USER</Text>
        <View style={webStyles.divider} />
        {userLinks.map(link => (
          <TouchableOpacity
            key={link.route}
            onPress={() => router.push(link.route)}
            style={[webStyles.link, isActiveRoute(link.route) && webStyles.activeLink]}
          >
            <Ionicons
              name={link.icon}
              size={20}
              color={isActiveRoute(link.route) ? '#fff' : '#d1d5db'}
              style={webStyles.icon}
            />
            <Text style={[webStyles.linkText, isActiveRoute(link.route) && webStyles.activeText]}>
              {link.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={logout} style={[webStyles.link, webStyles.logout]}>
        <Ionicons name="log-out-outline" size={20} color="#fff" style={webStyles.icon} />
        <Text style={[webStyles.linkText, { color: '#fff' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Mobile Styles
const mobileStyles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#213594',
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2E4A9B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  navContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    minWidth: 70,
  },
  activeNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  navText: {
    color: '#8B9DC3',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  activeNavText: {
    color: '#fff',
    fontWeight: '600',
  },
  logoutItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#dc2626',
    minWidth: 70,
  },
  logoutText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});

// Web Styles
const webStyles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#213594',
    paddingTop: 20,
    paddingHorizontal: 0,
    height: '100%',
    flexDirection: 'column',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 120,
  },
  roleText: {
    color: '#8B9DC3',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 10,
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#8B9DC3',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#2E4A9B',
    marginBottom: 15,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 8,
  },
  activeLink: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    marginRight: 12,
    width: 20,
  },
  linkText: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  logout: {
    marginTop: 'auto',
    marginBottom: 20,
    marginHorizontal: 25,
    backgroundColor: '#dc2626',
  },
});