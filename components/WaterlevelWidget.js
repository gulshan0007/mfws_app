import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function WaterlevelWidget({ selectedOption, width, height }) {
  const [data, setData] = useState({ station: { name: '' }, waterLevel: [] });
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    setData(generateData());
  }, [selectedOption]);

  const handleStationClick = (stationIndex) => {
    setSelectedStation(stationIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedOption.name}</Text>
      <LineChart
        data={{
          labels: Array.from({ length: 9 }, (_, index) => `Station ${index + 1}`),
          datasets: [{ data: data.waterLevel }]
        }}
        width={300}
        height={200}
        yAxisSuffix=" mm"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
        }}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

function generateData() {
  const data = {
    station: {
      name: `Station ${Math.floor(Math.random() * 100)}`,
    },
    waterLevel: [],
  };

  // Dummy data for water level of 9 stations
  for (let i = 0; i < 9; i++) {
    data.waterLevel.push(Math.floor(Math.random() * 100)); // Random water level values
  }

  return data;
}
