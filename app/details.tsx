// file: details.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

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
  tel?: string;
  website?: string;
  menuUrl?: string;
  rating?: number;
  price?: string;
  amenities?: string[];
  photos?: string[];
}

type RouteParams = {
  restaurant: Restaurant;
};

export default function DetailsScreen() {
  const route = useRoute<RouteProp<Record<string, RouteParams>, 'Details'>>();
  const { restaurant } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Swiper height={220} autoplay dotStyle={{ backgroundColor: '#ccc' }} activeDotStyle={{ backgroundColor: '#333' }}>
          {(restaurant.photos?.length ? restaurant.photos : [restaurant.logoUrl]).map((uri, index) => (
            <Image key={index} source={{ uri: uri || 'https://via.placeholder.com/400x200' }} style={styles.image} />
          ))}
        </Swiper>

        <View style={styles.content}>
          <Text style={styles.name}>{restaurant.name}</Text>

          {restaurant.rating && (
            <View style={styles.row}><FontAwesome name="star" size={18} color="#f4c10f" /><Text style={styles.text}> {restaurant.rating.toFixed(1)} / 5</Text></View>
          )}

          {restaurant.price && (
            <View style={styles.row}><MaterialIcons name="attach-money" size={18} color="#666" /><Text style={styles.text}>{restaurant.price}</Text></View>
          )}

          <View style={styles.section}><Text style={styles.sectionTitle}>📍 Location</Text></View>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.text}>
              {restaurant.location.address}, {restaurant.location.locality}, {restaurant.location.region}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="walk-outline" size={18} color="#666" />
            <Text style={styles.text}>Approximately {(restaurant.distance / 1000).toFixed(2)} km away</Text>
          </View>

          <View style={styles.section}><Text style={styles.sectionTitle}>📂 Info</Text></View>
          <View style={styles.row}>
            <MaterialIcons name="category" size={18} color="#666" />
            <Text style={styles.text}>{restaurant.categories.map(c => c.name).join(', ')}</Text>
          </View>

          {restaurant.tel && (
            <View style={styles.row}>
              <Feather name="phone" size={18} color="#007aff" />
              <Text style={styles.link} onPress={() => Linking.openURL(`tel:${restaurant.tel}`)}>Call</Text>
            </View>
          )}

          {restaurant.website && (
            <View style={styles.row}>
              <Entypo name="link" size={18} color="#007aff" />
              <Text style={styles.link} onPress={() => Linking.openURL(restaurant.website)}>Website</Text>
            </View>
          )}

          {restaurant.menuUrl && (
            <View style={styles.row}>
              <Feather name="book-open" size={18} color="#007aff" />
              <Text style={styles.link} onPress={() => Linking.openURL(restaurant.menuUrl)}>View Menu</Text>
            </View>
          )}

          {restaurant.amenities && restaurant.amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🧾 Amenities</Text>
              <View style={styles.tagContainer}>
                {restaurant.amenities.map((tag, idx) => (
                  <Text key={idx} style={styles.tag}>{tag}</Text>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}><Text style={styles.sectionTitle}>🔗 External</Text></View>
          <View style={styles.row}>
            <Feather name="external-link" size={18} color="#007aff" />
            <Text style={styles.link} onPress={() => Linking.openURL(`https://foursquare.com/v/${restaurant.fsq_id}`)}>
              View on Foursquare
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {restaurant.tel && (
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${restaurant.tel}`)} style={styles.actionBtn}>
            <Ionicons name="call-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => Linking.openURL(`https://foursquare.com/v/${restaurant.fsq_id}`)} style={styles.actionBtn}>
          <Ionicons name="globe-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Foursquare</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`)} style={styles.actionBtn}>
          <Ionicons name="navigate-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Map</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
    paddingTop: 10,
  },
  image: {
    width: width,
    height: 220,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    marginLeft: 8,
    color: '#444',
  },
  link: {
    fontSize: 15,
    marginLeft: 8,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  section: {
    marginTop: 18,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    color: '#444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 13,
    marginRight: 8,
    marginBottom: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#333',
    paddingVertical: 12,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
