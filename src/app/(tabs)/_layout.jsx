import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../constants/theme';
const icons = { home: 'home', tasks: 'checkbox', calendar: 'calendar', categories: 'grid', profile: 'person' };
export default function TabLayout() { return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: C.muted, tabBarStyle: { height: 64, paddingTop: 7, paddingBottom: 8, borderTopColor: C.border, backgroundColor: C.white }, tabBarLabelStyle: { fontSize: 10, fontWeight: '700' }, tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} /> })}><Tabs.Screen name="home" options={{ title: 'Home' }} /><Tabs.Screen name="tasks" options={{ title: 'Tasks' }} /><Tabs.Screen name="calendar" options={{ title: 'Calendar' }} /><Tabs.Screen name="categories" options={{ title: 'Categories' }} /><Tabs.Screen name="profile" options={{ title: 'Profile' }} /></Tabs>; }
