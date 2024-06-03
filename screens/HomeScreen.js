import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import RainfallWidget from '../components/RainfallWidget';
import { fetchStations } from '../utils/widgetAPI';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 19.0760, // Mumbai latitude
    longitude: 72.8777, // Mumbai longitude
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  });

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
        requestLocationPermission();
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStationsData();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to show the nearest station.',
        [{ text: 'OK' }]
      );
      return;
    }

    locateCurrentPosition();
  };

  const locateCurrentPosition = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const nearestStation = findNearestStation(latitude, longitude);
    
    if (nearestStation) {
      const newRegion = {
        latitude: nearestStation.latitude,
        longitude: nearestStation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      mapRef.current.animateToRegion(newRegion, 1000); // Smoothly animate to the new region in 1 second
      handleMarkerPress(nearestStation);
    } else {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      mapRef.current.animateToRegion(newRegion, 1000); // Smoothly animate to the new region in 1 second
    }
  };

  const findNearestStation = (latitude, longitude) => {
    if (stations.length === 0) return null;

    let nearestStation = null;
    let minDistance = Number.MAX_VALUE;

    stations.forEach((station) => {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        station.latitude,
        station.longitude
      );

      if (distance < minDistance) {
        nearestStation = station;
        minDistance = distance;
      }
    });

    return nearestStation;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
    setWidgetVisible(true);
  };

  const closeWidget = () => {
    setWidgetVisible(false);
    setSelectedStation(null);
  };

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {stations.map((station, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
            onPress={() => handleMarkerPress(station)}
          >
            <Callout>
              <Text>{station.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Modal
        visible={widgetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeWidget}
      >
        <View style={styles.widgetContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeWidget}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedStation && <RainfallWidget selectedOption={selectedStation} />}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  widgetContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
  },
});
