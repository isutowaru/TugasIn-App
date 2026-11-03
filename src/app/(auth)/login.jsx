import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Field, Page } from '../../components/UI';
import { C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useTasks();
  const login = () => {
    if (!email.includes('@') || password.length < 4) return Alert.alert('Periksa kembali', 'Masukkan email valid dan password minimal 4 karakter.');
    setUser({ name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()), email });
    router.replace('/(tabs)/home');
  };
  return (
    <Page contentStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{ width: 70, height: 70, borderRadius: 24, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <Ionicons name="checkmark-done" size={37} color={C.white} />
        </View>
        <Text style={{ fontSize: 29, fontWeight: '900', color: C.text }}>Tugas<Text style={{ color: C.primary }}>In</Text></Text>
        <Text style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>Atur tugas, selesaikan semua.</Text>
      </View>
      <Card style={{ padding: 20, marginBottom: 0 }}>
        <Text style={{ color: C.text, fontSize: 22, fontWeight: '900', marginBottom: 5 }}>Selamat datang</Text>
        <Text style={{ color: C.muted, fontSize: 13, marginBottom: 21 }}>Masuk untuk melanjutkan produktivitasmu.</Text>
        <Field label="Email" value={email} onChangeText={setEmail} placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        <Field label="Password" value={password} onChangeText={setPassword} placeholder="Masukkan password" secureTextEntry />
        <Pressable onPress={() => router.push('/(auth)/forgot-password')} style={{ alignSelf: 'flex-end', marginTop: -4, marginBottom: 18 }}>
          <Text style={{ color: C.primary, fontSize: 13, fontWeight: '700' }}>Lupa password?</Text>
        </Pressable>
        <Button title="Masuk" icon="log-in-outline" onPress={login} />
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 22 }}>
        <Text style={{ color: C.muted }}>Belum punya akun? </Text>
        <Pressable onPress={() => router.push('/(auth)/register')}><Text style={{ color: C.primary, fontWeight: '800' }}>Daftar</Text></Pressable>
      </View>
    </Page>
  );
}
