// file: restaurant.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const FOURSQUARE_API_KEY = 'fsq311Brwpet7ex7mnUIhm9KvvOETNPgzEikZtZeNXNRy5A=';
const OPENCAGE_API_KEY = 'be2ab3d878ed4fdabef90bc41963ace5';

interface Restaurant {
  fsq_id: string;
  name: string;
  location: {
    address: string;
    locality: string;
    region?: string;
    country?: string;
  };
  distance: number;
  categories: { name: string }[];
  logoUrl?: string;
}

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Location permission denied.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        const geocodeRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`);
        const geocodeData = await geocodeRes.json();
        const result = geocodeData.results?.[0]?.components;
        const formattedLocation = [
          result?.neighbourhood,
          result?.suburb,
          result?.city || result?.town || result?.village,
          result?.state,
          result?.country,
        ].filter(Boolean).join(', ');
        setUserLocation(formattedLocation || 'Unknown');

        const searchUrl = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=10000&limit=27`;
        const res = await fetch(searchUrl, {
          headers: {
            Accept: 'application/json',
            Authorization: FOURSQUARE_API_KEY,
          },
        });

        const data = await res.json();
        const rawRestaurants: Restaurant[] = data.results || [];

        const enrichedRestaurants: Restaurant[] = await Promise.all(
          rawRestaurants.map(async (r) => {
            try {
              const photoRes = await fetch(`https://api.foursquare.com/v3/places/${r.fsq_id}/photos?limit=1`, {
                headers: {
                  Accept: 'application/json',
                  Authorization: FOURSQUARE_API_KEY,
                },
              });
              const photos = await photoRes.json();
              if (Array.isArray(photos) && photos.length > 0) {
                const { prefix, suffix } = photos[0];
                r.logoUrl = `${prefix}original${suffix}`;
              }
            } catch (e) {
              console.warn(`Photo fetch failed for ${r.fsq_id}`, e);
            }
            return r;
          })
        );

        setRestaurants(enrichedRestaurants);
        setLoading(false);
      } catch (error) {
        console.error('Error during fetch:', error);
        setLoading(false);
      }
    })();
  }, []);

  const filteredRestaurants = restaurants.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} color="#ff6600" />;

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>🍽️ Nearby Restaurants</Text>
      <Text style={styles.subHeader}>📍 You are at: <Text style={styles.locationText}>{userLocation}</Text></Text>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" style={{ marginHorizontal: 8 }} />
        <TextInput
          placeholder="Search restaurants..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.fsq_id}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={<ListHeader />}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('details', { restaurant: item })}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.logoUrl || 'https://via.placeholder.com/400x200.png?text=Restaurant' }}
                style={styles.image}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>{item.location.address}, {item.location.locality}</Text>
              <Text style={styles.meta}>{item.categories.map(c => c.name).join(', ')}</Text>
              <Text style={styles.meta}>🚶 {(item.distance / 1000).toFixed(2)} km away</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fdf6f0',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  locationText: {
    color: '#000',
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
    color: '#333',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  tile: {
    backgroundColor: '#fff',
    borderRadius: 18,
    margin: 6,
    width: (width / 2) - 20,
    elevation: 3,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  image: {
    width: '100%',
    height: 120,
  },
  info: {
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  address: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
});
