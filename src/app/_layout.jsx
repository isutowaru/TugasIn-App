import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TaskProvider } from '../context/TaskContext';
import { C } from '../constants/theme';

export default function RootLayout() { return <TaskProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.bg }, animation: 'slide_from_right' }}><Stack.Screen name="index" /><Stack.Screen name="(auth)" /><Stack.Screen name="(tabs)" /><Stack.Screen name="task/add" /><Stack.Screen name="task/[id]" /><Stack.Screen name="task/edit/[id]" /></Stack></TaskProvider>; }
