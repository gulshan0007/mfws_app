import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MoreScreen from '../screens/MoreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Rainfall') {
            iconName = focused ? 'rainy' : 'rainy-outline';
          } else if (route.name === 'Waterlevel') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Crowdsourcing') {
            iconName = focused ? 'accessibility' : 'accessibility-outline';
          } else if (route.name === 'Rail') {
            iconName = focused ? 'train' : 'train-outline';
          } else if (route.name === 'About-Us') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
      })}
    >
      <Tab.Screen name="Rainfall" component={HomeScreen} />
      <Tab.Screen name="Waterlevel" component={SettingsScreen} />
      <Tab.Screen name="Crowdsourcing" component={NotificationsScreen} />
      <Tab.Screen name="Rail" component={ProfileScreen} />
      <Tab.Screen name="About-Us" component={MoreScreen} />
    </Tab.Navigator>
  );
}
