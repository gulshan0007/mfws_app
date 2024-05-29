import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import RainfallWidget from '../components/RainfallWidget';
import { fetchStations } from '../utils/widgetAPI';

export default function HomeScreen() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [widgetVisible, setWidgetVisible] = useState(false);

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStationsData();
  }, []);

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
        style={styles.map}
        initialRegion={{
          latitude: 19.0760, // Mumbai latitude
          longitude: 72.8777, // Mumbai longitude
          latitudeDelta: 0.3, // Zoom level (adjust as needed)
          longitudeDelta: 0.3, // Zoom level (adjust as needed)
        }}
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
