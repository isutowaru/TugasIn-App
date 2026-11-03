import React from 'react';
import { Alert, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Heading, Page } from '../../components/UI';
import { C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

export default function Profile() {
  const { user } = useTasks();
  const row = (icon, title, onPress) => (
    <Card onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}>
      <View style={{ width: 38, height: 38, borderRadius: 13, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} color={C.primary} size={19} />
      </View>
      <Text style={{ color: C.text, fontSize: 14, fontWeight: '700', marginLeft: 12, flex: 1 }}>{title}</Text>
      <Ionicons name="chevron-forward" color={C.muted} size={18} />
    </Card>
  );
  return (
    <Page>
      <Heading title="Profil" subtitle="Akun dan preferensi kamu" />
      <Card style={{ alignItems: 'center', paddingVertical: 25, marginBottom: 21 }}>
        <View style={{ width: 84, height: 84, borderRadius: 29, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center', marginBottom: 13 }}>
          <Ionicons name="person" size={40} color={C.primary} />
        </View>
        <Text style={{ color: C.text, fontWeight: '900', fontSize: 19 }}>{user.name}</Text>
        <Text style={{ color: C.muted, fontSize: 13, marginTop: 5 }}>{user.email}</Text>
      </Card>
      <Text style={{ color: C.muted, fontSize: 11, fontWeight: '800', letterSpacing: .7, marginBottom: 10, marginLeft: 2 }}>PREFERENSI</Text>
      {row('create-outline', 'Edit profil', () => Alert.alert('Edit profil', 'Pengaturan profil demo.'))}
      {row('settings-outline', 'Pengaturan', () => Alert.alert('Pengaturan', 'Pengaturan aplikasi demo.'))}
      {row('help-circle-outline', 'Bantuan', () => Alert.alert('Bantuan', 'TugasIn membantu mengatur tugas harianmu.'))}
      <Button title="Keluar" icon="log-out-outline" outline onPress={() => router.replace('/(auth)/login')} style={{ marginTop: 10 }} />
    </Page>
  );
}
