import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/theme';

const icons = {
  home: ['home', 'home-outline'],
  tasks: ['checkbox', 'checkbox-outline'],
  calendar: ['calendar', 'calendar-outline'],
  categories: ['grid', 'grid-outline'],
  profile: ['person', 'person-outline'],
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: C.primary,
      tabBarInactiveTintColor: C.muted,
      tabBarStyle: {
        height: 68,
        paddingTop: 7,
        paddingBottom: 7,
        borderTopColor: C.border,
        borderTopWidth: 1,
        backgroundColor: C.white,
        elevation: 10,
      },
      tabBarItemStyle: { paddingVertical: 1 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 1 },
      tabBarIcon: ({ focused, color }) => <Ionicons name={icons[route.name][focused ? 0 : 1]} size={21} color={color} />,
    })}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="categories" options={{ title: 'Categories' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
