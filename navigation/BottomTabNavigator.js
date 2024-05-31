import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MoreScreen from '../screens/MoreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Form from '../screens/Form'; // Import FormScreen
import CustomTabBar from '../components/CustomTabBar'; // Adjust the import path as necessary

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Rainfall" component={HomeScreen} />
      <Tab.Screen name="Waterlevel" component={SettingsScreen} />
      <Tab.Screen name="Crowdsourcing" component={NotificationsScreen} />
      <Tab.Screen name="Rail" component={ProfileScreen} />
      <Tab.Screen name="About-Us" component={MoreScreen} />
      <Tab.Screen name="Form" component={Form} options={{ tabBarButton: () => null }} /> 
    </Tab.Navigator>
  );
}
