import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import {
  Slot,
  useRouter,
  usePathname,
  useLocalSearchParams,
} from "expo-router";

// Navigation bar component with Home, Admission, About, Contact tabs
const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const navRef = useRef(null);

  // Detect if device supports touch
  useEffect(() => {
    const checkTouchDevice = () => {
      if (Platform.OS === "web") {
        return (
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        );
      }
      return Platform.OS === "ios" || Platform.OS === "android";
    };

    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isTouchDevice || !activeDropdown) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (Platform.OS === "web") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeDropdown, isTouchDevice]);

  // Handle tab interaction (hover for desktop, click for mobile)
  const handleTabEnter = (label, hasDropdown) => {
    if (!isTouchDevice && hasDropdown) {
      setHoveredTab(label);
    }
  };

  const handleTabLeave = () => {
    if (!isTouchDevice) {
      setHoveredTab(null);
    }
  };

  const handleTabClick = (label, path, hasDropdown) => {
    if (isTouchDevice && hasDropdown) {
      // Toggle dropdown on touch devices
      setActiveDropdown(activeDropdown === label ? null : label);
    } else if (!hasDropdown) {
      // Navigate if no dropdown
      router.push(path);
    } else if (!isTouchDevice && hasDropdown) {
      // On desktop, clicking the main tab navigates WITHOUT section param
      router.push(path);
    }
  };

  // Determine if dropdown should be shown
  const shouldShowDropdown = (label, hasDropdown) => {
    if (!hasDropdown) return false;
    return isTouchDevice ? activeDropdown === label : hoveredTab === label;
  };

  // Define navigation items with optional dropdown menus
  const navItems = [
    {
      label: "Home",
      path: "/Tabs",
      dropdown: [
        { label: "Why Choose Us?", path: "/Tabs", section: "whychooseus" },
        { label: "Our Programs", path: "/Tabs", section: "programs" },
      ],
    },
    {
      label: "Admission",
      path: "/Tabs/admissionTab/admission",
      dropdown: [
        {
          label: "Enrollment Process",
          path: "/Tabs/admissionTab/admission",
          section: "enrollment",
        },
        {
          label: "How to Enroll",
          path: "/Tabs/admissionTab//admission",
          section: "how-to",
        },
        {
          label: "Requirements to Enroll",
          path: "/Tabs/admissionTab/admission",
          section: "requirements",
        },
      ],
    },
    {
      label: "About",
      path: "/Tabs/about",
      dropdown: [
        { label: "Our Mission", path: "/Tabs/about", section: "mission" },
        { label: "Our Vision", path: "/Tabs/about", section: "vision" },
        { label: "Our Core Values", path: "/Tabs/about", section: "corevalue" },
        {
          label: "Our Story",
          path: "/Tabs/about",
          section: "historyofeducare",
        },
        {
          label: "Educare Division Office Location",
          path: "/Tabs/about",
          section: "educaredivisionofficelocation",
        },
      ],
    },
    {
      label: "Contact",
      path: "/Tabs/contact",
      dropdown: [
        {
          label: "Contact Information",
          path: "/Tabs/contact",
          section: "info",
        },
        { label: "Send Message", path: "/Tabs/contact", section: "message" },
        { label: "Location", path: "/Tabs/contact", section: "location" },
      ],
    },
  ];

  // Check if current path matches nav item
  const isActive = (path) => {
    if (path === "/Tabs") {
      return pathname === "/Tabs" || pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <View ref={navRef} style={styles.navbar}>
      {/* Logos Section */}
      <View style={styles.logosContainer}>
        <Image
          source={require("../../assets/images/NagaCityLogo.png")}
          style={styles.nagaCityLogo}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/EDUCARE-Program.png")}
          style={styles.educareProgramLogo}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/SEED-Logo.png")}
          style={styles.seedLogo}
          resizeMode="contain"
        />

        {/* Header */}
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.logoTitle,
              {
                color: "#1a1a1a",
              },
            ]}
          >
            EDUCARE Service Program
          </Text>
          <Text
            style={[
              styles.logoSubtitle,
              {
                color: "#2155DF",
              },
            ]}
          >
            NAGA EARLY EDUCATION AND DEVELOPMENT
          </Text>
        </View>
      </View>

      {/* Navigation Links */}
      <View style={styles.navLinks}>
        {navItems.map((item, index) => {
          const hasDropdown = !!item.dropdown;
          return (
            <View
              key={item.path}
              style={styles.navItemWrapper}
              onMouseEnter={() => handleTabEnter(item.label, hasDropdown)}
              onMouseLeave={handleTabLeave}
            >
              <TouchableOpacity
                style={[
                  styles.navItem,
                  isActive(item.path) && styles.navItemActive,
                ]}
                onPress={() => {
                  if (isTouchDevice && hasDropdown) {
                    // On touch devices, toggle dropdown
                    handleTabClick(item.label, item.path, hasDropdown);
                  } else {
                    // On desktop or no dropdown, navigate to main path
                    router.push(item.path);
                  }
                }}
              >
                <Text
                  style={[
                    styles.navText,
                    isActive(item.path) && styles.navTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>

              {/* Dropdown Menu */}
              {shouldShowDropdown(item.label, hasDropdown) && (
                <View style={styles.dropdownMenu}>
                  {item.dropdown.map((dropItem) => (
                    <TouchableOpacity
                      key={dropItem.section || dropItem.path}
                      style={styles.dropdownItem}
                      onPress={() => {
                        if (dropItem.section) {
                          router.push({
                            pathname: dropItem.path,
                            params: { section: dropItem.section },
                          });
                        } else {
                          router.push(dropItem.path);
                        }
                        // Close dropdown after navigation on touch devices
                        if (isTouchDevice) {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      <Text style={styles.dropdownText}>{dropItem.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main layout component
export default function PublicLayout() {
  const scrollViewRef = useRef(null);

  return (
    <View style={styles.container}>
      {/* Navigation Bar - appears on all public pages */}
      <NavigationBar />

      {/* Page Content - Slot renders the current page */}
      {Platform.OS === "web" ? (
        // On web, don't use ScrollView wrapper - let pages handle their own scrolling
        <View style={styles.content}>
          <Slot />
        </View>
      ) : (
        // On native, use ScrollView
        <ScrollView
          ref={scrollViewRef}
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Slot />
        </ScrollView>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 EducarePlus. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  navbar: {
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    zIndex: 1000,
    position: "relative",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  navLinks: {
    flexDirection: "row",
    gap: 8,
    zIndex: 1001,
  },
  navItemWrapper: {
    position: "relative",
    zIndex: 1002,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  navItemActive: {
    borderBottomColor: "#2563eb",
  },
  navText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  navTextActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  loginButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "#1e3a5f",
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  logosContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
    width: 246.5,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: "#2155DF",
    fontFamily: "Helvetica",
  },
});
