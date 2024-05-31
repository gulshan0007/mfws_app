import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchAllData } from '../../utils/widgetAPI';
import clou from '../assets/cloudy.png';
import img1 from '../assets/download.png';
import img2 from '../assets/download.png';
import img3 from '../assets/download.png';

export default function RainfallWidget({ selectedOption }) {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (selectedOption) {
      fetchAllData(selectedOption.id)
        .then(data => setData(data))
        .catch(error => console.error('Error fetching station data:', error));
    }
  }, [selectedOption]);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.row}>
        <Image source={clou} style={styles.icon} />
        <Text style={styles.temperature}>{data.data.temperature}°C</Text>
        <Text>{data.station.name}</Text>
      </View>
      <View style={styles.row}>
        <Text>{data.data.humidity}</Text>
        <Text>{data.data.pressure}</Text>
      </View>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="300px"
        data={rainfallBarChartData}
        options={barChartOptions}
      />
      <Chart
        chartType="ColumnChart"
        width="110%"
        height="250px"
        data={dailyPredictionChartData}
        options={dailyPredictionOptions}
      />
      <Button title="View Past Rainfall" onPress={() => setModalOpen(true)} />
      {modalOpen && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(!modalOpen)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOpen(!modalOpen)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <View style={styles.imageRow}>
              <Image source={img1} style={styles.image} />
              <Image source={img2} style={styles.image} />
              <Image source={img3} style={styles.image} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
  },
  temperature: {
    fontSize: 24,
    color: '#ff4500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

// Options for the new charts
const barChartOptions = {
  title: "Hourly Rainfall Forecast",
  titleTextStyle: { color: "#fff", fontSize: 14, bold: true },
  hAxis: { 
      title: "Time", 
      titleTextStyle: { color: "#fff" }, 
      textStyle: { color: "#fff" },
      slantedText: true,
      slantedTextAngle: 90
  },
  vAxis: { 
      title: "Rainfall (mm)",
      titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" }, 
      minValue: 0 
  },
  chartArea: { width: "90%", height: "70%" },
  backgroundColor: 'transparent',
  colors: ['#76A7FA', '#ff4500'],
  isStacked: true,
};

const dailyPredictionOptions = {
  title: "Daily Rainfall Forecast",
  titleTextStyle: { color: "#fff", fontSize: 16, bold: true, align: 'center' },
  hAxis: { 
      title: "Day", 
      titleTextStyle: { color: "#fff" }, 
      textStyle: { color: "#fff" } 
  },
  vAxis: { 
      title: "Rainfall (mm)",  
      titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" }, fontSize: 16,
      minValue: 0 
  },
  chartArea: { width: "80%", height: "70%" },
  backgroundColor: 'transparent',
};

// Dummy data for the new charts
const rainfallBarChartData = [
  ["Time", "Rainfall (Past 6 hrs)", "Rainfall (Next 24 hrs)"],
  ["10 AM", 1.5, 0],
  ["11 AM", 2, 0],
  ["12 PM", 0.5, 0],
  ["1 PM", 1, 0],
  ["2 PM", 3, 0],
  ["3 PM", 2.5, 0],
  ["4 PM", 0, 3],
  ["5 PM", 0, 4.5],
  ["6 PM", 0, 5],
  ["7 PM", 0, 3],
  ["8 PM", 0, 4.5],
  ["9 PM", 0, 5],
  ["10 PM", 0, 3.5],
  ["11 PM", 0, 2.5],
  ["12 AM", 0, 3],
  ["1 AM", 0, 4],
  ["2 AM", 0, 3.5],
  ["3 AM", 0, 3],
  ["4 AM", 0, 2.5],
  ["5 AM", 0, 4],
  ["6 AM", 0, 3],
  ["7 AM", 0, 2.5],
  ["8 AM", 0, 4],
  ["9 AM", 0, 3.5],
  ["10 AM", 0, 2],
  ["11 AM", 0, 4],
  ["12 PM", 0, 3],
  ["1 PM", 0, 3.5],
  ["2 PM", 0, 4],
  ["3 PM", 0, 5],
];

const dailyPredictionChartData = [
  ["Day", "Rainfall"],
  ["2 Days Ago", 1.5],
  ["Day Before Yesterday", 2],
  ["Yesterday", 2.5],
  ["Today", 3],
  ["Tomorrow", 2],
  ["Day After Tomorrow", 3.5]
];
