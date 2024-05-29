import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import WaterlevelWidget from '../components/WaterlevelWidget';

// Dummy markers for the map
const dummyMarkers = [
  { position: [19.12416667, 72.84694444], name: "Andheri Subway (bandh)" },
  { position: [19.12416867, 72.84685544], name: "Andheri Subway Pole (Alternate location)" },
  { position: [19.03127051, 72.85837318], name: "Gandhi Market below the King Circle bridge" },
  { position: [19.00870649, 72.84182174], name: "Hindmata (Pole 1)" },
  { position: [19.07529221, 72.84067776], name: "Khar Subway" },
  { position: [19.07525531, 72.84044246], name: "Khar subway (alternate location pole)" },
  { position: [19.07351796, 72.84974291], name: "Mumbai university" },
  { position: [18.97377629, 72.82290942], name: "Nair Hospital (Outside HDFC bank)" },
  { position: [18.9740177, 72.82299581], name: "Nair hospital (alternate location street pole)" },
  { position: [18.96205825, 72.81331529], name: "Nana chowk (Shri Krishna Hotel)" },
  { position: [19.06087774, 72.89412691], name: "16th Postal colony road" },
  { position: [19.13038919, 72.89581639], name: "BMC's 8 MLD plant behind L&T, Filterpada" }
];

export default function WaterlevelMap() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMarker(null);
  };

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
        {dummyMarkers.map((dummyMarker, index) => (
          <Marker
            key={`dummy-${index}`}
            coordinate={{
              latitude: dummyMarker.position[0],
              longitude: dummyMarker.position[1]
            }}
            onPress={() => handleMarkerPress(dummyMarker)}
          >
            <Callout>
              <Text>{dummyMarker.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedMarker && <WaterlevelWidget selectedOption={selectedMarker} />}
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
  modalContainer: {
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
