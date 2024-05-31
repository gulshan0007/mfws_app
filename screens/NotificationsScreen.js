import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FormScreen from './Form';

const CrowdSourceMap = () => {
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Dummy data for markers
  const dummyMarkers = [
    { id: 1, latitude: 19.0760, longitude: 72.8777 },
    // Add more markers as needed
  ];

  useEffect(() => {
    // Convert dummyMarkers to Marker components
    const mapMarkers = dummyMarkers.map(marker => (
      <Marker
        key={marker.id}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        onPress={() => setShowForm(true)} // Show form when marker is pressed
      />
    ));
    setMarkers(mapMarkers);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.0760,
          longitude: 72.8777,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        {markers}
      </MapView>
      <Modal visible={showForm} animationType="slide">
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowForm(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <FormScreen />
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
  },
});

export default CrowdSourceMap;
