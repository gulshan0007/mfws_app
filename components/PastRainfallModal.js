import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PastRainfallModal = ({ closeModal }) => {
  // Dummy past rainfall data
  const pastRainfallData = [
    { date: '2024-05-20', rainfall: 10 },
    { date: '2024-05-21', rainfall: 15 },
    { date: '2024-05-22', rainfall: 20 },
    { date: '2024-05-23', rainfall: 12 },
    { date: '2024-05-24', rainfall: 18 },
  ];

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalHeader}>Past Rainfall</Text>
      {pastRainfallData.map((item, index) => (
        <View key={index} style={styles.rainfallItem}>
          <Text>{item.date}</Text>
          <Text>{item.rainfall} mm</Text>
        </View>
      ))}
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 100,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rainfallItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PastRainfallModal;
