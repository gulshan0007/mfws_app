import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const buttonSize = new Animated.Value(1);
  const blinkAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start blinking animation when component mounts
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handlePress = () => {
    navigation.navigate('Form');
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 1.5,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let iconName;
        if (route.name === 'Rainfall') {
          iconName = isFocused ? 'rainy' : 'rainy-outline';
        } else if (route.name === 'Waterlevel') {
          iconName = isFocused ? 'water' : 'water-outline';
        } else if (route.name === 'Crowdsourcing') {
          iconName = isFocused ? 'accessibility' : 'accessibility-outline';
        } else if (route.name === 'Rail') {
          iconName = isFocused ? 'train' : 'train-outline';
        } else if (route.name === 'About-Us') {
          iconName = isFocused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
        } else if (route.name === 'Form') { // Conditionally render "Form" screen
          return null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons name={iconName} size={24} color={isFocused ? 'tomato' : 'gray'} />
            <Text style={[styles.label, { color: isFocused ? 'tomato' : 'gray' }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <Animated.View style={[styles.button, { transform: [{ scale: buttonSize }] }]}>
          <Animated.Text style={[styles.buttonText, { opacity: blinkAnimation }]}>
            Click to Report Flood in Your Area
          </Animated.Text>
          <Ionicons name="add-circle" size={32} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato',
    marginLeft: 5,
    padding: '50px',
  },
  buttonText: {
    color: 'white',
    
    padding: '50px',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  label: {
    fontSize: 8, // Adjustthe font size as needed
    marginTop: 2, // Adjust the spacing between icon and label as needed
    },
    });
    
export default CustomTabBar;
