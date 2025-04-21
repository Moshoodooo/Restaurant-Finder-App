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
  Linking,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [mapLink, setMapLink] = useState<string>('');
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
        setMapLink(`https://www.google.com/maps?q=${lat},${lon}`);

        const geocodeRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`);
        const geocodeData = await geocodeRes.json();
        const result = geocodeData.results?.[0]?.components;
        const formattedLocation = [
          result?.city || result?.town || result?.village || 'N/A',
          result?.state || 'N/A',
          result?.country || 'N/A'
        ].join(', ');
        setUserLocation(formattedLocation);

        const searchUrl = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=30000&limit=27&categories=13065`;
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

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} color="#007aff" />;

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.newHeader}>Nearby Restaurants</Text>
      <View style={styles.locationCard}>
        <Ionicons name="location-outline" size={18} color="#1e3a8a" style={{ marginRight: 6, marginTop: 2 }} />
        <Text style={styles.cardText}>You're here:</Text>
      </View>
      <Text style={styles.locationDetails}>{userLocation}</Text>
      {mapLink ? (
        <TouchableOpacity onPress={() => Linking.openURL(mapLink)}>
          <Text style={styles.mapLink}>View on Map</Text>
        </TouchableOpacity>
      ) : null}
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
    <LinearGradient colors={['#f8fbff', '#e0ecff']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
                <Text style={styles.meta}>{(item.distance / 1000).toFixed(2)} km away</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  newHeader: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 4,
  },
  cardText: {
    color: '#1e3a8a',
    fontSize: 13.5,
    fontWeight: '500',
  },
  locationDetails: {
    fontSize: 13,
    color: '#1e40af',
    marginBottom: 4,
    textAlign: 'center',
    lineHeight: 18,
  },
  mapLink: {
    fontSize: 13,
    color: '#2563eb',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  tile: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 6,
    width: (width / 2) - 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
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
