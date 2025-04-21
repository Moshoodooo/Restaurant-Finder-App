// app/restaurant/[id].tsx or similar route file
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RestaurantDetails() {
  const params = useLocalSearchParams();
  const id = params?.id ?? 'Unknown'; // Fallback if ID is missing

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Restaurant Details</Text>
      <Text style={styles.subText}>
        {id !== 'Unknown'
          ? `You are viewing restaurant with ID: ${id}`
          : 'Restaurant ID is missing from the route.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
});
