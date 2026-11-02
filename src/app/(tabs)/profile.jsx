import React from 'react';
import { Alert, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Heading, Page } from '../../components/UI';
import { C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

export default function Profile() { const { user } = useTasks(); const row = (icon, title, onPress) => <Card onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}><Ionicons name={icon} color={C.primary} size={20} /><Text style={{ color: C.text, fontSize: 14, fontWeight: '700', marginLeft: 14, flex: 1 }}>{title}</Text><Ionicons name="chevron-forward" color={C.muted} size={18} /></Card>; return <Page><Heading title="Profil" subtitle="Akun dan preferensi kamu" /><View style={{ alignItems: 'center', marginVertical: 14, marginBottom: 24 }}><View style={{ width: 88, height: 88, borderRadius: 30, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Ionicons name="person" size={44} color={C.primary} /></View><Text style={{ color: C.text, fontWeight: '900', fontSize: 19 }}>{user.name}</Text><Text style={{ color: C.muted, marginTop: 5 }}>{user.email}</Text></View>{row('create-outline', 'Edit Profile', () => Alert.alert('Edit Profile', 'Pengaturan profil demo.'))}{row('settings-outline', 'Settings', () => Alert.alert('Settings', 'Pengaturan aplikasi demo.'))}{row('help-circle-outline', 'Bantuan', () => Alert.alert('Bantuan', 'TugasIn membantu mengatur tugas harianmu.'))}<Button title="Logout" icon="↪" outline onPress={() => router.replace('/(auth)/login')} style={{ marginTop: 12 }} /></Page>; }
