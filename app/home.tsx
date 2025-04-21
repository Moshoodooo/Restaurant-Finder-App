// app/home.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#f8fbff', '#e0ecff']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerSection}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/96/restaurant.png' }}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>Restaurant Finder</Text>
            <Text style={styles.headerSubtitle}>🚀 Discover the best places to eat near you</Text>
          </View>

          <View style={styles.cardsContainer}>
            <LinearGradient colors={['#dfefff', '#bfdfff']} style={styles.cardGradient}>
              <View style={styles.cardDecor} />
              <View style={styles.cardContentEnhanced}>
                <View style={styles.badge}><Text style={styles.badgeText}>Top Rated</Text></View>
                <Image
                  source={{ uri: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-restaurant-food-delivery-flaticons-lineal-color-flat-icons.png' }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>🍽️ View Restaurants</Text>
                <Text style={styles.cardDescription}>Find trending spots & local favorites near you</Text>
                <Pressable
                  style={({ pressed }) => [styles.cardButton, pressed && styles.pressed]}
                  onPress={() => router.push('/restaurant')}
                >
                  <Text style={styles.cardButtonText}>Explore</Text>
                </Pressable>
              </View>
            </LinearGradient>

            <LinearGradient colors={['#ffe5f2', '#fddde6']} style={styles.cardGradient}>
              <View style={styles.cardDecorAlt} />
              <View style={styles.cardContentEnhanced}>
                <View style={styles.badgeAlt}><Text style={styles.badgeText}>Your Space</Text></View>
                <Image
                  source={{ uri: 'https://img.icons8.com/color/96/test-account.png' }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>👤 View Profile</Text>
                <Text style={styles.cardDescription}>Manage favorites, settings & reservations</Text>
                <Pressable
                  style={({ pressed }) => [styles.cardButton, pressed && styles.pressed]}
                  onPress={() => router.push('/profile')}
                >
                  <Text style={styles.cardButtonText}>Go to Profile</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 24,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'relative',
  },
  cardDecor: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(0,122,255,0.1)',
  },
  cardDecorAlt: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    borderTopLeftRadius: 20,
    backgroundColor: 'rgba(255,105,180,0.1)',
  },
  cardContentEnhanced: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  cardImage: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#222',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  badge: {
    backgroundColor: '#e0ecff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  badgeAlt: {
    backgroundColor: '#fce1ec',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
});
