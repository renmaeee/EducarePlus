// src/app/(dashboard)/eccd_office/inbox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inbox Screen (ECCD Office)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});