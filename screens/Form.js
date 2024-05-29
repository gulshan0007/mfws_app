import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [waterLevelFactor, setWaterLevelFactor] = useState(0);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    // Validate form fields
    if (!name || !height || !waterLevelFactor || !location) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Calculate water level adjusted
    const waterLevelAdjusted = height * waterLevelFactor;

    // Prepare data
    const data = {
      name,
      waterlevel: waterLevelAdjusted,
      location,
    };

    // Send data to server
    try {
      const response = await axios.post('http://192.168.1.100:8000/crowdsource/data/', data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error storing data:', error);
      setMessage('Error: Unable to store data.');
    }
  };

  const handleOption = (value) => {
    setWaterLevelFactor(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <View style={styles.waterLevelContainer}>
        <Text style={styles.waterLevelText}>Water Level (choose one):</Text>
        <View style={styles.waterLevelOptions}>
  {/* First pair */}
  <View style={styles.optionPair}>
    <TouchableOpacity
      style={[styles.option, waterLevelFactor === 0.2 && styles.activeOption]}
      onPress={() => handleOption(0.4)}
    >
      <Image source={require('../assets/crowdsource/1.png')} style={styles.image} />
      <Text>Low</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.option, waterLevelFactor === 0.4 && styles.activeOption]}
      onPress={() => handleOption(0.6)}
    >
      <Image source={require('../assets/crowdsource/2.png')} style={styles.image} />
      <Text>Medium</Text>
    </TouchableOpacity>
  </View>

  {/* Second pair */}
  <View style={styles.optionPair}>
    <TouchableOpacity
      style={[styles.option, waterLevelFactor === 0.6 && styles.activeOption]}
      onPress={() => handleOption(0.9)}
    >
      <Image source={require('../assets/crowdsource/3.png')} style={styles.image} />
      <Text>Very High</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.option, waterLevelFactor === 0.9 && styles.activeOption]}
      onPress={() => handleOption(0.9)}
    >
      <Image source={require('../assets/crowdsource/4.png')} style={styles.image} />
      <Text>Very High</Text>
    </TouchableOpacity>
  </View>
</View>

      </View>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  waterLevelContainer: {
    marginBottom: 5,
  },
  waterLevelText: {
    marginBottom: 5,
  },
  waterLevelOptions: {
    flexDirection: 'row',
  },
  option: {
    alignItems: 'center',
    marginRight: 5,
  },
  activeOption: {
    backgroundColor: 'blue', // Change color as needed
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});

export default Form;
